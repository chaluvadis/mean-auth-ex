import { Injectable } from '@angular/core';
import { User } from '../user';
@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister = (user: User) => {
    if (user.name == undefined || user.username == undefined || user.email == undefined || user.password == undefined) {
      return false;
    } else {
      return true;
    }
  }
  validateEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateLogin = (username:string, password:string) => {
    if (username == undefined || password == undefined) {
      return false;
    } else {
      return true;
    }
  }
}
