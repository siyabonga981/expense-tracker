import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ServicesApiProvider {
  // serverUrl = 'http://localhost:4000';
  serverUrl = 'https://transaction-tracker-backend.herokuapp.com';

  constructor(public http: HttpClient) {
  }

  getCategories(endpoint){
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.get(url);
  }

  addCategories(endpoint, body){
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.post(url, body);
  }

  getTransactions(endpoint, body){
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.post(url, body);
  }

  getExpensesTotal(endpoint, body){
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.post(url, body);
  }

  getBudgetItemsTotal(endpoint, body){
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.post(url, body);
  }

  getTotalBalance(endpoint){
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.get(url);
  }

  addTransaction(endpoint, body){
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.post(url, body);
  }

  updateTransaction(endpoint, body){
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.put(url, body);
  }

  deleteTransaction(endpoint){
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.delete(url);
  }
}
