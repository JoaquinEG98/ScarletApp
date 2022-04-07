import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastControl: ToastController) { }

  public PresentSuccess(msg: string){
    let toast = this.toastControl.create({
      message: msg,
      duration: 6000,
      position: 'bottom',
      color: 'success'
    })
    .then((toastMsg) =>{
      toastMsg.present();
    });
  }

  public PresentAlert(msg: string){
    let toast = this.toastControl.create({
      message: msg,
      duration: 6000,
      position: 'bottom',
      color: 'danger'
    })
    .then((toastMsg) =>{
      toastMsg.present();
    });
  }
}
