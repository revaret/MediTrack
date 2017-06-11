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
      title: "Welcome to the Meditrack!",
      description: "The <b>Meditrack</b> helps you to keep track of your medicine, lets begin by filling out your details."
  };
  user = {};
  name: string;
  age: string;

  initialize() {
      this.user = this.welcome;
  }

  saveUser() {
      console.log('button clicked user', this.name , this.age);
      localStorage.setItem('username',this.name);
      localStorage.setItem('age',this.age);
  }

}