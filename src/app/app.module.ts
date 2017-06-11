import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePicker } from '@ionic-native/date-picker';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ListingPage } from '../pages/list/list';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UserPage} from '../pages/user_details/user';
import { SosPage } from '../pages/sos/sos';
import { MedPage } from '../pages/medicine/medicine';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ListingPage,
    SettingsPage,
    HomePage,
    TabsPage,
    UserPage,
    SosPage,
    MedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListingPage,
    SettingsPage,
    HomePage,
    TabsPage,
    UserPage,
    SosPage,
    MedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePicker,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
