import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
//import {DetailPage} from '../detail/detail';
/**
 * Generated class for the TransactionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})
export class TransactionPage {
//detailPage = DetailPage;
	public userDetails : any;
public resposeData : any;

userPostData = {
    "user_id": "",
    "token": ""
	
   
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider) {
	 var temp = this;
		setInterval(function(){ 
		//alert('count '+(i++));
		const data = JSON.parse(localStorage.getItem('userData'));
		temp.userDetails = data.userData;
		temp.userPostData.user_id = temp.userDetails.user_id;
		temp.userPostData.token = temp.userDetails.token;

		temp.authService.postData(temp.userPostData, "history").then((result) =>{
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
    console.log('ionViewDidLoad TransactionPage');
  }
  //seedetail2(id) {
	//	this.navCtrl.push(DetailPage, {id: id});
	//}

}