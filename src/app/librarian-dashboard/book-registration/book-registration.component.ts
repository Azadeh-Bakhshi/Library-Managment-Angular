import { Component } from '@angular/core';
import { BookService } from '../../book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-book-registration',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './book-registration.component.html',
  styleUrl: './book-registration.component.css'
})
export class BookRegistrationComponent {
  name: string = '';
  title: string = '';
  entity: number = 0;
  registrationError: string | null = null;
  registrationSuccess: string | null = null;
  
  constructor(private bookService: BookService,private location: Location) { }

  async registerBook() {
    try {
      await this.bookService.registerBook(this.name, this.title, this.entity);
      this.registrationSuccess = 'Book registered successfully!';
      this.name = '';
      this.title = '';
      this.entity = 0;
      this.registrationError = null;
    } catch (error: any) {
      this.registrationError = error.message || 'An error occurred during registration';
    }
  }

  goBack(): void {
    this.location.back();
  }
}