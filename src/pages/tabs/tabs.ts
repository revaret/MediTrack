import { Component } from '@angular/core';

import { ListingPage } from '../list/list';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ListingPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
