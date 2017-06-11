import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import validator from 'Validator';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-sos',
  templateUrl: 'sos.html'
})
export class SosPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController
    ) {
    this.initialize();
  }

  welcomeMessage = {
      title: "Emergency number!",
      description: "Please fill in the <b>emergency number</b> of person who is readily available to you , later you can reach out to them with one click of button from the app."
  };

  editMessage  = {
      title: "Modify your SOS!",
      description: "you can modify your <b>emergency number</b> by modifying the below details , which will be your <b>emergency contact</b> from now on."
  };
  sosMessage = {};
  mobile: string;
  edit: string;
  sos_name: string;

  initialize() {
      this.edit = this.navParams.get('edit');
      this.sosMessage = (this.edit) ? this.editMessage : this.welcomeMessage ;
      this.mobile = localStorage.getItem('mobile');
      this.sos_name = localStorage.getItem('sos_name');
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

  callSOS() {
    window.open("tel:" + localStorage.mobile);
  }

  saveMobile() {
      let scope = this;
      let data = {
          contact_name: this.sos_name,
          mobile: this.mobile
      }
      let rules = {
          contact_name: 'required',
          mobile: 'required|numeric'
      }

      let v = validator.make(data,rules);
      if (v.fails()) {
        let errors = v.getErrors();
        console.log(errors);
        if(errors.contact_name) {
            scope.presentToast(errors.contact_name);
            return;
        }
        if(errors.mobile) {
            scope.presentToast(errors.mobile)
            return;
        }
        return;
    }
      console.log('button clicked sos', this.mobile);
      localStorage.setItem('mobile',this.mobile);
      localStorage.setItem('sos_name',this.sos_name);
      localStorage.setItem('user','true');
      this.navCtrl.setRoot(TabsPage);
  }

}