'use strict';

const express = require('express');
const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
	res.render('home');
});

app.listen(port, () => {
	console.log(`Server started at port ${port}`);
});

// app.listen(port);
module.exports.getApp = app;