import {Component, OnInit, Input} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';

// Observable operators
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {TokenService} from '../services/token.service';
import {ApiToken} from '../models/api-token';
import {PageInf} from '../models/page-inf';
import {TableInf} from '../models/table-inf';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: []
})
export class TableComponent implements OnInit {
  @Input() tableInf: TableInf;
  items: object[];
  objKeys: string[];
  pageInf: PageInf;
  pageSize = 10;
  pageNumber = 0;
  pageNumberMax: number;
  private orgItems: object[];
  private searchTerms = new Subject<string>();
  private token: ApiToken;

  constructor(private tokenService: TokenService,
              private rooter: Router) {
    this.token = tokenService.token;
  }

  ngOnInit(): void {
    this.getOrgUsers();
    this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      // .switchMap(term => term)   // switch to new observable each time the term changes
      .subscribe(term => {
        // console.log('s: ' + term);
        if (term && this.items) {
          this.items = this.orgItems.filter(
            item => (item[this.tableInf.searchPName]
              && item[this.tableInf.searchPName].toLowerCase().includes(term.toLowerCase())));
        } else {
          this.items = this.orgItems;
        }
      });
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    // console.log(term);
    this.searchTerms.next(term);
  }

  getOrgUsers(size = 10, pageNumber = 0): void {
    this.pageSize = size;
    this.pageNumber = pageNumber;

    this.tableInf.getItemsFunc(size, pageNumber).subscribe(itemsPage => {
      // console.log('test  :  ' +  itemsPage);
      if (itemsPage) {
        this.items = this.orgItems = itemsPage.items;
        this.pageInf = itemsPage.pageInf;
        this.pageNumberMax = itemsPage.pageInf.totalPages - 1;
        if (this.items) {
          this.objKeys = Object.keys(this.items[0]);
        }
      }
    });
  }

  goDetail(id: number): void {
    this.rooter.navigate([`/${this.tableInf.routeName}/${id}`]);
  }

  setPageSize(size: number) {
    this.getOrgUsers(size, this.pageNumber);
  }

  setPageNumber(pageNumber: number) {
    this.getOrgUsers(this.pageSize, pageNumber);
  }

  gotoFirstPage() {
    if (this.pageNumber !== 0) {
      this.getOrgUsers(this.pageSize, 0);
    }
  }

  gotoPrePage() {
    if (this.pageNumber !== 0) {
      this.getOrgUsers(this.pageSize, this.pageNumber - 1);
    }
  }

  gotoNextPage() {
    if (this.pageNumber !== this.pageNumberMax) {
      this.getOrgUsers(this.pageSize, this.pageNumber + 1);
    }
  }

  gotoLastPage() {
    if (this.pageNumber !== this.pageNumberMax) {
      this.getOrgUsers(this.pageSize, this.pageInf.totalPages - 1);
    }
  }

}
