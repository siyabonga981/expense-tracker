import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {
  categories = [
    {
      "name": "Entertainment",
      "icon": "happy"
    },{
      "name": "Food",
      "icon": "pizza"
    },{
      "name": "Family & Friends",
      "icon": "people"
    },{
      "name": "Cash Withdrawal",
      "icon": "cash"
    },{
      "name": "Account",
      "icon": "card"
    },{
      "name": "Transport",
      "icon": "car"
    },{
      "name": "Miscellaneous",
      "icon": "help"
    },
  ];
   rgb = [];
   colors = ['blue', 'fuchsia', 'gray', 'green',
   'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
   'silver', 'teal']


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
    this.shuffleArr();
  }

  shuffleArr(){
    this.rgb = this.colors.sort(() => Math.random() - 0.5);
  }
}
