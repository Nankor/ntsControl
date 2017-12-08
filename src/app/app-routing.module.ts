import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EntryListComponent} from './views/entry-list.component';
import {UsersComponent} from './views/user/users.component';
import {UserDetailComponent} from './views/user/user-detail.component';


const routes: Routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: 'list', component: EntryListComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users/:id', component: UserDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
