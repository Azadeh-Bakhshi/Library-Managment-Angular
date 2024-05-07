import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [DashboardHeaderComponent,RouterOutlet,DashboardMenuComponent ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
