import { Component, Input } from "@angular/core";
import {
  AlertController,
  IonicPage,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
  ToastController,
} from "ionic-angular";
import { Transaction } from "../../interface/transaction";
import { ServicesApiProvider } from "../../providers/services-api/services-api";
import { BudgetPage } from "../budget/budget";
import { ExpensesPage } from "../expenses/expenses";
@IonicPage()
@Component({
  selector: "page-expense-budget-modal",
  templateUrl: "expense-budget-modal.html",
})
export class ExpenseBudgetModalPage {
  showLoader: boolean = false;
  expensesTotal = 0;
  transaction: Transaction = {
    title: null,
    amount: null,
    type: null,
    category: { name: null, icon: null },
    date: new Date().toDateString().slice(0, 15),
    notes: null,
  };
  categories: any = [];
  updatedCategories: any = [];
  childData: any;
  currentRoute: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ServicesApiProvider,
    public toastController: ToastController,
    public modalController: ModalController,
    private alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    this.currentRoute = this.navCtrl.getActive().name;
    this.getExpensesCategories();
    this.childData = this.navParams.data;
    console.log(this.childData.trans)
    if(this.childData.trans){
      this.prepopulateForm();
    }
  }

  ionViewDidEnter() {}
  prepopulateForm() {
    this.transaction =
      this.childData.status === "edit"
        ? this.childData.trans
        : this.transaction;
    this.transaction.category = this.childData.trans.category;
    this.transaction.date = new Date(this.childData.trans.date)
      .toDateString()
      .slice(0, 15);
      console.log(this.transaction)
  }

  addNewExpense(form) {
    form.value.tag = "Expense";
    if (form.invalid) {
      this.presentToast("Please fill in all fields!", "");
      return false;
    } else {
      this.showLoader = true;
      form.value.date = this.transaction.date;
      this.api.addTransaction("transaction/addExpense", form.value).subscribe(
        (res: any) => {
          this.presentToast(res.msg, "");
          this.showLoader = false;
          this.navCtrl.push(ExpensesPage);
        },
        (err) => {
          this.presentToast(err.msg || "Error Connecting To Server!", "");
        }
      );
    }
  }

  updateExpense(form) {
    if (form.invalid) {
      this.presentToast("Please fill in all fields!", "");
      return false;
    } else {
      this.showLoader = true;
      form.value.date = new Date(this.childData.trans.date)
        .toDateString()
        .slice(0, 15);
      this.api
        .updateTransaction(
          "transaction/updateExpense/" + this.childData.trans._id,
          form.value
        )
        .subscribe(
          (res: any) => {
            this.presentToast(res.msg, "");
            this.showLoader = false;
            this.navCtrl.push(ExpensesPage);
          },
          (err) => {
            this.showLoader = false;
            this.presentToast(err.msg || "Error Connecting To Server!", "");
          }
        );
    }
  }

  deleteTransaction(id) {
    this.showLoader = true;
    this.api.deleteTransaction("transaction/deleteExpense/" + id).subscribe(
      (res: any) => {
        this.presentToast(res.msg, "");
        this.navCtrl.push(this.childData.title === 'Edit Income Item' ? BudgetPage : ExpensesPage);
      },
      (err) => {
        this.showLoader = false;
        this.presentToast(err.msg || "Error Connecting To Server!", "");
      }
    );
  }

  addNewBudget(form) {
    form.value.tag = "Budget";
    if (form.invalid) {
      this.presentToast("Please fill in all fields!", "");
      return false;
    } else {
      this.showLoader = true;
      form.value.date = this.transaction.date;
      this.api.addTransaction("transaction/AddBudget", form.value).subscribe(
        (res: any) => {
          this.presentToast(res.msg, "");
          this.showLoader = false;
          this.navCtrl.push(BudgetPage);
        },
        (err) => {
          this.presentToast(err.msg || "Error Connecting To Server!", "");
        }
      );
    }
  }

  updateBudget(form) {
    if (form.invalid) {
      this.presentToast("Please fill in all fields!", "");
      return false;
    } else {
      this.showLoader = true;
      form.value.date = new Date(this.childData.trans.date)
        .toDateString()
        .slice(0, 15);
      this.api
        .updateTransaction(
          "transaction/updateBudget/" + this.childData.trans._id,
          form.value
        )
        .subscribe(
          (res: any) => {
            this.presentToast(res.msg, "");
            this.showLoader = false;
            this.navCtrl.push(BudgetPage);
          },
          (err) => {
            this.showLoader = false;
            this.presentToast(err.msg || "Error Connecting To Server!", "");
          }
        );
    }
  }
  openDeleteAlert(id) {
    this.presentConfirm(id);
  }

  getExpensesCategories() {
    this.showLoader = true;
    this.api.getCategories("transaction/getExpensesCategories").subscribe(
      (res) => {
        this.categories = res;
        if (this.childData.trans !== undefined) {
          for (let i = 0; i < this.categories.length; i++) {
            if (
              this.childData.trans.category.name === this.categories[i].name
            ) {
              this.categories.splice(i, 1);
              this.updatedCategories = this.categories;
            }
          }
        }
        this.showLoader = false;
      },
      (err) => {
        this.showLoader = false;
        this.presentToast(err.msg || "Error Connecting To Server!", "");
      }
    );
  }

  presentConfirm(id) {
    let alert = this.alertCtrl.create({
      title: "Delete Warning",
      message: "Do you want to delete this expense?",
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.deleteTransaction(id);
          },
        },
        {
          text: "No",
          handler: () => {
            this.navCtrl.pop();
          },
        },
      ],
    });
    alert.present();
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

  closeModal() {
    this.navParams.data = "test";
    this.navCtrl.pop();
  }
}
