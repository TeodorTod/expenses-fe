import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Datepicker,
  Input,
  initTE,
  Dropdown,
  Ripple,
  Chart
} from "tw-elements";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpensesService } from '../services/expenses.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isDropdownOpen = false;
  fb = inject(FormBuilder);
  expensesService = inject(ExpensesService);
  expensesForm: FormGroup;
  types: any[] = ['Supermarket', 'Grocery', 'Pharmacy', 'Bills', 'Kid'];

  constructor() {
    this.expensesForm = this.fb.group({
      sum: ['', Validators.required],
      type: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    initTE({ Datepicker, Input, Dropdown, Ripple, Chart });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  submitExpense() {
    const formData = this.expensesForm.value;

    this.expensesService.createExpense(formData).subscribe((res: any) => {
      console.log('Expense saved successfully', res);
    })
  }
}
