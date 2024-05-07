import { Component, OnInit } from '@angular/core';
import { BookService } from '../../book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-return-book',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.css'
})
export class ReturnBookComponent implements OnInit {
  books: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

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

  // async handleReturn(id: string): Promise<void> {
  //   try {
  //     const member = 'member_id_here'; 
  //   const errorMessage = await this.bookService.returnBook(id, member);
  //     if (errorMessage) {
  //       this.errorMessage = errorMessage;
  //     } else {
  //       this.fetchBooks();
  //       this.successMessage = 'Return successful';
  //     }
  //   } catch (error) {
  //     console.error('Error returning book:', error);
  //     this.errorMessage = 'Error returning book';
  //   }
  // }


  async handleReturn(id: string): Promise<void> {
    try {
      const member = 'member_id_here'; 
      const errorMessage = await this.bookService.returnBook(id, member);
      if (errorMessage) {
        this.errorMessage = errorMessage;
      } else {
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      
        const returnedBook = this.books.find(book => book._id === id);
        if (returnedBook) {
          const returnDetails = {
            name: returnedBook.name,
            returnTime: new Date(currentTimeInSeconds * 1000).toLocaleString() 
          };
          
  
          let returnHistory: any[] = JSON.parse(localStorage.getItem('returnHistory') || '[]');
   
          returnHistory.push(returnDetails);
  
          localStorage.setItem('returnHistory', JSON.stringify(returnHistory));
        }
        this.fetchBooks();
        this.successMessage = 'Return successful';
      }
    } catch (error) {
      console.error('Error returning book:', error);
      this.errorMessage = 'Error returning book';
    }
  }
  

  
  goBack(): void {
    window.history.back();
  }
}