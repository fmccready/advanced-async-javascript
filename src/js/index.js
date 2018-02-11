console.log('logging from index.js');
import Observable from './observable.js';
import Handlebars from 'handlebars/runtime';
import Templates from '../templates/index.handlebars';
import '../styles/style.less';

var app = document.getElementById('advanced-async-js');
app.innerHTML = Templates({'name': 'test'});


/*
const obs = Observable.timeout(500);
obs.subscribe({
  next(v){
    console.log(v);
  },
  complete(){
    console.log('done');
  }
});
*/

var button = document.getElementById('button');

const clicks = Observable.fromEvent(button, 'click');

clicks.map(ev => ev.offsetX).
  filter(offsetX => offsetX > 20).
  subscribe({
    next(ev){
      console.log(ev);
    },
    complete(){
      console.log('done!');
    }
  })

clicks.subscribe({
  next(e){
    console.log('next from clicks');
  },
  complete(){
    console.log('clicker complete');
  }
});
