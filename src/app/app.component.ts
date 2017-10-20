import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,MenuController } from 'ionic-angular';
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
import { TabsPage } from '../pages/tabs/tabs';
import { TransactionPage } from '../pages/transaction/transaction';
import { Http } from '@angular/http';
import { OneSignal } from '@ionic-native/onesignal';
export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
pages: PageInterface[] = [
    { title: 'Chuyến xe', name: 'TabsPage', component: TabsPage, tabComponent: HomePage, index: 0, icon: 'calendar' },
    { title: 'Đã mua', name: 'TabsPage', component: TabsPage, tabComponent: BoughtPage, index: 1, icon: 'contacts' },
    { title: 'Đã hoàn thành', name: 'TabsPage', component: TabsPage, tabComponent: CompletedPage, index: 2, icon: 'map' },
    { title: 'Giao dịch', name: 'TabsPage', component: TabsPage, tabComponent: AccountPage, index: 3, icon: 'map' },
    { title: 'Nạp tiền', name: 'TabsPage', component: TabsPage, tabComponent: FinancePage, index: 4, icon: 'map' },
    { title: 'Thông báo', name: 'TabsPage', component: TabsPage, tabComponent: NewsPage, index: 5, icon: 'map' },
    { title: 'Cài đặt', name: 'TabsPage', component: TabsPage, tabComponent: TransactionPage, index: 6, icon: 'information-circle' }
  ];
  rootPage: any = WelcomePage;

 
 userPostData = {
    "user_id": "",
    "player_id": ""
   
    
   
};
public userDetails : any;
  constructor(public menu: MenuController,public platform: Platform, public statusBar: StatusBar,public http: Http, public splashScreen: SplashScreen,public one: OneSignal) {
    platform.ready().then(() => {
    statusBar.styleDefault();
    splashScreen.hide();



    var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    this.one
      .startInit("9c611d5c-e51f-4f51-bb9f-b8d679153272", "412282809785")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();
    
  });
  



  }



   openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

   
  }
}
