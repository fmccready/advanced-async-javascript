"use strict";
const express = require('express');
const path = require('path');
const interfaces = require('os').networkInterfaces();
const Handlebars = require('handlebars');

const getIpAddresses = function(){
    return Object.keys(interfaces).map((nic)=>{
    return interfaces[nic].map((connection)=>{
      return connection.address;
    });
  });
}

var ipAddresses = flatten(getIpAddresses());

function flatten(outer){
  var tempArray = [];
  outer.forEach(function(inner){
    inner.forEach(function(item){
      tempArray.push(item);
    });
  });
  return tempArray;
}

let app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/testpath', function(req, res){
  console.log('request was made!');
  res.send('<html><button>test</button><script>var button = document.getElementsByTagName("button")[0];button.onclick=function(){window.location.href="/testpath";window.location.href="/testpath";};</script></html>');
});

app.listen(8080, function(){
  ipAddresses.forEach(function(address){
    console.log(`app listening on ${address}:8080`);
  });
});
