import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import {ApiToken} from './models/api-token';
import {TokenService} from './services/token.service';
import {PushNotificationsService} from 'ng-push';
import {AlertService} from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  apiToken: ApiToken;

  constructor(private tokenService: TokenService, private location: Location,
              private _pushNotifications: PushNotificationsService,
              private alertService: AlertService) {
    this.apiToken = tokenService.token;
  }

  ngOnInit(): void {
    // this._pushNotifications.requestPermission();
  }

  goBack(): void {
    this.location.back();
  }

  startTimer(): void {
    // this._pushNotifications.create('Test', {body: 'something'}).subscribe(
    //   res => console.log(res),
    //   err => console.log(err)
    // );
    this.alertService.start();
  }

  stopTimer(): void {
    this.alertService.stop();
  }

  doTest(): void {
    this.alertService.doNotif('test title', 'test body');
  }

}
