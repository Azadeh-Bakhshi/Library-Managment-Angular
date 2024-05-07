import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-menu-profile',
  standalone: true,
  imports: [
    FormsModule,CommonModule],
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.css']
})
export class MenuProfileComponent implements OnInit {
  adminData: any[] = [];
  modalOpen: boolean = false;
  successMessage: string = '';
  errors: any = {};
  updatedFields: any = {};

  constructor(private authService: AuthService, private location: Location) {}

  ngOnInit(): void {
    this.fetchAdminData();
  }

  fetchAdminData() {
    this.authService.getUserData().then(
      (data: any) => { 
        console.log('Admin data:', data); 
        this.adminData = [data];
      },
      (error: any) => {
        console.error('Error fetching admin data:', error);
      }
    );
  }
  

  async handleSubmit(updatedFields: any) {
    try {
      await this.authService.updateUserData(updatedFields);
      this.successMessage = 'Admin data updated successfully';
      this.modalOpen = true;
    } catch (error) {
      console.error('Error updating admin data:', error);
    }
  }

  handleCloseModal() {
    this.modalOpen = false;
    this.successMessage = '';
  }
 
  goBack(): void {
    this.location.back();
  }
}

