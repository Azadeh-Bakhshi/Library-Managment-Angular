import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from './../book.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mostCheckedOutBook: any = null; 
  books: any[] = []; 
  constructor(private router: Router, private bookService: BookService) {} 

  ngOnInit(): void {
    this.fetchMostCheckedOutBooks();
    this.fetchBooks(); 
  }

  async fetchMostCheckedOutBooks() { 
    try {
        this.mostCheckedOutBook = await this.bookService.calculateMostCheckedOutBooks(); 
        console.log(this.mostCheckedOutBook.name); 
    } catch (error) {
        console.error('Error fetching most checked out book:', error);
    }
}

  async fetchBooks() {
    try {
      this.books = await this.bookService.getAllBooks(); 
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

  isHomePage(): boolean {
    return this.router.url === '/home';
  }
}