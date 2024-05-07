import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu-manage-users',
  standalone: true,
  imports: [CommonModule,FormsModule,],
  templateUrl: './menu-manage-users.component.html',
  styleUrl: './menu-manage-users.component.css'
})
export class MenuManageUsersComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = {};
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private location: Location) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  async fetchUsers(): Promise<void> {
    try {
      
      const users = await this.authService.getUsers();
  
      
      this.users = users;
    } catch (error) {
      console.error('Error fetching users:', error);
      this.errorMessage = 'Failed to fetch users';
    }
  }

  async updateUser(id: string, updatedFields: any) {
    try {
      await this.authService.updateUser(id, updatedFields);
      this.fetchUsers();
      this.successMessage = 'User updated successfully';
      this.clearMessages();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  }

  

  async deleteUser(id: string) {
    try {
      await this.authService.deleteUser(id);
      this.fetchUsers();
      this.fetchUsers();
      this.successMessage = 'User deleted successfully';
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  }

  async handleActivate(id: string): Promise<void> {
    try {
      await this.authService.activateUser(id);
     
      this.fetchUsers();
      this.successMessage = 'User activated successfully';
      this.clearMessages();
      
      console.log('User activated successfully');
    } catch (error) {
      console.error('Error reactivating user:', error);
    }
  }

  async handleDeactivate(id: string): Promise<void> {
    try {
      await this.authService.deactivateUser(id);
      
      this.fetchUsers();
      this.successMessage = 'User deactivated successfully';
      this.clearMessages();
      
      console.log('User deactivated successfully');
    } catch (error) {
      console.error('Error deactivating user:', error);
    }
    





  }

  clearMessages(): void {
    
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }

  goBack(): void {
    this.location.back();
  }

}
