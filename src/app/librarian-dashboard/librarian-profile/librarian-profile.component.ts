import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-librarian-profile',
  standalone: true,
  imports: [
    FormsModule,CommonModule],
  templateUrl: './librarian-profile.component.html',
  styleUrl: './librarian-profile.component.css'
})
export class LibrarianProfileComponent implements OnInit {
  librarianData: any[] = [];
  modalOpen: boolean = false;
  successMessage: string = '';
  errors: any = {};
  updatedFields: any = {};

  constructor(private authService: AuthService, private location: Location) {}

  ngOnInit(): void {
    this.fetchLibrarianData();
  }

  fetchLibrarianData() {
    this.authService.getUserData().then(
      (data: any) => { 
        console.log('Librarian data:', data); 
        this.librarianData = [data];
      },
      (error: any) => {
        console.error('Error fetching librarian data:', error);
      }
    );
  }

  async handleSubmit(librarian: any) {
    try {
      
      const { firstName, lastName, email, password } = librarian;
      this.updatedFields = { firstName, lastName, email, password };
      await this.authService.updateUserData(this.updatedFields);
      this.successMessage = 'Librarian data updated successfully';
      this.modalOpen = true;
    } catch (error) {
      console.error('Error updating librarian data:', error);
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
