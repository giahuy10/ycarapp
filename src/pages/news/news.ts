import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
/**
 * Generated class for the NewsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
	userPostData = "";
	shownGroup = null;
public resposeData : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider) {
	  this.authService.postData(this.userPostData, "news").then((result) =>{
			this.resposeData = result;
			console.log(this.resposeData);
			

			}, (err) => {
			//Connection failed message
			});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
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