import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private aFauth: AngularFireAuth, private alertCtrl: AlertController, private menuCtrl: MenuController) {
  }

  ionViewDidEnter() {
    this.menuCtrl.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.swipeEnable(true);
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Login error!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  async registerWithEmail(user : User) {
    try {
      const result = await this.aFauth.auth.createUserWithEmailAndPassword(user.email, user.password);
      if(result) {
        this.navCtrl.setRoot(HomePage);
      }
    }
    catch (e) {
      console.error(e);
    }
  }

}
