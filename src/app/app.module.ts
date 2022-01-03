import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BudgetPage } from '../pages/budget/budget';
import { AnalyticsPage } from '../pages/analytics/analytics';
import { ExpensesPage } from '../pages/expenses/expenses';
import { CategoriesPage } from '../pages/categories/categories';
import { ExpenseBudgetModalPage } from '../pages/expense-budget-modal/expense-budget-modal';
import { FormsModule } from '@angular/forms';
import { ServicesApiProvider } from '../providers/services-api/services-api';
import { HttpClientModule } from '@angular/common/http';
import { LoaderPage } from '../pages/loader/loader';
import { NgChartjsModule } from 'ng-chartjs';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    BudgetPage,
    AnalyticsPage,
    ExpensesPage,
    CategoriesPage,
    ExpenseBudgetModalPage,
    LoaderPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgChartjsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    BudgetPage,
    AnalyticsPage,
    ExpensesPage,
    CategoriesPage,
    ExpenseBudgetModalPage,
    LoaderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesApiProvider
  ]
})
export class AppModule {}
