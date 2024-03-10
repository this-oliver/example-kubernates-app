# K8s

Kubernetes (K8s) is an open-source system platform that automates the deployment, scaling, and management of containerized applications. Among other things, it helps you:

- setup an application, its networking, and its storage using a declarative configuration (YAML)
- it allows you to rollout new changes to your application with minimal to no downtime (e.g. creates a new set of containers before killing the old ones)
- ...and much more

## How it works

I suggest a basic understanding of Docker and containerization. That being said, here's a high-level overview of how to get a K8s deployment up and running:

1. Docker Image - you'll need to build and push a Docker image to a registry (e.g. Docker Hub)
2. [deployment.yaml](./deployment.yaml) (K8) - setup a deployment config that defines the image(s) needed to run your application, the ports to expose, and the number of replicas to run and the resources to allocate
3. [service.yaml](./service.yaml) (K8) - setup a service config that defines how to expose your application, internally, to other pods in the K8s cluster or externally to the internet
4. kubectl - apply the deployment and service configs to your K8s cluster using the `kubectl` command-line tool
