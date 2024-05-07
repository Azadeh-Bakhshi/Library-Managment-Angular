import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CheckoutRecord {
  name: string;
  checkoutTime: number;
}

interface ReturnRecord {
  name: string;
  returnTime: number;
}

@Component({
  selector: 'app-member-activities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './member-activities.component.html',
  styleUrls: ['./member-activities.component.css']
})
export class MemberActivitiesComponent implements OnInit {
  checkoutHistory: CheckoutRecord[] = [];
  returnHistory: ReturnRecord[] = [];
  errorMessage: string = '';

  constructor() { }

  ngOnInit(): void {
    this.loadCheckoutHistory();
    this.loadReturnHistory();
  }

  loadCheckoutHistory(): void {
    const checkoutHistoryStr = localStorage.getItem('checkoutHistory');
    if (checkoutHistoryStr) {
      this.checkoutHistory = JSON.parse(checkoutHistoryStr);
    }
  }

  loadReturnHistory(): void {
    const returnHistoryStr = localStorage.getItem('returnHistory');
    if (returnHistoryStr) {
      this.returnHistory = JSON.parse(returnHistoryStr);
    }
  }

  goBack(): void {
    window.history.back();
  }
}
