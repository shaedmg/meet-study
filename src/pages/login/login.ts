import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { CredencialesI, UsuariosI } from '../../app/models/usuarios.interface';
import { HomePage } from '../home/home';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth';
import { UsuariosProvider } from '../../providers/usuarios';
import { take } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public auth: AuthProvider,
    public userProvider:UsuariosProvider
  ) {  }
  user: UsuariosI = {
    name: "",
    lastName: "",
    email: "",
    birthDate: null,
  };
  
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
      this.userProvider.getCurrentUser().pipe(take(1)).toPromise()
      .then(usuario => {
        this.user = usuario;
      });
      this.navCtrl.setRoot('HomePage', {userProfile: this.user});
    } catch (error) {  }
    
  }

  goToSignup() {
    this.navCtrl.push('SignUpPage');
  }
}