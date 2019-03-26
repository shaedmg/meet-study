import { Component } from '@angular/core';
import {
  IonicPage, NavController, LoadingController,
  Loading,
  AlertController
} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    public loadingCtrl: LoadingController
  ) {
    this.myForm = this.createMyForm();
  }

  signup() {

    console.log("Email:" + this.myForm.value.email);
    console.log("Password:" + this.myForm.value.passwordRetry.password);


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
