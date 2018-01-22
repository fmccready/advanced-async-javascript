const rx = require('rxjs');
const Observable = rx.Observable;

var buttonsNodeList = document.getElementsByTagName('button');
var buttons = Array.prototype.slice.call(buttonsNodeList);
buttons.map(function(button){
  button.classList.add('off');
});


/*
var animationsAllowed = tasks.
  map(task =>
    Observable.concat(
    task.filter(() => false),
    Observable.of(-1))).
  mergeAll().
  scan((acc, curr) => acc + curr, 0).
  map(value => value === 0).
  distinctUntilChanged();
*/
      
