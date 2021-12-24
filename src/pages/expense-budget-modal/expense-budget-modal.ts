import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-expense-budget-modal',
  templateUrl: 'expense-budget-modal.html',
})

export class ExpenseBudgetModalPage {

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  getTransactionType(transactionType){
    let transType = transactionType;
    console.log(transType);
  }
}
