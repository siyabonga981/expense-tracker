import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpenseBudgetModalPage } from './expense-budget-modal';

@NgModule({
  declarations: [
    ExpenseBudgetModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpenseBudgetModalPage),
  ],
})
export class ExpenseBudgetModalPageModule {}
