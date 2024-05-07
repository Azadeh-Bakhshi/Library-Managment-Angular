
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Location } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
  errorMessage: string = '';
  invalidLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router,private location: Location) {}

  ngOnInit(): void {
    // Redirect to the previous page if user is already authenticated
    if (this.authService.isloggedIn) {
      this.location.forward();
    }
  }

  async onSubmit(form: any): Promise<void> {
    console.log('Login form data', form.value);

    try {
      const result = await this.authService.login(form.value.email, form.value.password, form.value.role);

      if (result && result.role) {
       
        switch (result.role) {
          case 'admin':
            this.router.navigate(['/admin-dashboard']);
            break;
          case 'librarian':
            this.router.navigate(['/librarian-dashboard']);
            break;
          case 'member':
            this.router.navigate(['/member-dashboard']);
            break;
          default:
            
            console.error('Unexpected role:', result.role);
            break;
        }
      } else {
        console.error('Role not provided in login result');
      }
    } catch (error) {
      console.error('Login failed', error);
      this.errorMessage = `Login failed. ${error}`; 
    }
  }


  goBack(): void {
    this.location.back();
  }

}