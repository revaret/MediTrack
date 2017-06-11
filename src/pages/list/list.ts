import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListingPage {
  
  searchQuery: string = '';
  medicines = [];


  constructor(public navCtrl: NavController) {
    this.initializeItems();
  }

  initializeItems() {
    this.medicines = JSON.parse(localStorage.medicine);
  }
  
  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.medicines = this.medicines.filter((item) => {
        return (item.medname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
