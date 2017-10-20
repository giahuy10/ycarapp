import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { AlertController } from 'ionic-angular';
//import {CompletedPage} from "../completed/completed";
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the BoughtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-bought',
  templateUrl: 'bought.html',
})
export class BoughtPage {
public userDetails : any;
public resposeData : any;
public resposeData_detail : any;
public message_alert: any;	
public notice_alert: any;
public posttype: any;
userPostData = {
    "user_id": "",
    "token": "",
	"job_id": "",
	"reason": ""
   
};
shownGroup = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public alertCtrl: AlertController, private callNumber: CallNumber) {
    var temp = this;
		setInterval(function(){ 
		//alert('count '+(i++));
		const data = JSON.parse(localStorage.getItem('userData'));
		temp.userDetails = data.userData;
		temp.userPostData.user_id = temp.userDetails.user_id;
		temp.userPostData.token = temp.userDetails.token;
       
		temp.authService.postData(temp.userPostData, "bought").then((result) =>{
				temp.resposeData = result;
				//console.log(temp.resposeData);
				if(temp.resposeData.userData){
				 //localStorage.setItem('userData', JSON.stringify(temp.resposeData));
				
			  }

			}, (err) => {
		  //Connection failed message
		});
        
}, 300);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BoughtPage');
  }
  call(number) {
    this.callNumber.callNumber(number, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
}
toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
};
isGroupShown(group) {
    return this.shownGroup === group;
};
	
	presentAlert(notice) {
	  const alert = this.alertCtrl.create({
		title: 'Xác nhận',
		subTitle: notice,
		buttons: ['Đóng']
	  });
	  alert.present();
	}
	
	presentConfirm(id) {
	
		
		
		const alert = this.alertCtrl.create({
		title: 'Xác nhận hành động',
		message: 'Bạn đã đón được khách?',
		buttons: [
		  {
			text: 'Chưa',
			role: 'cancel',
			handler: () => {
			  console.log('Cancel clicked');
			}
		  },
		  {
			text: 'Đã đón',
			handler: () => {
					
			this.userPostData.user_id = this.userDetails.user_id;
			this.userPostData.token = this.userDetails.token;	
			this.userPostData.job_id = id;
			 
					this.authService.postData(this.userPostData, "taken_client").then((result) =>{
					this.resposeData_detail = result;
					console.log(result);
					this.presentAlert(this.resposeData_detail.res_message);
					//this.navCtrl.push(CompletedPage);
					}, (err) => {
					//Connection failed message
					});
			 
			}
		  }
		]
	  });
	  alert.present();
	}
	presentPrompt(id) {
	  const alert = this.alertCtrl.create({
		title: 'Hủy chuyến',
		inputs: [
		  {
			name: 'reason',
			placeholder: 'Lý do hủy chuyến:'
		  }
		],
		buttons: [
		  {
			text: 'Quay lại',
			role: 'cancel',
			handler: data => {
			  console.log('Cancel clicked');
			}
		  },
		  {
			text: 'Hủy chuyến',
			handler: data => {
				this.userPostData.user_id = this.userDetails.user_id;
				this.userPostData.token = this.userDetails.token;	
				this.userPostData.job_id = id;
				this.userPostData.reason = data.reason;
				this.authService.postData(this.userPostData, "cancel").then((result) =>{
					
					this.resposeData_detail = result;
					console.log(result);
					this.presentAlert(this.resposeData_detail.res_message)
					}, (err) => {
					//Connection failed message
					});
			}
		  }
		]
	  });
	  alert.present();
}
}
