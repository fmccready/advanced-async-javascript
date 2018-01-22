console.log('logging from index.js');
import Observable from './observable.js';
import Handlebars from 'handlebars/runtime';
import Templates from '../templates/index.handlebars';

var app = document.getElementById('advanced-async-js');
app.innerHTML = Templates();
