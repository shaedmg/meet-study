import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { CredencialesI } from '../../app/models/usuarios.interface';
import { HomePage } from '../home/home';
import { FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public auth: AuthProvider
  ) {  }
  
  loginForm =  this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  creds: CredencialesI = {
    email: this.loginForm.value.email,
    password:this.loginForm.value.password
  };

  async loginUser() {
    //Manera óptima de iniciar sesión.
    try {
      await this.auth.loginUser(this.creds);
      this.navCtrl.setRoot(HomePage);
    } catch (error) {  }
    
  }

  goToSignup() {
    this.navCtrl.push('SignUpPage');
  }
}