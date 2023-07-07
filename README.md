# John Watson - Infrastructure Engineer Technical Test - systeminit

## Overview

 This test aims to build, validate, containerize, and deploy a backend and frontend service to a cloud platform. 

## Approach

I have broken the approach into three sections: Development Flow, Continuous Integration and then finally Continuous Delivery. 

Hopefully this makes it easier to follow the path I have taken. I have also outlined the reasoning behind each of the bullets in the below list, along with the PR(s) that added that functionality if that helps.

## Path Checklist

1. Development Flow: Branch protection, code integrity, and establish development flow:
   - [ ] Add to README.md with details of the task
   - [ ] Setup branch restrictions/push policies
   - [ ] Setup precommit
   - [ ] Setup semantic release

2. CI (Continuous Integration): Build, Test, and Release flow:
   - [ ] Build + Containerize the applications, with local deployment validation
   - [ ] Initiate tests in CI 
     - [ ] Lint
     - [ ] Unit Test
     - [ ] Security Scan
     - [ ] SBOM Generation
   - [ ] Initiate release flow to an Artifact Registry
   - [ ] Register the service with the Artifact Database

3. CD (Continuous Delivery): Deploying the Applications
   - [ ] Establish some baseline/basic IaC for environments
   - [ ] Automatic validation environment for development branches
   - [ ] Development environment establishment with Artifact metadata validation

## Considerations

TODO: List considerations for users of the repository.

