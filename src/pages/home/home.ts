import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MedPage } from '../medicine/medicine';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    this.initialize();
  }
  medicines = [];

  initialize() {
    if(localStorage.medicine){
      this.medicines = JSON.parse(localStorage.medicine);
    }
  }

  addMeds() {
    this.navCtrl.push(MedPage);
  }

  callSOS() {
    window.open("tel:" + localStorage.mobile);
  }

}
