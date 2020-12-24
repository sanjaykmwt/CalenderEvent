import * as q from 'q';

export function getEvents(){
    var defer = q.defer();
   var getEvt = window.localStorage.getItem('addevt',[])
    defer.resolve(getEvt);
    return defer.promise
}