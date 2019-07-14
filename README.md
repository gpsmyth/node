## Getting started with node.js
`brew install node`  

`node -v` or `node --version`  

npm is also installed, check via  
`npm -v`

### Upgrading node
`brew upgrade node` or `npm install -g npm`

### Creating new project with express.js and pug (HTML Templating Engine)

Commands UserGuide  
Create a working directory for your project, say, node-project.  
`cd node-project`  
`npm init`

The above command creates a package.json file in the local directory  
A series of parameters are requested which I chose as per the default except for `entry point` - I choose `app.js`  

### Installing Express.js
```npm install express --save```

app.js will contain:
```
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.status(200).send('Hello, World!');
});

app.listen(port, () => {
	console.log(`Server started at port ${port}`);
});
```
#### Start Application
`npm start`  

Message stating `server started at port 3000` should be observed  
Navigate to http://localhost:3000

### Sub-note with git
Following commands used . 
`git remote add origin git@github.com:gpsmyth/node.git` . 
`git push -u origin master` . 

This commit is performed at remote github side so a `git pull` will be performed locally.  

### Progressing with pug

## Source-code deploy on an node.js app on kubernetes using Docker

### Summary of second part  
Took the code and built it into a docker image, pushed it to docker hub and referenced the image in a kubernetes deployment file and deployed behind a service using an interent ELB off AWS EKS

```
eksctl create cluster \
 --name prod \
 --version 1.13 \
 --nodegroup-name standard-workers \
 --node-type t3.medium \
 --nodes 3 \
 --nodes-min 1 \
 --nodes-max 4 \
 --node-ami auto
```  
Pre-req for docker: note *gpsmyth* is docker login id   
Build Docker image `docker image build -t <tag> .` e.g.  
```
docker image build -t gpsmyth/acg-web:0.3 .
docker image ls
docker image ls
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
gpsmyth/acg-web     0.3                 20b434121d56        36 hours ago        445MB

docker push gpsmyth/acg-web:0.3
```  
`docker image inspect 20b434121d56` provides further detailed information

```
kubectl get nodes
NAME                                                STATUS   ROLES    AGE   VERSION
ip-192-168-34-52.ap-southeast-2.compute.internal    Ready    <none>   65s   v1.13.7-eks-c57ff8
ip-192-168-5-174.ap-southeast-2.compute.internal    Ready    <none>   68s   v1.13.7-eks-c57ff8
ip-192-168-71-128.ap-southeast-2.compute.internal   Ready    <none>   68s   v1.13.7-eks-c57ff8

kubectl apply -f ./web-deploy.yaml
deployment.apps/simple-web created

 kubectl get deployments
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
simple-web   3/3     3            3           46s


kubectl apply -f ./web-nodeport.yaml
service/web-nodeport created

kubectl get svc
NAME           TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
kubernetes     ClusterIP   10.100.0.1       <none>        443/TCP          19m
web-nodeport   NodePort    10.100.191.214   <none>        3000:31000/TCP   14s


kubectl apply -f ./web-lb.yaml
service/web-svc created

kubectl get svc
NAME           TYPE           CLUSTER-IP       EXTERNAL-IP                                                                    PORT(S)          AGE
kubernetes     ClusterIP      10.100.0.1       <none>                                                                         443/TCP          21m
web-nodeport   NodePort       10.100.191.214   <none>                                                                         3000:31000/TCP   2m46s
web-svc        LoadBalancer   10.100.214.56    a5bd50d61a5d611e9965902ce50b022b-1004873066.ap-southeast-2.elb.amazonaws.com   80:31121/TCP     14s


http://a5bd50d61a5d611e9965902ce50b022b-1004873066.ap-southeast-2.elb.amazonaws.com/ produced:
```
![](images/code_as_k8.png?raw=true)

Finally:  
`eksctl delete cluster --name prod`