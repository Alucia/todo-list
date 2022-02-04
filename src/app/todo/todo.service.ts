import { Injectable } from '@angular/core';

import { BehaviorSubject, filter, map, Subject, Subscription, tap } from 'rxjs';
import { IMessage } from './message.interface';

@Injectable()
export class TodoService {

  // constructor() { }
  // private _handler: Subject<IMessage> = new Subject<IMessage>();

  // notification(type: string, payload: any = null) {
  //   console.log('event', type, payload);
  //   this._handler.next({ type, payload });
  // }

  // subscribe(type: string, callback: (payload: any) => void): Subscription {
  //   return this._handler
  //     .pipe(
  //       filter((message: IMessage) => message.type === type),
  //       tap((message: IMessage) => console.log(message)),
  //     )
  //     .subscribe(callback);
  // }

  // subscribe(type: string, callback: (payload: any) => void): Subscription {
  //   return this._handler
  //     .pipe(
  //       filter((ev) => ev.type === type),
  //       tap((message: IMessage) => console.log(message)),
  //     )
  //     .subscribe(callback);
  // }

  private dataSource = new BehaviorSubject<any>({});
  data = this.dataSource.asObservable();

  private passDataToview = new BehaviorSubject<any>(null);
  passingData = this.passDataToview.asObservable();

  constructor() {}

  setData(data: string[]) {
    this.dataSource.next(data);
  }

  // passData(data) {
  //   this.passDataToview.next(data);
  // }
}