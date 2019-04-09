import { AuthProvider } from '../../providers/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsuarioValidator } from '../../providers/usuario.validator';

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
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([
      UsuarioValidator.validUsername,
      Validators.required,
      Validators.email,
    ])),
    birthDate: ['', Validators.required],
    password: ['', Validators.required]
  });

  validation_messages = {
    'name': [
      { type: 'required', message: 'Username is required.' },
    ],
    'lastName': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 10 characters long.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },      
      { type: 'email', message: 'El email debe ser válido.' }
    ],

    //more messages
  }
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
    } catch (error) { 
    }
  }
}
