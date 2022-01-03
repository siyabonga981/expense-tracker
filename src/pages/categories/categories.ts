import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServicesApiProvider } from '../../providers/services-api/services-api';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {
  showLoader = false;
   rgb = [];
   colors = ['blue', 'fuchsia', 'gray', 'green',
   'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
   'silver', 'teal']
  categories: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public toastController: ToastController, private api: ServicesApiProvider) {
  }

  ionViewDidLoad() {
    this.getExpensesCategories();
    this.shuffleArr();
  }

  shuffleArr(){
    this.rgb = this.colors.sort(() => Math.random() - 0.5);
  }

  async presentToast(msg, toastClass) {
    await this.toastController
      .create({
        message: msg,
        cssClass: toastClass,
        duration: 2500,
      })
      .present();
  }

  getExpensesCategories() {
    this.showLoader = true;
    this.api.getCategories("transaction/getExpensesCategories").subscribe(
      (res) => {
        this.categories = res;
        this.showLoader = false;
      },
      (err) => {
        this.showLoader = false;
        this.presentToast(err.msg || "Error Connecting To Server!", "");
      }
    );
  }

}
