import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { AppEventType } from './even-type';

export class AppEvent<T> {
  constructor(public type: AppEventType, public payload: T) {}
}
@Injectable()
export class TodoService {

  private eventHandler = new Subject<AppEvent<any>>();
  get(eventType: AppEventType): Observable<AppEvent<any>> {
    console.log(this.eventHandler);
    return this.eventHandler.pipe(filter((event) => event.type === eventType));
  }
  set<T>(event: AppEvent<T>): void {
    this.eventHandler.next(event);
  }
  // clear<T>(event: AppEvent<T>): void {
  //   this.eventHandler.next(null);
  // }
}