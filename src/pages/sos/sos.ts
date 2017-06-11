import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  constructor(public navCtrl: NavController) {
    this.initialize();
  }

  welcome = {
      title: "Emergency number!",
      description: "Please fill in the <b>emergency number</b> of person who is readily available to you , later you can reach out to them with one click of button from the app."
  };
  sos = {};
  mobile: string;

  initialize() {
      this.sos = this.welcome;
  }

  saveMobile() {
      console.log('button clicked sos', this.mobile);
      localStorage.setItem('mobile',this.mobile);
  }

}