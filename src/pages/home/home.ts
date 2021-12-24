import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { ExpenseBudgetModalPage } from '../expense-budget-modal/expense-budget-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalController: ModalController) {
    this.addNewExpense();
  }

  addNewExpense() {
    console.log('modal opened')
    this.modalController
      .create(ExpenseBudgetModalPage)
      .present()
      .then((res) => console.log(res));
  }
}
