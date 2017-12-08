import {Component} from '@angular/core';

import {RestapiService} from '../../services/restapi.service';
import {DetailInf} from '../../models/detail-inf';


@Component({
  selector: 'app-user-detail',
  template: '<app-detail [detailInf]="detailInf"></app-detail>',
})
export class UserDetailComponent {
  detailInf: DetailInf = {
    title: 'User',
    getItemFunc: this.restapiService.getUser.bind(this.restapiService),
  };

  constructor(private restapiService: RestapiService) {
  }
}
