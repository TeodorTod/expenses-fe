import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal}from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  mainUrl = 'http://localhost:3000';
  http = inject(HttpClient);
  januaryExpenses = 110;
  februaryExpenses = 110;
  marchExpenses = 110;
  aprilExpenses = 110;
  mayExpenses = 110;
  juneExpenses = 110;
  julyExpenses = 110;
  augustExpenses = 110;
  septemberExpenses = 110;
  octoberExpenses = 110;
  novemberExpenses = 110;
  decemberExpenses = 110;

  constructor() {
    this.http.get(`${this.mainUrl}/expenses`).subscribe((res: any) => {
      res.map((el: any) => {
        if ((el.date).split('/')[1] == 1) {
        } else if ((el.date).split('/')[1] == 9) {
          this.septemberExpenses += el.sum
        }
        
      })
      
    })
  }

  createExpense(formData: any) {
    return this.http.post(`${this.mainUrl}/expenses`, formData)
  }

}
