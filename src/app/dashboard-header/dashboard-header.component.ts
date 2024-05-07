import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css'
})


export class DashboardHeaderComponent implements OnInit {
  role: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    
    this.role = this.authService.getUserRole();
  }

  logout(): void {
    
    this.authService.logout();
    
    this.router.navigate(['/home']);
  }
}