import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HomePage } from "../pages/home/home";
import { BudgetPage } from "../pages/budget/budget";
import { CategoriesPage } from "../pages/categories/categories";
import { ExpensesPage } from "../pages/expenses/expenses";
import { AnalyticsPage } from "../pages/analytics/analytics";

@Component({
  templateUrl: "app.html",
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string; component: any, icon: string }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Home", component: HomePage, icon: "home" },
      { title: "Budget", component: BudgetPage, icon: "card" },
      { title: "Categories", component: CategoriesPage, icon: "document" },
      { title: "Expenses", component: ExpensesPage, icon: "cash" },
      { title: "Analytics", component: AnalyticsPage, icon: "analytics" },
      { title: "Logout", component: HomePage, icon: "power" }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
