# Taskly

Taskly is a simple to-do list service that is made to be an example.

## Structure

This repository contains the code for the backend and frontend as well as IaaC

```bash
./
├── backend/     # backend code
├── frontend/    # frontend code
└── infra/       # infrastructure as a code
    └── fly.io/  # a chosen cloud provider
```

## Prerequisites

- [Earthly](https://earthly.dev/get-earthly): so you can do CI locally as well
  as remotely!

## Backend

You can read details at [backend](./backend/).

There are [backend/Makefile](./backend/Makefile) and
[backend/Earthfile](./backend/Earthfile) to help build and test the image.

[backend/Earthfile](./backend/Earthfile) also include the integration test from
outside of the container perspective.

See it in action via `cd backend && make`.

## Frontend

You can read details at [frontend](./frontend/).

There are [frontend/Makefile](./frontend/Makefile) and
[frontend/Earthfile](./frontend/Earthfile) to help build and test the image.

Also [frontend/Caddyfile](./frontend/Caddyfile) is used to serve static html.

[frontend/Earthfile](./frontend/Earthfile) also include the integration test
from outside of the container perspective.

See it in action via `cd frontend && make`.

## Infrastructure

After testing with multiple cloud providers, I chose https://fly.io because it's
simple and enough free quota's given to any free account to be able to deploy
the necessary resources that we can actually open and test in the web browser.

[infra/fly.io](./infra/fly.io) is a
[cdktf](https://developer.hashicorp.com/terraform/cdktf) project that fabricates
the terraform code using typescript (which should fit nicely to our nodejs based
backend and frontend code).

[infra/Earthfile](./infra/Earthfile) will prepare the environment that is
necessary to run the cdktf code.

Mainly you should look at these files:

- [infra/fly.io/cdktf.json](./infra/fly.io/cdktf.json)
- [infra/fly.io/main.ts](./infra/fly.io/main.ts)
- [infra/fly.io/deployment.ts](./infra/fly.io/deployment.ts)

## CI

At this point you may have noticed that there are `Earthfile`s that being used
in this project.

[Earthly](https://earthly.dev/) is a great tool that should be familiar to
people who are already familiar with Dockerfile and Makefile. It makes it
intuitive to write CI code that especially when you need to glue things together
efficiently. It also works the same whether it's running on a remote CI machine
or a localhost which makes it easy to debug as well as freedom of choosing
almost any CI platform that out there.

So the `Earthfile`s are both the code that powers building and deploying as well
as a living documentation on how to build.

### GitHub Workflows

For a remote CI, GitHub Workflows are defined at
[.github/workflows](./.github/workflows) to give you the automation of:

- build and diff: [.github/workflows/build.yml](./.github/workflows/build.yml)
- deploy on merge:
  [.github/workflows/deploy.yml](./.github/workflows/deploy.yml)
- destroy on manual trigger:
  [.github/workflows/destroy.yml](./.github/workflows/destroy.yml)

_All actions are also manually trigger-able at [Actions tab](./actions)._

### Variables

Since the deployment is dependent on variables, you can set it up at the repo
level.

If you using `gh` CLI, you can do it like below

```bash
#!/usr/bin/env bash

REPO="owner/repo" # change this to your fork (or cloned repo)

FLY_API_TOKEN="change-me-to-real-value"
AWS_ACCESS_KEY_ID="change-me-to-real-value"
AWS_SECRET_ACCESS_KEY="change-me-to-real-value"
AWS_REGION="change-me-to-real-value"
AWS_S3_ENDPOINT="change-me-to-real-value"

# `--repo ${REPO}` is probably necessary when the repo is not upstream itself

gh variable --repo ${REPO} set AWS_REGION --body ${AWS_REGION}
gh variable --repo ${REPO} set AWS_S3_ENDPOINT --body ${AWS_S3_ENDPOINT}
gh secret --repo ${REPO} set AWS_ACCESS_KEY_ID --body ${AWS_ACCESS_KEY_ID}
gh secret --repo ${REPO} set AWS_SECRET_ACCESS_KEY --body ${AWS_SECRET_ACCESS_KEY}
gh secret --repo ${REPO} set FLY_API_TOKEN --body ${FLY_API_TOKEN}
```

If you are setting these via web console instead, visit
[settings/variables/actions](./settings/variables/actions) and
[settings/secrets/actions](./settings/secrets/actions) to set appropriate values
(You can see which ones are variables and which ones are secrets from the script
above).

Two type of variables are there:

- The first one is the access token for `fly.io` which you should be able to
  acquire from https://fly.io/user/personal_access_tokens.
- The second one is the access information for an s3 api compatible remote
  storage.
  - I have tested that it works with
    [Cloudflare R2](https://developers.cloudflare.com/r2/) but should work with
    others as well.
  - For similar terraform configuration, you might want to look at
    [a documentation from a terraform registry](https://registry.terraform.io/providers/FlexibleEngineCloud/flexibleengine/latest/docs/guides/remote-state-backend).

### Run Workflows

Once the values are set from the previous step, feel free to trigger any
workflow to see what happens.

When deploy action ran successfully, search for `frontend-url` at `Run deploy`
step at [actions](./actions) (You will need to click few times until you opened
up the logs for the right step).

_As the url will change all the time, this way of digging up to find the url is
not ideal so it should be improved later._

### Verify

If you acquired the URL that looks like `https://si-frontend-[hash].fly.dev`
from the previous step, you should open up in the browser to see if it's
functional as you expected!

## Gotchas

### Images Is Public

https://ttl.sh is used here to avoid having to acquire yet another credentials
for this exercise.

Anyone can push images to ttl.sh without an account but it claims to expire any
images after 24 hours.

So it's great for testing a project like this but remember that the image will
be gone after 24 hours from the registry as well as it's public for anyone to
download the image in terms of a security perspective.

### App's ID Will Change

In case multiple people would run this at the same time (with their own
accounts), I added random id in the terraform level, so no conflict will occur
for [apps](https://fly.io/docs/reference/apps/). However this also means the id
(as well as the url) will change every time after a complete destroying of the
resources.

### Inflexible Changes

When you make changes into the [IaaS](./infra/fly.io) while it's already
deployed, the chances are, it might try to delete and recreate
[the machine](https://fly.io/docs/rails/advanced-guides/machine/) when it's
powered by
[fly.io's terraform provider](https://registry.terraform.io/providers/fly-apps/fly/latest).
Unfortunately this would result in a failure when you are on free tier with the
limit of one machine per one app. So for the purpose of this exercise, simply
destroying and deploying again would be a solution to that.
