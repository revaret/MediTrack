import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import moment from 'moment';
import { DatePicker } from '@ionic-native/date-picker';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { TabsPage } from '../tabs/tabs';
import validator from 'Validator';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-med',
  templateUrl: 'medicine.html'
})
export class MedPage {

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      private datePicker: DatePicker,
      private localNotifications: LocalNotifications,
      public alertCtrl: AlertController,
      public toastCtrl: ToastController
      ) {
    this.initialize();
  }

  medTitle: string;
  reminderDates =[];
  medname: string;
  dosagef: string;
  dosage: string;
  reminderBadge = 0;
  numDose: string;
  edit: string;
  medicine = {};
  medpurch: string;
  confrmDltRm = false;

  initialize() {
    this.edit = this.navParams.get('edit');
    this.medicine = this.navParams.get('medicine');
    this.medTitle = (this.edit)?'Edit Medicine':'Add Medicine';
    if(this.edit) {
      this.medname = this.medicine['medname'];
      this.dosagef = this.medicine['dosage_freq'];
      this.dosage = this.medicine['dosage'];
      this.numDose = this.medicine['num_dose'];
      this.reminderBadge = this.medicine['reminder_bg'];
      this.reminderDates = this.medicine['reminderDates'];
      this.medpurch = this.medicine['medpurch'];
    }
  }

  radioChange() {
      console.log('radio changed', this.dosagef);
  }

  showConfirm() {
    let scope = this;
      let data = {
          medicine_name: this.medname,
          dosage_frequency: this.dosagef,
          quantity: this.dosage,
          number_of_dose: this.numDose,
          number_of_medicine_purchased: this.medpurch
      }
      let rules = {
          medicine_name: 'required',
          dosage_frequency: 'required',
          quantity: 'required',
          number_of_dose: 'required|numeric',
          number_of_medicine_purchased: 'required|numeric'
      }
      let v = validator.make(data,rules);
      if (v.fails()) {
        let errors = v.getErrors();
        console.log(errors);
        if(errors.medicine_name) {
            scope.presentToast(errors.medicine_name);
            return;
        }
        if(errors.dosage_frequency) {
            scope.presentToast(errors.dosage_frequency)
            return;
        }
        if(errors.quantity) {
            scope.presentToast(errors.quantity)
            return;
        }
        if(errors.number_of_dose) {
            scope.presentToast(errors.number_of_dose)
            return;
        }
        if(errors.number_of_medicine_purchased) {
            scope.presentToast(errors.number_of_medicine_purchased)
            return;
        }
        return;
    }
    let confirm = this.alertCtrl.create({
      title: "Check Expiry",
      message: "Please double check that the medicine has not expired by pressing Agree",
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
            scope.SaveMed();
          }
        }
      ]
    });
    confirm.present();
  }

  openPicker() {
      console.log('open picker called');
      var scope = this;
      this.datePicker.show({
        date: new Date(),
        mode: 'datetime',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(
        date => {
            console.log('Got date: ', date);
            console.log('moment date', moment(date).format('YYYY-MM-DD HH:mm:ss'));
            scope.reminderDates.push({
              date:moment(date).format('YYYY-MM-DD HH:mm:ss'),
              medicine: scope.medname,
              dose: scope.dosage
            });
            console.log('reminder dates',scope.reminderDates);
            scope.reminderBadge++;
        },
        err => console.log('Error occurred while getting date: ', err)
        );
  }

  calcTime(date) {
    const now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    return moment(date,"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"));
  }

  setReminders() {
    var scope = this;
    this.reminderDates.forEach((item)=>{
        scope.localNotifications.schedule({
            text: 'Time to take '+item['medicine']+' of '+item['dose']+'mg dosage',
            at: new Date(new Date().getTime() + scope.calcTime(item['date'])),
            led: 'FF0000',
            sound: null
        });
    });
  }

  clearReminders() {
    this.localNotifications.clearAll();
  }

  updateMed() {
    let scope = this;
    let medicines = JSON.parse(localStorage.medicine);
    this.setReminders();
    medicines.forEach((item)=>{
      if(item.medname === scope.medicine['medname']) {
        item.medname = scope.medname;
        item.dosage_freq =  scope.dosagef;
        item.dosage = scope.dosage;
        item.reminder_bg = scope.reminderBadge;
        item.num_dose = scope.numDose;
        item.reminderDates = scope.reminderDates;
        item.medpurch = scope.medpurch;
      }
    });
    localStorage.removeItem('medicine');
    localStorage.setItem('medicine',JSON.stringify(medicines));
    this.navCtrl.setRoot(TabsPage);
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

  SaveMed() {
      this.setReminders();
      if(this.edit){
        this.updateMed();
        return;
      }
      if(localStorage.medicine) {
        const arr = JSON.parse(localStorage.medicine);
        arr.push({
            medname: this.medname,
            dosage_freq: this.dosagef,
            dosage: this.dosage,
            reminder_bg: this.reminderBadge,
            num_dose: this.numDose,
            reminderDates: this.reminderDates,
            medpurch: this.medpurch
        });
        localStorage.setItem('medicine',JSON.stringify(arr));
        this.navCtrl.setRoot(TabsPage);
        return;
      }
        localStorage.setItem('medicine',JSON.stringify([{
        medname: this.medname,
        dosage_freq: this.dosagef,
        dosage: this.dosage,
        reminder_bg: this.reminderBadge,
        num_dose: this.numDose,
        reminderDates: this.reminderDates,
        medpurch: this.medpurch
    }]));
    this.navCtrl.setRoot(TabsPage);
  }
}