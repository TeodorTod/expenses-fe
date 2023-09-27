import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Datepicker,
  Input,
  initTE,
  Dropdown,
  Ripple,
  Chart,
  Toast
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
export class HomeComponent implements OnInit, AfterViewInit {
  expensesForm: FormGroup;
  isSent: boolean = false;
  chartData: number[] = new Array(12).fill(0);
  types: string[] = ['Supermarket', 'Grocery', 'Pharmacy', 'Bills', 'Kid'];


  constructor(
    private fb: FormBuilder,
    private expensesService: ExpensesService
  ) {
    this.expensesForm = this.fb.group({
      sum: ['', Validators.required],
      type: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    

    this.expensesService.getExpenses().subscribe((expenses: any[]) => {
      // Calculate monthly expenses
      expenses.forEach((el: any) => {
        const month = parseInt((el.date).split('/')[1]);
        this.chartData[month - 1] += el.sum;
      });

      // Update the chart with the calculated data
      this.updateChart();
    });
  }

  ngAfterViewInit(): void {
    initTE({ Datepicker, Input, Toast }); 
  }

  updateChart(): void {
    const dataBar = {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Expenses',
            data: this.chartData,
          },
        ],
      },
    };

    const chartElement = document.getElementById('bar-chart');
    if (chartElement) {
      new Chart(chartElement, dataBar);
    }
  }

  submitExpense() {
    const formData = this.expensesForm.value;
  
    this.expensesService.createExpense(formData).subscribe((res: any) => {
      console.log('Expense saved successfully', res);
      
      // Update the chart directly with the new expense data
      const month = new Date(formData.date).getMonth();
      this.chartData[month] += formData.sum;
      this.updateChart();
    });
  
    this.expensesForm.reset();
    this.isSent = true;
  
    setTimeout(() => {
      this.isSent = false;
    }, 5000);
  }
  
}
