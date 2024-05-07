import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  role = '';
  active = true; 
  successMessage: string = ''; 

  constructor(private authService: AuthService, private router: Router,private location: Location) {}

   register() {
    if (this.firstName && this.lastName && this.email && this.password && this.role) {
      this.authService.register(this.firstName, this.lastName, this.email, this.password, this.role, this.active).then(() => {
       
        this.successMessage = 'Registration successful';
        setTimeout(() => {
          this.navigateToHome(); 
        }, 3000); 
      }).catch((error) => {
        console.error('Error registering user:', error);
        this.successMessage = 'Registration failed. Please try again.';
      });
    } else {
      console.log('Please fill in all fields.');
    }
  }
  goBack(): void {
    this.location.back();
  }


  


  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

}
