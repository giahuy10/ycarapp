import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
//import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { BoughtPage } from '../pages/bought/bought';
import { CompletedPage } from '../pages/completed/completed';
import { AccountPage } from '../pages/account/account';
import { FinancePage } from '../pages/finance/finance';
import { NewsPage } from '../pages/news/news';
import { TransactionPage } from '../pages/transaction/transaction';
import { TabsPage } from '../pages/tabs/tabs';
import { OneSignal } from '@ionic-native/onesignal';
import { CallNumber } from '@ionic-native/call-number';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
//import { SignaturePadModule } from 'angular2-signaturepad';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    
    WelcomePage,
    LoginPage,
    SignupPage,
    BoughtPage,
    CompletedPage,
    AccountPage,
    FinancePage,
    NewsPage,
    TransactionPage,
    TabsPage
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    LoginPage,
    SignupPage,
    BoughtPage,
    CompletedPage,
    AccountPage,
    
    FinancePage,
    NewsPage,
    TransactionPage,
    TabsPage
  ],
  providers: [
  
    StatusBar,AuthServiceProvider,
    SplashScreen, OneSignal, CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
