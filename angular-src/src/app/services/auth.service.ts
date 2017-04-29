import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: Http) { }
  registerUser = (user) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:1337/users/register', user, { headers: headers })
      .map(res => res.json());
  }
  loggedIn = () => {
    return tokenNotExpired('id_token');
  }
  loginUser = (user) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:1337/users/authenticate', user, { headers: headers })
      .map(res => res.json());
  }
  getUserProfile = () => {
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:1337/users/profile', { headers: headers })
      .map(res => res.json());
  }
  storeUserData = (token, user) => {
    //angular jwt to validate the token by default looks id_token from local storage, it can be configurgurable
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  loadToken = () => {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  logout = () => {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
