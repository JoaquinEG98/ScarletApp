import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private router: Router) { }

  public async GetStorageUser() {

    let User: IUser = {
      id: 0 ? null : parseInt(localStorage.getItem('UserId')),
      email: localStorage.getItem('Email'),
      name: localStorage.getItem('UserName'),
      lastname: localStorage.getItem('UserLastname'),
    }
        
    return User;
  }

  public async CheckStorageUser(user: IUser){
    let arrayUser = Object.values(user);

    arrayUser.forEach(item => {
      if (item == null || item == undefined){
        localStorage.clear();
        return this.router.navigateByUrl('');
      }
    });
  }

}
