import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponse } from '../models/response.model';
import { IUser } from '../models/user.model';
import { ILogin } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public AddUser(user): Observable<IResponse<IUser>>{
    return this.http.post<IResponse<IUser>>(environment.API_URL + 'user/adduser', user);
  }

  public Login(email: string, password: string): Observable<IResponse<ILogin>>{
    return this.http.get<IResponse<ILogin>>(environment.API_URL + 'user/login/' + email + '/' + password);
  }
}
