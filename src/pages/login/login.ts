import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, MenuController } from 'ionic-angular';
// import { AuthService } from '../../providers/space-x/auth';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;

  constructor(private navCtrl: NavController, private aFauth: AngularFireAuth, public alertCtrl: AlertController, private menuCtrl: MenuController) {}

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

  async loginWithEmail(user : User) {
    try {
      const result = await this.aFauth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if(result) {
        this.navCtrl.setRoot(HomePage);
      }
    }
    catch(e) {
      this.showAlert(e.message);
    }
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }
}
