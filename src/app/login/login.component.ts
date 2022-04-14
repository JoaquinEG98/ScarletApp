import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, 
              private router: Router, 
              private toastService: ToastService,
              private tokenService: TokenService) { }

  ngOnInit() {
    localStorage.clear();
  }

  async Login(){
        // No está funcionando el ngmodel en este componente - revisar más adelante, por ahora lo hago así.
        let email = document.getElementById('email') as HTMLInputElement;
        let password = document.getElementById('password') as HTMLInputElement;

        await this.userService.Login(email.value, password.value).subscribe(async response =>{
          if (response.statusCode == 200){
            
            localStorage.setItem('UserId', response.data.user.id.toString());
            localStorage.setItem('Email', response.data.user.email);
            localStorage.setItem('UserName', response.data.user.name);
            localStorage.setItem('UserLastname', response.data.user.lastname);
            this.tokenService.Token = response.data.token;

            this.router.navigateByUrl('home');
          }else{
            this.toastService.PresentAlert(response.msg);
          }
        })        
  }

  async RedirectRegister(){
    this.router.navigateByUrl('register');
  }

}
