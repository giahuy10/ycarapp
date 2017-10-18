import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';
//import { LoginPage } from '../pages/login/login';
//import { SignupPage } from '../pages/signup/signup';
import { BoughtPage } from '../pages/bought/bought';
import { CompletedPage } from '../pages/completed/completed';
import { AccountPage } from '../pages/account/account';
import { FinancePage } from '../pages/finance/finance';
import { NewsPage } from '../pages/news/news';
import { TransactionPage } from '../pages/transaction/transaction';
import { Http } from '@angular/http';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WelcomePage;

  pages: Array<{title: string, component: any}>;
 userPostData = {
    "user_id": "",
    "player_id": ""
   
    
   
};
  constructor(public platform: Platform, public statusBar: StatusBar,public http: Http, public splashScreen: SplashScreen) {
    platform.ready().then(() => {
    statusBar.styleDefault();
    splashScreen.hide();

    // OneSignal Code start:
    // Enable to debug issues:
    // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

    var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window["plugins"].OneSignal
      .startInit("9c611d5c-e51f-4f51-bb9f-b8d679153272", "412282809785")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();
  
  });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Chuyến xe', component: HomePage },
      //{ title: 'List', component: ListPage },
       { title: 'Đã mua', component: BoughtPage },
        { title: 'Đã hoàn thành', component: CompletedPage },
          { title: 'Giao dịch', component: TransactionPage },
          { title: 'Nạp tiền', component: FinancePage },
           { title: 'Thông báo', component: NewsPage },
            { title: 'Cài đặt', component: AccountPage }
          
    ];

  }

 

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
