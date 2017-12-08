import {Injectable, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';

import {RestapiService} from './restapi.service';
import {Item} from '../models/item';
import {PushNotificationsService} from 'ng-push';


@Injectable()
export class AlertService implements OnDestroy {

  itemPathes: Array<string>;
  lastValues: Map<string, Item>;
  myTimerSubs: Subscription;

  constructor(private restapiService: RestapiService,
              private _pushNotifications: PushNotificationsService) {
    this.lastValues = new Map<string, Item>();
    this.itemPathes = ['users'];
  }

  start(): void {
    this._pushNotifications.requestPermission();
    // get our data every subsequent 10 seconds
    const timer = Observable.timer(0, 10000);
    this.myTimerSubs = timer
    // .takeWhile(() => this.alive) // only fires when component is alive
      .subscribe(() => {
        console.log(this);
        this.checkTables();
      });
    // setInterval(this.checkTables, 5000);
    // setTimeout(this.doNotif, 2000);
  }

  stop(): void {
    this.myTimerSubs.unsubscribe();
  }

  doNotif(title: string, body: string): void {
    this._pushNotifications.create(title, {body: body, icon: 'https://www.netsecop.com/files/images/favicon/favicon-96x96.png'}).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  checkTables(): void {
    // get the last item for all tables
    // compate with the prevoius items
    // if previous one is null store the new one
    // if equeal not do anything
    // if different alert
    for (const itemPath of this.itemPathes) {
      this.restapiService.getLastItem(itemPath)
        .subscribe(item => {
          if (item) {
            const preItem = this.lastValues.get(itemPath);
            if (preItem) {
              if (preItem.id !== item.id) {
                this.lastValues.set(itemPath, item);
                this.doNotif('New User', `New ${itemPath} Item id ${item.id}`);
              }
            } else {
              this.lastValues.set(itemPath, item);
            }
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.myTimerSubs.unsubscribe();
  }
}
