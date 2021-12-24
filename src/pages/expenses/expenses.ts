import { Component } from "@angular/core";
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams,
} from "ionic-angular";
import { ExpenseBudgetModalPage } from "../expense-budget-modal/expense-budget-modal";

/**
 * Generated class for the ExpensesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-expenses",
  templateUrl: "expenses.html",
})
export class ExpensesPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalController: ModalController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ExpensesPage");
  }

  addNewExpense() {
    console.log('modal opened')
    this.modalController
      .create(ExpenseBudgetModalPage)
      .present()
      .then((res) => console.log(res));
  }
}
