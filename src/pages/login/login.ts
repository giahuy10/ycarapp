
import { TabsPage } from '../tabs/tabs';
import { Component } from '@angular/core';
import {  NavController, ToastController } from 'ionic-angular';

import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  resposeData : any;
  userData = {"username":"", "password":""};

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  login(){
   if(this.userData.username && this.userData.password){
    this.authService.postData(this.userData, "login").then((result) =>{
    this.resposeData = result;
    console.log(this.resposeData);
    if(this.resposeData.userData){
     localStorage.setItem('userData', JSON.stringify(this.resposeData) )
    this.navCtrl.push(TabsPage);
  }
  else{
    this.presentToast("Tài khoản hoặc mật khẩu không đúng");
  }
    


    }, (err) => {
      //Connection failed message
    });
   }
   else{
    this.presentToast("Vui lòng điền tài khoản và mật khẩu");
   }
  
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}