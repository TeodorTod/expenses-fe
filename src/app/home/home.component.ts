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
  isSent: boolean = false;

  

  

  constructor() {
    this.expensesForm = this.fb.group({
      sum: ['', Validators.required],
      type: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    initTE({ Datepicker, Input, Dropdown, Ripple, Chart });

    
    initTE({ Chart });
    
    // Chart
    const dataBar = {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Expenses',
            data: [2112, 2343, 2545, 3423, 2365, 1985, 987, 2112, 2343, 2545, 3423, 2365, 1985, 987],
          },
        ],
      },
    };
    
    new Chart(document.getElementById('bar-chart'), dataBar);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  submitExpense() {
    const formData = this.expensesForm.value;

    this.expensesService.createExpense(formData).subscribe((res: any) => {
      console.log('Expense saved successfully', res);
    })

    this.expensesForm.reset();

    this.isSent = true;
    setTimeout(() => {
      this.isSent = false;
    }, 5000)
  }
}
