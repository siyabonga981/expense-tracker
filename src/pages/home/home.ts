import { Component } from "@angular/core";
import {
  ModalController,
  NavController,
  NavParams,
  ToastController,
} from "ionic-angular";
import { ServicesApiProvider } from "../../providers/services-api/services-api";
import { BudgetPage } from "../budget/budget";
import { ExpensesPage } from "../expenses/expenses";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  budgetArrTotal = 0;
  expensesTotal = 0;
  totalBalance = 0;
  showLoader: boolean = false;
  currentMonth: string = "";
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  recentFiveExpenses: any;
  constructor(
    public navCtrl: NavController,
    public modalController: ModalController,
    public navParams: NavParams,
    private toastController: ToastController,
    private api: ServicesApiProvider
  ) {
    this.getCurrentMonth();
    this.getBudgetTotal();
    this.getExpensesTotal();
    this.getTotalBalance();
    this.getRecentFiveExpenses();
  }

  viewAllExpenses() {
    this.navCtrl.setRoot(ExpensesPage);
  }

  public getBudgetTotal() {
    this.showLoader = true;
    this.api
      .getBudgetItemsTotal("transaction/getBudgetTotal", { tag: "Budget" })
      .subscribe(
        (res: any) => {
          this.budgetArrTotal = res.total;
          this.showLoader = false;
          return this.budgetArrTotal;
        },
        (err) => {
          this.showLoader = false;
          this.presentToast(err.msg || "Error Connecting To Server!", "failed");
        }
      );
  }

  getExpensesTotal() {
    this.showLoader = true;
    this.api
      .getExpensesTotal("transaction/getExpensesTotal", { tag: "Expense" })
      .subscribe(
        (res: any) => {
          this.showLoader = false;
          this.expensesTotal = res.total;
        },
        (err) => {
          this.showLoader = false;
          this.presentToast(err.msg || "Error Connecting To Server!", "failed");
        }
      );
  }

  getRecentFiveExpenses() {
    this.showLoader = true;
    this.api
      .getTransactions("transaction/getRecentFiveExpenses", { tag: "Expense" })
      .subscribe((res: any) => {
        this.recentFiveExpenses = res.transactions;
        this.showLoader = false;
      }, err => {
        this.showLoader = false;
        this.presentToast(err.msg || "Error Connecting To Server!", "failed");
      });
  }

  getTotalBalance() {
    this.showLoader = true;
    this.api.getTotalBalance("transaction/getTotalBalance").subscribe(
      (res: any) => {
        this.totalBalance = res.totalBalance;
        this.showLoader = false;
      },
      (err) => {
        this.showLoader = false;
        this.presentToast(err.msg || "Error Connecting To Server!", "failed");
      }
    );
  }

  async presentToast(msg, toastClass) {
    await this.toastController
      .create({
        message: msg,
        cssClass: toastClass,
        duration: 2000,
      })
      .present();
  }

  redirectToPage(page){
    this.navCtrl.setRoot(page === 'BudgetPage' ? BudgetPage : ExpensesPage)
  }
  getCurrentMonth() {
    return this.months[new Date().getMonth()];
  }
}
