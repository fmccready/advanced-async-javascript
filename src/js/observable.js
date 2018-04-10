class Observable {
  
  constructor(subscribe){
    this._subscribe = subscribe;
  }
  
  subscribe(observer){
    return this._subscribe(observer);
  }
  
  static concat(...observables){
    return new Observable(function subscribe(observer){
      
      let myObservables = myObservables.slice();
      let currentSub = null;
      let processObservable = () => {
        
        if (myObservables.length === 0){
          observer.complete();
        } else {
          let observable = myObservables.shift();
          currentSub = observable.subscribe({
            next(v){
              observer.next(v)
            },
            error(e){
              observer.error(e)
              currentSub.unsubscribe();
            },
            complete(){
              processObservable(); 
            }
          });
        }
        processObservable();

        return {
          unsubscribe(){currentSub.unsubscribe();}
        };
      }
    });
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
module.exports = Observable;
