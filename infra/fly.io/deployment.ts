import { Construct } from 'constructs';
import { TerraformOutput, TerraformLocal, LocalExecProvisioner } from 'cdktf';

import { Tag } from './.gen/providers/docker/tag';

import { StringResource } from './.gen/providers/random/string-resource';

import { Ip } from './.gen/providers/fly/ip';
import { Machine } from './.gen/providers/fly/machine';
import { App as FlyApp } from './.gen/providers/fly/app';

export class FlyDeployment extends Construct {
  public readonly app: FlyApp;
  public readonly url: TerraformOutput;
  constructor(
    scope: Construct,
    id: string,
    config: {
      localImageName: string;
      internalPort: number;
      env?: { [key: string]: string };
      verifyUp?: {
        path: string;
        attempts: number;
        delay: number;
      };
    }
  ) {
    super(scope, id);

    const { localImageName, internalPort, env, verifyUp } = config;

    const rid = new StringResource(this, 'app_id', {
      length: 8,
      special: false,
      upper: false,
    });

    const app = new FlyApp(this, 'app', {
      name: `si-${localImageName}-${rid.id}`,
    });

    this.app = app;

    // use ttl.sh instead of registry.fly.io since its tricky to push non native platform image to be uploaded
    // ttl.sh is great testing purposes since it works without the fuss with auth but images expires after 24 hours
    const imageName = `ttl.sh/fly.io-${app.name}:${localImageName}`;

    const tagAndPush = new Tag(this, 'image_to_push', {
      sourceImage: `${localImageName}:latest_linux_amd64`,
      targetImage: imageName,
      provisioners: [
        {
          type: 'local-exec',
          // use local-exec to over come the limitation of the RegistryImage resource from docker provider
          command: `docker push ${imageName}`,
        },
      ],
    });

    const ip = new Ip(this, 'ip', {
      app: app.name,
      type: 'v4',
    });

    // for some reason `app.appurl` is "" (empty string) so currently working around by constructing it manually by reverse engineering the pattern from fly.io
    const localUrl = new TerraformLocal(
      this,
      'url',
      `https://${app.name}.fly.dev`
    );
    new Machine(this, 'machine', {
      region: 'sea', // Seattle
      app: app.name,
      image: imageName,
      env,
      services: [
        {
          ports: [
            {
              port: 443,
              handlers: ['tls', 'http'],
            },
            // skipping 80 unless become required later on
            // {
            //   port: 80,
            //   handlers: ["http"],
            // },
          ],
          protocol: 'tcp',
          internalPort,
        },
      ],
      dependsOn: [ip, tagAndPush],
      // verify the connectivity and responsiveness
      // to avoid notifying "success" without the website actually functional
      // for both backend and frontend
      provisioners: verifyUp
        ? [
            {
              type: 'local-exec',
              // sleep 20 seconds for dns to propagate first
              // use curl to verify the server is up and responding
              command: [
                'sleep 20',
                '&&',
                'curl',
                `--retry ${verifyUp.attempts}`,
                `--retry-delay ${verifyUp.delay}`,
                '--connect-timeout 2',
                localUrl.expression,
              ].join(' '),
            } as LocalExecProvisioner,
          ]
        : [],
    });

    this.url = new TerraformOutput(this, `${localImageName}-url`, {
      value: localUrl.expression,
    });
  }
}
