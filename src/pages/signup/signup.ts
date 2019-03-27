import { Component } from '@angular/core';
import {
  IonicPage, NavController, 
  Loading,
  AlertController
} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'signup.html'
})
export class SignUpPage {
  user = {email: "", password: ""};
  myForm: FormGroup;
  public loading: Loading;
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public afs: AngularFirestore,
    public auth : AuthProvider    
  ) {
    this.myForm = this.createMyForm();
  }
  

  //Método óptimo para el registro del usuario
  signup() {
    this.auth.registerUser(this.user.email,this.user.password)
    .then((user) => {
      // El usuario se ha creado correctamente
    })
    .catch(err=>{
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: err.message,
        buttons: ['Aceptar']
      });
      alert.present();
    })
  
    //Inserción de datos en BD
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/Usuarios').add({
        Nombre: this.myForm.value.name,
        Apellidos: this.myForm.value.lastName,
        email: this.myForm.value.email,
        contraseña: this.myForm.value.password,
        fechaNacimiento: this.myForm.value.dateBirth
      })
      .then((res) => {
        resolve(res)
      },err => reject(err))
    })
  }
  

  //Creacion del form
  private createMyForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      dateBirth: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}

