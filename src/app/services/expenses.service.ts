import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  mainUrl = 'http://localhost:3000';
  http = inject(HttpClient);
  monthlyExpenses: number[] = new Array(12).fill(0);

  constructor() {
    this.http.get(`${this.mainUrl}/expenses`).subscribe((res: any) => {
      res.forEach((el: any) => {
        const month = parseInt((el.date).split('/')[1]);
        this.monthlyExpenses[month - 1] += el.sum;
      });
    });
  }

  createExpense(formData: any) {
    return this.http.post(`${this.mainUrl}/expenses`, formData);
  }

  getExpenses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.mainUrl}/expenses`);
  }
}

