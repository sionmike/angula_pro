import {EntityClass} from '../entity.class';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService extends EntityClass{
  login(params: {}) {
    return super.post(`api/era/v1/pc/user/hefei/login`, params);
  }

  register(id: number, params: {}) {
    return super.patch(`api/era/v1/users/${id}`, params);
  }

  getCaptcha(params: {}) {
    return super.post(`api/era/v1/phone/captcha`, params);
  }
}
