import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuariosI } from '../../app/models/usuarios.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth';
import { UsuariosProvider } from '../../providers/usuarios';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  constructor(public navCtrl: NavController, 
    public UP:UsuariosProvider,
    public navParams: NavParams,    
    public formBuilder: FormBuilder,
    public authService: AuthProvider,
    ) {
    this.userProfile=navParams.get("userProfile");
  }
  userProfile: UsuariosI = {
    id: "",
    name: "",
    lastName: "",
    email: "",
    birthDate: null
  }
  signUpForm = this.formBuilder.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    birthDate: ['', Validators.required],
    id: String
  });
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }
  updateUser(){
    this.UP.updateUsuario(this.signUpForm.value);
    this.navCtrl.setRoot("HomePage");
  }

}
