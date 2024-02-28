# Example Kubernates App

This repository demonstrates how to deploy a semi-complex application using Kubernates. The application consists of a **server** that creates and verifies tokens and a **client** application acts as a user interface to interact with the server.

Kubernetes (**K8**) is an open-source orchestration platform for automating the deployment, scaling, and management of containerized applications. It can be used to:

- keep your application highly available by spinning up new containers if one fails
- manage the amount of resources that your application (or the containers that make up your application) can use
- much more...

## Getting Started

This example is performed locally using **Minikube**, a tool that sets up a single-node Kubernetes cluster on your local machine. This is a great way to get started with Kubernetes without needing to set up a cloud-based cluster.

### Pre-requisites

Install the following tools:

- [Docker](https://docs.docker.com/get-docker/) on your local machine to build images.
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) on your local machine to interact with a Kubernates cluster.
- [Minikube](https://minikube.sigs.k8s.io/docs/start/) on your local machine to run a local Kubernates cluster.

### Build the Docker Images

```bash
# build
docker build -t example-kubernates-app:server ./packages/server

# tag (replace `thisoliver` with your Docker Hub username)
docker tag example-kubernates-app:server thisoliver/example-kubernates-app:server

# push (replace `thisoliver` with your Docker Hub username)
docker push thisoliver/example-kubernates-app:server
```

### Start Minikube

```bash
# start minikube
minikube start

# start the dashboard (open a new terminal window for this)
minikube dashboard --url
```

## Deploy the Application to Minikube

> **Note**: This step assumes that you have already built and pushed the Docker images.

Apply the K8 config files in [./k8s](./k8s/) to your local K8 cluster using `kubectl`:

```bash
# TIP: add 'alias k8='kubectl'' to your .bashrc to use 'k8' as a shortcut for 'kubectl

# apply the server deployment
kubectl apply -k k8s

# verify that the deployments are running
kubectl get deployments

# verify that the services are running
kubectl get services
```

Expose the application to the outside world with your Minikube IP address:

```bash
# expose the frontend service
minikube service example-kubernates
```
