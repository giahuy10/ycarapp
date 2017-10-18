import {Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { AlertController } from 'ionic-angular';
//import {TabsPage} from '../tabs/tabs';
import {LoginPage} from "../login/login";

/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({selector: 'page-signup', templateUrl: 'signup.html'})
export class SignupPage {
  resposeData : any = {};
  userData = {"phone":"", "title":"","id_card":"","car_type":"","number_plates":"","number_seat":"","license":"","address":"","password":""};
  constructor(public navCtrl : NavController, public authService : AuthServiceProvider, public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

  signup() {
    if(this.userData.phone && this.userData.title && this.userData.id_card && this.userData.car_type && this.userData.number_plates && this.userData.number_seat && this.userData.license && this.userData.address && this.userData.password){
      //Api connections
    this.authService.postData(this.userData, "signup").then((result) =>{
    this.resposeData = result;
   if (this.resposeData.res_type == 1) {
	this.presentAlert(this.resposeData.res_message);
    this.navCtrl.push(LoginPage);
   }else {
	   this.presentAlert2(this.resposeData.res_message);
   }
    }, (err) => {
      //Connection failed message
    });
  }
  else {
    console.log("Give valid information.");
  }
  
  }
	presentAlert(message) {
	  const alert = this.alertCtrl.create({
		title: 'Đăng ký thành công',
		subTitle: message,
		buttons: ['Đóng']
	  });
	  alert.present();
	}
	presentAlert2(message) {
	  const alert = this.alertCtrl.create({
		title: 'Đăng ký thất bại',
		subTitle: message,
		buttons: ['Đóng']
	  });
	  alert.present();
	}
  login() {
    this
      .navCtrl
      .push(LoginPage);
  }

}