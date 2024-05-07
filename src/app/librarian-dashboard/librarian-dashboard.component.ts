import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { RouterOutlet } from '@angular/router';
import { LibrarianProfileComponent } from './librarian-profile/librarian-profile.component';
import { BookRegistrationComponent } from './book-registration/book-registration.component';
import { BookManagementComponent } from './book-managment/book-managment.component';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-librarian-dashboard',
  standalone: true,
  imports: [DashboardHeaderComponent,RouterOutlet,LibrarianProfileComponent,BookRegistrationComponent,BookManagementComponent,FormsModule
   ],
  templateUrl: './librarian-dashboard.component.html',
  styleUrl: './librarian-dashboard.component.css'
})
export class LibrarianDashboardComponent {

}
