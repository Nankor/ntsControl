import {Injectable} from '@angular/core';
import {ApiToken} from '../models/api-token';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class TokenService {
  token: ApiToken = {id: ''};

  getHttpHeaders(): Object {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token.id}`
      })
    };
  }
}
