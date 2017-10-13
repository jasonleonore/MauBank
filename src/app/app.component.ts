import { Component, Input, ViewChild } from '@angular/core';
import { Platform,AlertController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {  PushOptions, PushObject,Push } from '@ionic-native/push';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MallPage } from '../pages/mall/mall';
// import { OneSignal } from '@ionic-native/onesignal';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;
  @ViewChild(Nav) nav: Nav;

  constructor(public platform: Platform, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      // Set your iOS Settings
      // var iosSettings = {};
      // iosSettings["kOSSettingsKeyAutoPrompt"] = false; // will not prompt users when start app 1st time
      // iosSettings["kOSSettingsKeyInAppLaunchURL"] = false; // false opens safari with Launch URL

      // OneSignal Code start:
      // Enable to debug issues.
      // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

      // var notificationOpenedCallback = function(jsonData) {
      //   console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      //   if (jsonData.notification.payload.additionalData != null) {
      //     console.log("Here we access addtional data");
      //     if (jsonData.notification.payload.additionalData.openURL != null) {
      //       console.log("Here we access the openURL sent in the notification data");
      //
      //     }
      //   }
      // };

      // this.pushsetup();
      var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window["plugins"].OneSignal
    //initialised the appId and registration token obtained from onesignal
    .startInit("870b753f-7d08-4c8b-a42f-4e99ee5d862f", "829511495115")
    // .iOSSettings(iosSettings) // only needed if added Optional OneSignal code for iOS above
  .handleNotificationOpened(notificationOpenedCallback)
    .endInit();



    });
    // this.getOneSignalPlayerId();

  }
  getOneSignalPlayerId() {
        window["plugins"].OneSignal.getPermissionSubscriptionState(function(status) {
          status.permissionStatus.hasPrompted;
          status.permissionStatus.status;

          status.subscriptionStatus.subscribed;
          status.subscriptionStatus.userSubscriptionSetting;
          status.subscriptionStatus.pushToken;

          //var playerID = status.subscriptionStatus.userId;
          alert("player id is"+status.subscriptionStatus.userId);
          console.log("player id is"+status.subscriptionStatus.userId);
      });
      }
  // this.push.register().then((t: PushToken) => {
  //   return this.push.saveToken(t);
  // }).then((t: PushToken) => {
  //   console.log('Token saved:', t.token);
  // });
  // this.push.rx.notification()
  // .subscribe((msg) => {
  //   alert(msg.title + ': ' + msg.text);
  // });

//   pushsetup(){
//      const options: PushOptions = {
//        android: {
//          senderID: '829511495115'
//        },
//        ios: {
//          alert: 'true',
//          badge: false,
//          sound: 'true'
//        },
//        windows: {}
//      };
//      const pushObject: PushObject = this.push.init(options);
//      pushObject.on('notification').subscribe((notification:any) => {
//        if(notification.additionalData.foreground){
//          let youralert = this.alertCtrl.create({
//            title: 'New Push Notification',
//            message: notification.message
//          });
//          youralert.present();
//        }
//      });
//      pushObject.on('registration').subscribe((registration:any) => console.log('device registered' + registration))
//      pushObject.on('error').subscribe(error => console.log('error with push plugin' + error))
// }
  // code to instantiate a push notification for the user

    //  if (!this.platform.is('cordova')) {
    //    console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
    //    return;
    //  }
    //  const options: PushOptions = {
    //    android: {
    //      senderID: '829511495115'
    //    },
    //    ios: {
    //      alert: 'true',
    //      badge: false,
    //      sound: 'true'
    //    },
    //    windows: {}
    //  };
    //  const pushObject: PushObject = this.push.init(options);

    //  pushObject.on('registration').subscribe((data: any) => {
    //    console.log('device token -> ' + data.registrationId);
    //    //TODO - send device token to server
    //  });

    //  pushObject.on('notification').subscribe((data: any) => {
    //    console.log('message -> ' + data.message);
    //    //if user using app and push notification comes
    //    if (data.additionalData.foreground) {
    //      // if application open, show popup
    //      let confirmAlert = this.alertCtrl.create({
    //        title: 'New Notification',
    //        message: data.message,
    //        buttons: [{
    //          text: 'Ignore',
    //          role: 'cancel'
    //        }, {
    //          text: 'View',
    //          handler: () => {
    //            //TODO: Your logic here
    //            this.nav.push(ListPage, { message: data.message });
    //          }
    //        }]
    //      });
    //      confirmAlert.present();
    //    } else {
    //      //if user NOT using app and push notification comes
    //      //TODO: Your logic on click of push notification directly
    //      this.nav.push(ListPage, { message: data.message });
    //      console.log('Push notification clicked');
    //    }
    //  });

}
