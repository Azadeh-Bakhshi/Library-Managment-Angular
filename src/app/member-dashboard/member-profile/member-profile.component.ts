import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-profile',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './member-profile.component.html',
  styleUrl: './member-profile.component.css'
})
export class MemberProfileComponent implements OnInit {
  memberData: any[] = [];
  modalOpen: boolean = false;
  successMessage: string = '';
  errors: any = {};
  updatedFields: any = {};

  constructor(private authService: AuthService, private location: Location) {}

  ngOnInit(): void {
    this.fetchMemberData();
  }

  fetchMemberData() {
    this.authService.getUserData().then(
      (data: any) => { 
        console.log('Member data:', data); 
        this.memberData = [data];
      },
      (error: any) => {
        console.error('Error fetching member data:', error);
      }
    );
  }

  async handleSubmit(member: any) {
    try {
      
      const { firstName, lastName, email, password } = member;
      this.updatedFields = { firstName, lastName, email, password };
      await this.authService.updateUserData(this.updatedFields);
      this.successMessage = 'Member data updated successfully';
      this.modalOpen = true;
    } catch (error) {
      console.error('Error updating member data:', error);
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
