import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { CallNumber } from '@ionic-native/call-number';
@Component({
  selector: 'page-completed',
  templateUrl: 'completed.html'
})
export class CompletedPage {
	public userDetails : any;
public resposeData : any;	
userPostData = {
    "user_id": "",
    "token": ""
   
  };
  shownGroup = null;

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, private callNumber: CallNumber) {
	 var temp = this;
		setInterval(function(){ 
		//alert('count '+(i++));
		const data = JSON.parse(localStorage.getItem('userData'));
		temp.userDetails = data.userData;
		temp.userPostData.user_id = temp.userDetails.user_id;
		temp.userPostData.token = temp.userDetails.token;

		temp.authService.postData(temp.userPostData, "completed").then((result) =>{
				temp.resposeData = result;
				//console.log(temp.resposeData);
				if(temp.resposeData.userData){
				 //localStorage.setItem('userData', JSON.stringify(temp.resposeData));
				
			  }

			}, (err) => {
		  //Connection failed message
		});
        
    }, 300);
    //this.getjob();
}
call(number) {
    this.callNumber.callNumber(number, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
}
getjob(){
	 const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

	this.authService.postData(this.userPostData, "completed").then((result) =>{
			this.resposeData = result;
			console.log(this.resposeData);
			if(this.resposeData.userData){
			 //localStorage.setItem('userData', JSON.stringify(this.resposeData));
			
		  }

		}, (err) => {
      //Connection failed message
    });
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
}