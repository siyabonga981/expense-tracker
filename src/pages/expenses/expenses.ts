import { Component } from "@angular/core";
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController,
} from "ionic-angular";
import { ServicesApiProvider } from "../../providers/services-api/services-api";
import { ExpenseBudgetModalPage } from "../expense-budget-modal/expense-budget-modal";

@IonicPage()
@Component({
  selector: "page-expenses",
  templateUrl: "expenses.html",
})
export class ExpensesPage {
  expensesTotal = 0;
  showLoader: boolean = false;
  expenses: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalController: ModalController,
    private api: ServicesApiProvider,
    public toastController: ToastController
  ) {}

  ionViewDidLoad() {
    this.getExpenses();
    this.getExpensesTotal();
  }

  ionViewWillEnter(){
  }

  openExpenseDialog() {
    this.navParams.data = { status: "new", title: "Add New Expense" };
    this.modalController
      .create(ExpenseBudgetModalPage, this.navParams.data)
      .present();
  }

  openUpdateExpenseDialog(trans) {
    this.navParams.data = { status: "edit", title: "Edit Expense", trans };
    this.modalController
      .create(ExpenseBudgetModalPage, this.navParams.data)
      .present();
  }

  getExpenses() {
    this.showLoader = true;
    this.api
      .getTransactions("transaction/getTransactions", { tag: "Expense" })
      .subscribe((res: any) => {
        this.expenses = res.transactions;
        this.showLoader = false;
      }, err => {
        this.showLoader = false;
        this.presentToast(err.msg || "Error Connecting To Server!", "failed");
      });
  }

  getExpensesTotal() {
    this.showLoader = true;
    this.api
      .getExpensesTotal("transaction/getExpensesTotal", { tag: "Expense" })
      .subscribe((res: any) => {
        this.expensesTotal = res.total;
        this.showLoader = false;
      }, err => {
        this.showLoader = false;
        this.presentToast(err.msg || "Error Connecting To Server!", "failed");
      });
  }

  closeModal() {
    this.navCtrl.pop();
  }

  async presentToast(msg, toastClass) {
    await this.toastController
      .create({
        message: msg,
        cssClass: toastClass,
        duration: 2000,
      }).present();
  }
}
