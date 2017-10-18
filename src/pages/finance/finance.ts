import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
/**
 * Generated class for the FinancePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-finance',
  templateUrl: 'finance.html',
})
export class FinancePage {
detail: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
	  	this.http.get('http://driver.ycar.vn/index.php?option=com_uber&view=json&format=json&task=topup').map(res => res.json()).subscribe(data => {
        this.detail = data;
			console.log(this.detail); 
		},
		err => { 
			console.log("Oops!");
		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinancePage');
  }

}