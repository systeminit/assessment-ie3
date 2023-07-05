import { Construct } from 'constructs';
import { App, S3Backend, TerraformStack } from 'cdktf';

import { NullProvider } from '@cdktf/provider-null/lib/provider';
import { DockerProvider } from './.gen/providers/docker/provider';
import { RandomProvider } from './.gen/providers/random/provider';
import { FlyProvider } from './.gen/providers/fly/provider';
import { FlyDeployment } from './deployment';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // use "s3" backend instead of local file
    new S3Backend(this, {
      bucket: 'si-terraform-be-2023',
      key: 'terrform.tfstate',
      // we are using s3 api but not actually s3
      // hence skipping all the checks below
      skipCredentialsValidation: true,
      skipRegionValidation: true,
      skipMetadataApiCheck: true,
      // region: '', read from env var: AWS_REGION
      // endpoint: '', read from env var: AWS_S3_ENDPOINT
      // accessKey: '', read from env var: AWS_ACCESS_KEY_ID
      // secretKey: '', read from env var: AWS_SECRET_ACCESS_KEY
    });

    new RandomProvider(this, 'random', {});
    new NullProvider(this, 'null', {});
    new DockerProvider(this, 'docker', {});
    new FlyProvider(this, 'fly', {
      // flyApiToken: '', read from env var: FLY_API_TOKEN
    });

    const be = new FlyDeployment(this, 'be', {
      localImageName: 'backend',
      internalPort: 3030,
      verifyUp: {
        path: '/api/users',
        attempts: 5,
        delay: 5,
      },
    });

    new FlyDeployment(this, 'fe', {
      localImageName: 'frontend',
      internalPort: 80,
      env: {
        BACKEND_URL: be.url.value,
      },
      verifyUp: {
        path: '/',
        attempts: 5,
        delay: 5,
      },
    });
  }
}

const app = new App();
new MyStack(app, 'fly.io');
app.synth();
