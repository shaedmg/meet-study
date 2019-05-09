import {AuthProvider} from '../../providers/auth';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, Validators, FormControl } from '@angular/forms';

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
    public toastCtrl: ToastController
  ) {
  }

  signUpForm = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email,
    ])),
    birthDate: ['', Validators.required],
    password: new FormControl('', Validators.compose([
      Validators.minLength(6),
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
    ])),
    /*passwordGroup: this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (passwordGroup: FormGroup) => {
      return PasswordValidator.areEqual(passwordGroup);
    })*/
  });

  validation_messages = {
    'name': [
      {type: 'required', message: 'El nombre es un campo obligatorio'},
    ],
    'lastName': [
      {type: 'required', message: 'Los apellidos son obligatorios'},
    ],
    'email': [
      {type: 'required', message: 'El email es un campo obligatorio'},
      {type: 'email', message: 'El email debe ser válido.'}
    ],
    'birthDate': [
      {type: 'required', message: 'La fecha de nacimiento es un campo obligatorio'},
    ],
    'password': [
      {type: 'required', message: 'La contraseña es un campo obligatorio'},
      {type: 'pattern', message: 'La contraseña debe tener mayúscula, minúscula y números'},
      {type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres'},
      {type: 'maxlength', message: 'La contraseña debe tener al menos 25 caracteres'}
    ],
    /*'confirmPassword': [
      {type: 'required', message: 'Tienes que confirmar tu contraseña'},
      {type: 'areEqual', message: 'Las contraseñas no coinciden'}
    ]*/

  };

  userDetails = {
    name: this.signUpForm.value.name,
    lastName: this.signUpForm.value.lastName,
    email: this.signUpForm.value.email,
    birthDate: this.signUpForm.value.birthDate,
    password: this.signUpForm.value.password
  };


  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'El email que intenta utilizar ya está en uso.',
      duration: 2000
    });
    toast.present();
  }

  ionViewDidLoad() {
  }

  async signup() {
    try {
      var responseCode;
      console.log(this.userDetails);
      await this.authService.registerUser(this.userDetails).then(function (value) {
        if(value!=null){
          responseCode = value.code;
          return;
        }
        responseCode="success";
      });
      console.log(responseCode);

      if(responseCode=="auth/email-already-in-use"){
        this.presentToast();
      }else{
        this.navCtrl.setRoot("HomePage");
      }





    } catch (error) {
    }
  }
}
