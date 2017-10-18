import { Component } from '@angular/core';

import { BoughtPage } from '../bought/bought';
import { CompletedPage } from '../completed/completed';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = BoughtPage;
  tab3Root = CompletedPage;
 

  constructor() {

  }
}