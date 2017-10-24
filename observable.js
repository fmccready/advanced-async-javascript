class Observable {
  
  constructor(subscribe){
    this._subscribe = subscribe;
  }
  
  subscribe(observer){
    return this._subscribe(observer);
  }

  static timeout(time){
    return new Observable(function subscribe(observer){
      const handle = setTimeout(function(){
        observer.next();
        observer.complete();
      }, time);
      
      return {
        unsubscribe(){
          clearTimeout(handle);
        }
      };
    });
  }
  static fromEvent(dom, eventName){
    return new Observable(function subscribe(observer){
      const handler = (ev) => {
        observer.next(ev);
      }
      dom.addEventListener(eventName, handler);

      return {
        unsubscribe() {
          dom.removeEventListener(eventName, handler);
        }
      }
    });
  };
  map(projection){
    var self = this;
    return new Observable(function subscribe(observer){
      const subscription = self.subscribe({
        next(v){
          observer.next(projection(v));
        },
        error(err){
          observer.error(err);
        },
        complete(){
          observer.complete();
        }
      });
      return subscription;
    });
  }
  filter(predicate){
    var self = this;
      return new Observable(function subscribe(observer){
        const subscription = self.subscribe({
        next(v){
          if (predicate(v)){
            observer.next(v);
          }
        },
        error(err){
          observer.error(err);
        },
        complete(){
          observer.complete();
        }
      });
    });
  }
}

const obs = Observable.timeout(500);
/*
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
