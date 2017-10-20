import { Component } from '@angular/core';
import {NavController, App, AlertController,NavParams} from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
//import {Common} from "../../providers/common";
import {WelcomePage} from "../welcome/welcome";
import {BoughtPage} from "../bought/bought";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
shownGroup = null;
public userDetails : any;
  public resposeData : any;
  bought_response: any = {};
  blance_response: any = {};
  public dataSet : any;
  userPostData = {
    "user_id": "",
    "token": "",
    "job_id":""
    
   
};
  constructor( private alertCtrl: AlertController,public navCtrl : NavController, public app : App, public authService : AuthServiceProvider, public navParams: NavParams,public one: OneSignal) {
  
  
   
		if (JSON.parse(localStorage.getItem('userData'))) {
        const data = JSON.parse(localStorage.getItem('userData'));
        this.userDetails = data.userData;
         
        
  
     
         this.one.getIds().then((ids) => {
            this.userDetails.player_id = ids.userId,
            
            this.authService.postData(this.userDetails, "saveplayerid").then((result) =>{
				

			}, (err) => {
		  //Connection failed message
		      });
            });
            
          
		var temp = this;
      

       
    
		setInterval(function(){ 
		//alert('count '+(i++));
		
		
		temp.userDetails = data.userData;
		temp.userPostData.user_id = temp.userDetails.user_id;
		temp.userPostData.token = temp.userDetails.token;

		temp.authService.postData(temp.userPostData, "new").then((result) =>{
				temp.resposeData = result;
				

			}, (err) => {
		  //Connection failed message
		});
        temp.authService.postData(temp.userPostData, "balance").then((result) =>{
				temp.blance_response = result;	  

			}, (err) => {
		  //Connection failed message
		  });
		
    }, 300);
    }
    
  }
  getjob(){
	 const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

	this.authService.postData(this.userPostData, "new").then((result) =>{
			this.resposeData = result;
			console.log(this.resposeData);
			if(this.resposeData.userData){
			 //localStorage.setItem('userData', JSON.stringify(this.resposeData));
			
		  }

		}, (err) => {
      //Connection failed message
    });
}
  logout() {
    
    const alert = this.alertCtrl.create({
		title: 'Xác nhận hành động',
		message: 'Bạn chắc chắn muốn thoát khỏi ứng dụng?',
		buttons: [
		  {
			text: 'Không',
			role: 'cancel',
			handler: () => {
			  console.log('Cancel clicked');
			}
		  },
		  {
			text: 'Thoát',
			handler: () => {
                 this.authService.postData(this.userDetails, "removeplayerid").then((result) =>{
				
                

			     }, (err) => {
                  //Connection failed message
                });

            //Api Token Logout
            localStorage.clear();
          this.app.getRootNav().setRoot(WelcomePage);
			 
			}
		  }
		]
	  });
	  alert.present();
    
    

}
   backToWelcome() {
    const root = this
      .app
      .getRootNav();
    root.popToRoot();
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
  presentAlert(textmessage) {
	  const alert = this.alertCtrl.create({
		title: 'Thông báo',
		subTitle: textmessage,
		buttons: ['Đóng']
	  });
	  alert.present();
	}
	
	presentConfirm(id) {
	
		
		
		const alert = this.alertCtrl.create({
		title: 'Xác nhận hành động',
		message: 'Bạn chắc chắn muốn mua chuyến đi này?',
		buttons: [
		  {
			text: 'Không',
			role: 'cancel',
			handler: () => {
			  console.log('Cancel clicked');
			}
		  },
		  {
			text: 'Mua Ngay',
			handler: () => {
			const data = JSON.parse(localStorage.getItem('userData'));
			this.userDetails = data.userData;	
			this.userPostData.user_id = this.userDetails.user_id;
			this.userPostData.token = this.userDetails.token;	
			this.userPostData.job_id = id;
			 
					this.authService.postData(this.userPostData, "buy_job").then((result) =>{
						this.bought_response = result;
                        console.log(this.bought_response);
					if (this.bought_response.res_type == 1) {
						this.presentAlert(this.bought_response.res_message);
						//this.navCtrl.push(BoughtPage);
					}else {
						this.presentAlert(this.bought_response.res_message);
					}	
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
