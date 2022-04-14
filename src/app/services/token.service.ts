import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  private _token: string;
  get Token(): string {
    this._token = localStorage.getItem('TOKEN');
    return this._token;
  }
  set Token(value: string) {
    this._token = value;
    localStorage.setItem('TOKEN', this._token);
  }

}
