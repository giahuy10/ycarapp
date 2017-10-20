import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BoughtPage } from '../bought/bought';
import { CompletedPage } from '../completed/completed';
import { AccountPage } from '../account/account';
import { FinancePage } from '../finance/finance';
import { NewsPage } from '../news/news';
import { TransactionPage } from '../transaction/transaction';
@Component({
selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = BoughtPage;
  tab3Root = CompletedPage;
   tab4Root = TransactionPage;
    tab7Root = AccountPage;
    tab5Root = FinancePage;
    tab6Root = NewsPage;
   
    mySelectedIndex: number;
  constructor(navParams: NavParams) {
   this.mySelectedIndex = navParams.data.tabIndex || 0;
}
  
}