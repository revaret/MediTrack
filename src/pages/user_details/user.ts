import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SosPage } from '../sos/sos';
import { TabsPage } from '../tabs/tabs';
import validator from 'Validator';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public toastCtrl: ToastController
      ) {
    this.initialize();
  }

  presentToast(obj) {
    obj.forEach(element => {
        let toast = this.toastCtrl.create({
            message: element,
            duration: 3000
        });
        toast.present();
    });
  }

  welcomeMessage = {
      title: "Welcome to the Meditrack!",
      description: "The <b>Meditrack</b> helps you to keep track of your medicine, lets begin by filling out your details."
  };

  editMessage = {
      title: "Modify your profile!",
      description: "You can modify your <b>profile</b> by editing the details below which will reflect in your app."
  };

  userMessage = {};
  name: string;
  age: string;
  edit: string;

  initialize() {
      this.edit = this.navParams.get('edit');
      this.name = localStorage.getItem('username');
      this.age = localStorage.getItem('age');
      this.userMessage = (this.edit)? this.editMessage :this.welcomeMessage;
  }

  saveUser() {
      let scope = this;
      let data = {
          username: this.name,
          age: this.age
      }
      let rules = {
          username: 'required',
          age: 'required|numeric'
      }

      let v = validator.make(data,rules);
      if (v.fails()) {
        let errors = v.getErrors();
        console.log(errors);
        if(errors.username) {
            scope.presentToast(errors.username);
            return;
        }
        if(errors.age) {
            scope.presentToast(errors.age)
            return;
        }
        return;
    }
      console.log('button clicked user', this.name , this.age);
      localStorage.setItem('username',this.name);
      localStorage.setItem('age',this.age);
      if(this.edit) {
          this.navCtrl.setRoot( TabsPage);
          return;
      }
      this.navCtrl.setRoot( SosPage);
  }

}