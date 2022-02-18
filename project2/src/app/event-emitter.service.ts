import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';



// @Injectable makes to available services in root level.
@Injectable({providedIn:'root'})


export class SharedService {

  addFav = new Subject<any>();
  value:any;

  sendClickEvent() {
    this.addFav.next(this.value);
  }
  getClickEvent(): Observable<any>{ 
    return this.addFav.asObservable();
  }
}
