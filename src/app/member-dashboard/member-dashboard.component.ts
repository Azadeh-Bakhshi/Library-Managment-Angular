import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { ReturnBookComponent } from './return-book/return-book.component';
import { CheckOutBookComponent } from './check-out-book/check-out-book.component';
import { MemberActivitiesComponent } from './member-activities/member-activities.component';

@Component({
  selector: 'app-member-dashboard',
  standalone: true,
  imports: [DashboardHeaderComponent,MemberProfileComponent,ReturnBookComponent,CheckOutBookComponent,MemberActivitiesComponent],
  
  templateUrl: './member-dashboard.component.html',
  styleUrl: './member-dashboard.component.css'
})
export class MemberDashboardComponent {
  constructor() {}
}
