import { Component, OnInit } from '@angular/core';
import { BookService } from '../../book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-out-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './check-out-book.component.html',
  styleUrls: ['./check-out-book.component.css']
})
export class CheckOutBookComponent implements OnInit {
  books: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  member: string = ''; // Add member property to store the member information

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.bookService.getAllBooks().then(
      (data: any) => {
        this.books = data;
      },
      (error: any) => {
        console.error('Error fetching books:', error);
        this.errorMessage = 'Failed to fetch books';
      }
    );
  }

  // async handleCheckOut(id: string): Promise<void> {
  //   try {
  //     const errorMessage = await this.bookService.handleCheckOut(id, this.member);
  //     if (errorMessage) {
  //       this.errorMessage = errorMessage;
  //     } else {
  //       this.fetchBooks();
  //       this.successMessage = 'Check out successful';
  //     }
  //   } catch (error) {
  //     console.error('Error checking out book:', error);
  //     this.errorMessage = 'Error checking out book';
  //   }
  // }

  async handleCheckOut(id: string): Promise<void> {
    try {
      const errorMessage = await this.bookService.handleCheckOut(id, this.member);
      if (errorMessage) {
        this.errorMessage = errorMessage;
      } else {
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      
        const checkedOutBook = this.books.find(book => book._id === id);
        if (checkedOutBook) {
          const checkoutDetails = {
            name: checkedOutBook.name,
            checkoutTime: new Date(currentTimeInSeconds * 1000).toLocaleString() // Convert timestamp to readable date
          };
  
          
          let checkoutHistory: any[] = JSON.parse(localStorage.getItem('checkoutHistory') || '[]');
   
          checkoutHistory.push(checkoutDetails);
  
          localStorage.setItem('checkoutHistory', JSON.stringify(checkoutHistory));
        }
        this.fetchBooks();
        this.successMessage = 'Check out successful';
      }
    } catch (error) {
      console.error('Error checking out book:', error);
      this.errorMessage = 'Error checking out book';
    }
  }
  
  

  goBack(): void {
    window.history.back();
  }
}
