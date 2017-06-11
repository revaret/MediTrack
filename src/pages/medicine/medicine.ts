import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import moment from 'moment';
import { DatePicker } from '@ionic-native/date-picker';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { TabsPage } from '../tabs/tabs';


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
      public alertCtrl: AlertController
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
    }
  }

  radioChange() {
      console.log('radio changed', this.dosagef);
  }

  showConfirm(title,message,okCalbc,scope) {
    let confirm = this.alertCtrl.create({
      title: title,
      message: message,
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
            okCalbc(scope);
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
      }
    });
    localStorage.removeItem('medicine');
    localStorage.setItem('medicine',JSON.stringify(medicines));
    this.navCtrl.setRoot(TabsPage);
  }

  SaveMed() {
      console.log(this.medname,this.dosagef,this.dosage,this.reminderBadge);
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
            reminderDates: this.reminderDates
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
        reminderDates: this.reminderDates
    }]));
    this.navCtrl.setRoot(TabsPage);
  }
}