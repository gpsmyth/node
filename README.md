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
