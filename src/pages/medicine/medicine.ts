import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
      private localNotifications: LocalNotifications
      ) {
    this.initialize();
  }

  medTitle: string;
  reminderDates =[{}];
  medname: string;
  dosagef: string;
  dosage: string;
  reminderBadge = 0;
  numDose: string;

  initialize() {
    this.medTitle = 'Add Medicine';
  }

  radioChange() {
      console.log('radio changed', this.dosagef);
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
            scope.reminderDates.push({date:moment(date).format('YYYY-MM-DD HH:mm:ss')});
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
            text: 'Delayed ILocalNotification',
            at: new Date(new Date().getTime() + scope.calcTime(item['date'])),
            led: 'FF0000',
            sound: null
        });
    });
  }

  clearReminders() {
    this.localNotifications.clearAll();
  }

  SaveMed() {
      console.log(this.medname,this.dosagef,this.dosage,this.reminderBadge);
      this.setReminders();
      if(localStorage.medicine) {
        const arr = JSON.parse(localStorage.medicine);
        arr.push({
            medname: this.medname,
            dosage_freq: this.dosagef,
            dosage: this.dosage,
            reminder_bg: this.reminderBadge,
            num_dose: this.numDose
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
        num_dose: this.numDose
    }]));
    this.navCtrl.setRoot(TabsPage);
  }
}