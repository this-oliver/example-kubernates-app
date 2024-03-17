# K8s

Kubernetes (K8s) is an open-source system platform that automates the deployment, scaling, and management of containerized applications. Among other things, it helps you:

- setup an application, its networking, and its storage using a declarative configuration (YAML)
- it allows you to rollout new changes to your application with minimal to no downtime (e.g. creates a new set of containers before killing the old ones)
- ...and much more

## How it works

I suggest a basic understanding of Docker and containerization. That being said, here's a high-level overview of how to get a K8s deployment up and running:

1. Docker Image - you'll need to build and push a Docker image to a registry (e.g. Docker Hub)
2. [deployment-client.yaml](./deployment-client.yaml) (K8) - setup a deployment config that defines the image(s) needed to run your application, the ports to expose, and the number of replicas to run and the resources to allocate
3. [service-client.yaml](./deployment-server.yaml) (K8) - setup a service config that defines how to expose your application, internally, to other pods in the K8s cluster or externally to the internet
4. create similar configs for your server, etc.
5. [ingress.yaml](./ingress.yaml) (K8) - setup an ingress config that defines how to route traffic to your application based on the URL path or domain name (e.g. `example-app.net` -> `service-client`)
6. apply the configurations on your K8 cluster using `kubectl apply -f <config-file>.yaml` or `kubectl apply -k <directory>`

## Ingress

A reverse proxy is a server that sits between the internet and your web server (where you host applications). It listens for all requests (usually from port 80 and 443) and forwards them to the appropriate server based on certain rules like the domain name or URL path. In practical terms, a reverse proxy allows you to host all your applications behind a single ip address which listens for all incoming requests and forwards them to the appropriate ports - simplifying the process of managing multiple applications.

The [ingress.yaml](./ingress.yaml) file sets up a reverse proxy that routes all trafic from [http://example-app.net](http://example-app.net) to a specific service (e.g. `service-client`) in the K8s cluster. It allows you to configure rules for all your deployments into a single nginx server (usually an addon in k8s cluster platforms like minikube, microk8s, etc.) and route traffic to the appropriate service based on the URL path or domain name instead of having to create a new reverse-proxy for each service.

### Security

> for more info, see [nginx guide on setting up tls](https://kubernetes.github.io/ingress-nginx/user-guide/tls/)

Assuming that you also want to secure the ingress, you'll need to set up TLs which means creating a pem file and a secret.

To create a pem file, you can use openssl:

```bash
KEY_FILE=~/certs/example-app.net.key
CERT_FILE=~/certs/example-app.net.pem
HOST="example-app.net"

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ${KEY_FILE} -out ${CERT_FILE} -subj "/CN=${HOST}/O=${HOST}" -addext "subjectAltName = DNS:${HOST}"
```

- ${KEY_FILE} is the path to the key file (i.e. /etc/ssl/certs/example-app.net.key)
- ${CERT_FILE} is the path to the cert file (i.e. /etc/ssl/certs/example-app.net.pem)
- ${HOST} is the host name you want to use (i.e. example-app.net)

Once you have setup the pem file, you can create a secret in k8s using the following command:

```bash
CERT_NAME="example-app-net-tls"
KEY_FILE=~/certs/example-app.net.key
CERT_FILE=~/certs/example-app.net.pem
kubectl create secret tls ${CERT_NAME} --key ${KEY_FILE} --cert ${CERT_FILE}
```
