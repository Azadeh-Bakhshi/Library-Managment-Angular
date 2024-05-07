import { Component } from '@angular/core';
import { MenuProfileComponent } from './menu-profile/menu-profile.component'; 
import { MenuManageUsersComponent } from './menu-manage-users/menu-manage-users.component'; 
import { MenuReportsComponent } from './menu-reports/menu-reports.component'; 
@Component({
  selector: 'app-dashboard-menu',
  standalone: true,
  imports: [MenuProfileComponent,MenuManageUsersComponent,MenuReportsComponent],
  templateUrl: './dashboard-menu.component.html',
  styleUrl: './dashboard-menu.component.css'
})
export class DashboardMenuComponent {
  constructor() {}
}