import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'signup.html',
})
export class SignUpPage implements OnInit{

  myForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController
  ) {
    this.myForm = this.createMyForm();
  }
  ngOnInit(){}

  saveData() {
    let alert = this.alertCtrl.create({
      title: "Se ha creado la cuenta correctamente.",
      buttons: ["Ok"]
    });
    alert.present();
  }
 

  private createMyForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      dateBirth: ['', Validators.required],
      passwordRetry: this.formBuilder.group({
        password: ['', Validators.required],
        passwordConfirmation: ['', Validators.required]
      }),
      gender: ['', Validators.required],
    });
  }
}
