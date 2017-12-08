import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {RestapiService} from '../services/restapi.service';
import {Item} from '../models/item';
import {DetailInf} from '../models/detail-inf';

@Component({
  selector: 'app-detail',
  templateUrl: 'detail.component.html'
})
export class DetailComponent implements OnInit {
  @Input() detailInf: DetailInf;
  item: Item;
  objKeys: string[];

  constructor(private accountService: RestapiService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    this.route.paramMap
      .switchMap((params: ParamMap) => this.detailInf.getItemFunc(+params.get('id')))
      .subscribe(item => {
        if (item) {
          this.item = item as Item;
          this.objKeys = Object.keys(item);
        }
      });
  }
}
