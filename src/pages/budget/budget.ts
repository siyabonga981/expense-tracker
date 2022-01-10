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
  selector: 'page-budget',
  templateUrl: 'budget.html',
})
export class BudgetPage {
  budgetArrTotal = 0;
  showLoader: boolean = false;
  budgetArr: any = [];
  currentRoute: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalController: ModalController,
    private api: ServicesApiProvider,
    public toastController: ToastController
  ) {}

  ionViewDidLoad() {
    this.getBudget();
    this.getBudgetTotal();
  }

  ionViewWillEnter(){
  }

  openBudgetDialog() {
    this.navParams.data = { status: "new", title: "Add To Income" };
    this.modalController
      .create(ExpenseBudgetModalPage, this.navParams.data)
      .present().then(() => {
    console.log('From budget open',this.navCtrl.getActive());

      // let index = this.navCtrl.indexOf(this.navCtrl.getActive());
      // this.navCtrl.remove(index);
    });;
  }

  openUpdateBudgetDialog(trans) {
    console.log('From budget update',this.navCtrl.getActive());

    this.navParams.data = { status: "edit", title: "Edit Income Item", trans };
    this.modalController
      .create(ExpenseBudgetModalPage, this.navParams.data)
      .present().then(() => {
      // let index = this.navCtrl.indexOf(this.navCtrl.getActive());
      // this.navCtrl.remove(index);
    });;
  }

  getBudget() {
    this.showLoader = true;
    this.api
      .getTransactions("transaction/getTransactions", { tag: "Budget" })
      .subscribe((res: any) => {
        this.budgetArr = res.transactions;
        this.showLoader = false;
      }, err => {
        this.showLoader = false;
        this.presentToast(err.msg || "Error Connecting To Server!", "failed");
      });
  }

  getBudgetTotal() {
    this.showLoader = true;
    this.api
      .getBudgetItemsTotal("transaction/getBudgetTotal", { tag: "Budget" })
      .subscribe((res: any) => {
        this.budgetArrTotal = res.total;
        this.showLoader = false;
      }, err => {
        this.showLoader = false;
        this.presentToast(err.msg || "Error Connecting To Server!", "failed");
      });
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
