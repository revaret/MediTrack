import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserPage } from '../user_details/user';
import { SosPage } from '../sos/sos';
import { MedPage } from '../medicine/medicine';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  username:string;
  age: string;

  constructor(public navCtrl: NavController) {
    this.username = localStorage.username;
    this.age = localStorage.age;
  }

  profileClick() {
    this.navCtrl.push(UserPage, {
      edit: true
    });
  }

  sosClick() {
    this.navCtrl.push( SosPage, {
      edit: true
    });
  }

  callSOS() {
    window.open("tel:" + localStorage.mobile);
  }

  medClick() {
    this.navCtrl.push( MedPage);
  }

}
