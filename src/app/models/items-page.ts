import {Links} from './links';
import {PageInf} from './page-inf';


export class ItemsPage {
  items: Object[];
  links: Links;
  pageInf: PageInf;

  constructor(itemsName: string, resp) {
    this.items = resp[itemsName];
    this.links = resp['_links'] as Links;
    this.pageInf = resp['page'] as PageInf;
  }



}
