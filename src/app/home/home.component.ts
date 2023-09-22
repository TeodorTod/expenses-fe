import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Datepicker,
  Input,
  initTE,
  Dropdown,
  Ripple,
  Chart
} from "tw-elements";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isDropdownOpen = false;

  ngOnInit(): void {
    initTE({ Datepicker, Input, Dropdown, Ripple, Chart });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
