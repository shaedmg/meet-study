import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuariosI } from '../../app/models/usuarios.interface';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,    
    public formBuilder: FormBuilder,
    ) {
    this.userProfile=navParams.get("userProfile");
  }
  showInfo(){
    console.log(this.userProfile);
    console.log(this.signUpForm);
    console.log(this.userDetails);
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
    password: ['', Validators.required]
  });
  userDetails = {
    name: this.userProfile.name,
    lastName: this.userProfile.lastName,
    email: this.userProfile.email,
    birthDate: this.userProfile.birthDate,
    //password: this.userProfile.password
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

}
