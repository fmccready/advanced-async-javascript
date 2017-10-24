"use strict";
const express = require('express');
const path = require('path');
let app = express();

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/observable.js', function(req, res){
  res.sendFile(path.join(__dirname + '/observable.js'));
});

app.listen(8080);
