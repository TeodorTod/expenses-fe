import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  mainUrl = 'http://localhost:3000';
  http = inject(HttpClient);

  createExpense(formData: any) {
    return this.http.post(`${this.mainUrl}/expenses`, formData)
  }

}
