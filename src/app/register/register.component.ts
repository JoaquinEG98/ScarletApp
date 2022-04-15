import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private toastService: ToastService) { }

  ngOnInit() { }

  async Register() {
    // No está funcionando el ngmodel en este componente - revisar más adelante, por ahora lo hago así.
    let email = document.getElementById('emailRegister') as HTMLInputElement;
    let name = document.getElementById('nameRegister') as HTMLInputElement;
    let lastname = document.getElementById('lastnameRegister') as HTMLInputElement;
    let password = document.getElementById('passwordRegister') as HTMLInputElement;

    let userRegister = {
      Email: email.value,
      Password: password.value,
      Name: name.value,
      Lastname: lastname.value
    }

    await this.userService.AddUser(userRegister).subscribe(async response => {
      if (response.statusCode == 200) {
        this.toastService.PresentSuccess('Usuario registrado con éxito!');
        this.router.navigateByUrl('');
      } else {
        this.toastService.PresentAlert(response.msg);
      }
    })
  }

  async RedirectLogin() {
    this.router.navigateByUrl('');
  }
}
