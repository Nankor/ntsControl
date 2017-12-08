import {Component} from '@angular/core';

import {TableInf} from '../../models/table-inf';
import {RestapiService} from '../../services/restapi.service';

@Component({
  selector: 'app-users',
  template: '<app-table [tableInf]="tableInf"></app-table>',
  styleUrls: []
})
export class UsersComponent {
  tableInf: TableInf = {
    listTitle: 'User',
    searchPName: 'email',
    routeName: 'users',
    getItemsFunc: this.restapiService.getUsersPage.bind(this.restapiService),
    addCreateButton: false
  };

  constructor(private restapiService: RestapiService) {
  }
}
