import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'; // <-- NgModel lives here
import {HttpClientModule} from '@angular/common/http';

import {PushNotificationsModule} from 'ng-push';

import { AppComponent } from './app.component';
import {MessageService} from './services/message.service';
import {RestapiService} from './services/restapi.service';
import {TokenService} from './services/token.service';
import {TableComponent} from './views/table.component';
import {DetailComponent} from './views/detail.component';
import {EntryListComponent} from './views/entry-list.component';
import {UsersComponent} from './views/user/users.component';
import {UserDetailComponent} from './views/user/user-detail.component';
import {AppRoutingModule} from './app-routing.module';
import {MessagesComponent} from './views/messages/messages.component';
import {AlertService} from './services/alert.service';


@NgModule({
  declarations: [
    AppComponent, TableComponent, DetailComponent, EntryListComponent, UsersComponent, UserDetailComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, PushNotificationsModule
  ],
  providers: [MessageService, RestapiService, TokenService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
