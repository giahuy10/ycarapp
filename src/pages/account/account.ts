import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { AlertController } from 'ionic-angular';
//import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the AccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})

export class AccountPage {
resposeData : any;
public userDetails : any;
  userData = {"user_id": "","username": "","oldpassword":"", "password":"","password2":""};
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public alertCtrl: AlertController) {
	   const data = JSON.parse(localStorage.getItem('userData'));
		this.userDetails = data.userData;
		this.userData.user_id = this.userDetails.user_id;
		this.userData.username = this.userDetails.username;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }
  presentAlert(notice) {
	  const alert = this.alertCtrl.create({
		title: 'Thông báo',
		subTitle: notice,
		buttons: ['Đóng']
	  });
	  alert.present();
	}
   changepassword(){
   if(this.userData.oldpassword && this.userData.password && this.userData.password2 && this.userData.password == this.userData.password2){
	   console.log(this.userData);
    this.authService.postData(this.userData, "changepassword").then((result) =>{
    this.resposeData = result;
    console.log(this.resposeData);
    if(this.resposeData.userData){
     //localStorage.setItem('userData', JSON.stringify(this.resposeData) )
   this.presentAlert("Đổi mật khẩu thành công!");
  }
  else{
    this.presentAlert("Mật khẩu cũ không đúng!");
  }
    


    }, (err) => {
      //Connection failed message
    });
   }
   else if (this.userData.password != this.userData.password2){
    this.presentAlert("Xác nhận mật khẩu mới không khớp!");
   }else {
	   this.presentAlert("Vui lòng nhập đầy đủ mật khẩu mới và mật khẩu cũ!");
   }
  
  }
 

}