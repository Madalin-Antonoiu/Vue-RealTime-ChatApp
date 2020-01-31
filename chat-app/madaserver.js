//Initial configuration
var express = require('express');
var app = express();
var server = app.listen(3000);

//Hosting my entire chat app
app.use(express.static('madapublic'));

console.log('Triggered my server');