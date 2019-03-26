import { Component } from '@angular/core';
import {
  IonicPage, NavController, LoadingController,
  Loading,
  AlertController
} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'signup.html',
})
export class SignUpPage {

  myForm: FormGroup;
  public loading: Loading;
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public afs: AngularFirestore,
  ) {
    this.myForm = this.createMyForm();
  }
  
  signup() {
    

    console.log("Email:" + this.myForm.value.email);
    console.log("Password:" + this.myForm.value.passwordRetry.password);

    //Creación de usuario 
    this.afAuth.auth.createUserWithEmailAndPassword(this.myForm.value.email, this.myForm.value.passwordRetry.password)
      .then(
        res => {
          this.navCtrl.setRoot('HomePage');
        }, error => {
          this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();


    
    let genero: string;
    if(this.myForm.value.gender.value == 1){
        genero = "Masculino";
    }else{
        genero = "Femenino";
    }
    //Inserción de datos en BD
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/Usuarios').add({
        Nombre: this.myForm.value.name,
        Apellidos: this.myForm.value.lastName,
        email: this.myForm.value.email,
        contraseña: this.myForm.value.passwordRetry.password,
        gender: genero,
        fechaNacimiento: this.myForm.value.dateBirth,

      })
      .then((res) => {
        resolve(res)
      },err => reject(err))
    })
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

