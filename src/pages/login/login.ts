import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, Loading, AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario= { email : '', password : ''};
  myForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public auth : AuthProvider,
    public alertCtrl : AlertController
  ) {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }

  loginUser(){

    //Manera óptima de iniciar sesión.
    this.auth.loginUser(this.usuario.email,this.usuario.password ).then((usuario) => {
    }
  )
   .catch(err=>{
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: err.message,
      buttons: ['Aceptar']
    });
    alert.present();
  })


  }
  

  goToSignup(){
    this.navCtrl.push('SignUpPage');
  }

 

}