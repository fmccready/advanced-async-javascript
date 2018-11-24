import Observable from './observable.js';
import Handlebars from 'handlebars/runtime';
import Templates from '../templates/index.handlebars';
import '../styles/style.less';

var app = document.getElementById('advanced-async-js');
app.innerHTML = Templates({
    name: 'Observables!',
    button: [
      {
        label: 'Only show when x-axis is greater than 150',
        id: 'click'
      },
      {
        label: 'Subscribe y-axis',
        id: 'subscribe',
      }
    ]
  });

var button = document.getElementById('button-click');

var subscribe = document.getElementById('button-subscribe');
subscribe.onclick = subscribeClicks;

const clicks = Observable.fromEvent(button, 'click');

clicks.map(ev => ev.offsetX)
  .filter(offsetX => offsetX > 150)
  .subscribe({
    next(ev) {
      console.log('x', ev);
    },
    complete() {
      console.log('done!');
    }
  })


function subscribeClicks(){
  clicks.map(ev => ev.offsetY)
    .filter(offsetY => offsetY > 45)
    .subscribe({
      next(ev) {
        console.log('y', ev);
      },
      complete() {
        console.log('done!');
      }
    })
}
