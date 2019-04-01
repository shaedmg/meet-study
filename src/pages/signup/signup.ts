import { AuthProvider } from '../../providers/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder,  Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'signup.html',
})
export class SignUpPage {
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public authService: AuthProvider,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController
  ) { }

  signUpForm = this.formBuilder.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    birthDate: ['', Validators.required],
    password: ['', Validators.required]
  });

  userDetails = {
    name: this.signUpForm.value.name,
    lastName: this.signUpForm.value.lastName,
    email: this.signUpForm.value.email,
    birthDate: this.signUpForm.value.dateBirth,
    password: this.signUpForm.value.password
  }
  

  ionViewDidLoad() { }

  signup() {
    try {
      this.authService.registerUser(this.userDetails);
      this.navCtrl.setRoot("HomePage");
    } catch (error) {  }
  }
}
