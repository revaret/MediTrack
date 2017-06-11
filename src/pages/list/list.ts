import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MedPage } from '../medicine/medicine';

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
  
  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.medicines = this.medicines.filter((item) => {
        return (item.medname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  editMed(med: any) {
    console.log('edit med',med);
    this.navCtrl.push(MedPage,{
      medicine:med,
      edit: true
    });
  }
}
