import { Component, OnInit } from '@angular/core';
import { BookService } from '../../book.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-managment',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './book-managment.component.html',
  styleUrl: './book-managment.component.css'
})
export class BookManagementComponent implements OnInit {
  books: any[] = []; 
  newName: string = '';
  newTitle: string = '';
  newEntity: number = 0;
  messageSuccess: string | null = null;

  constructor(private bookService: BookService,private location: Location) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  async loadBooks() {
    try {
      const booksData = await this.bookService.getAllBooks();
      this.books = Array.isArray(booksData) ? booksData : [];
    } catch (error) {
      console.error('Error loading books:', error);
    }
  }

  async addBook() {
    try {
      await this.bookService.registerBook(this.newName, this.newTitle, this.newEntity);
      this.loadBooks();
      
      this.newName = '';
      this.newTitle = '';
      this.newEntity = 0;
    } catch (error) {
      console.error('Error adding book:', error);
    }
  }

  async deleteBook(id: string) {
    try {
      await this.bookService.deleteBook(id);
      this.loadBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  }

  async updateBook(id: string, updatedBook: any) {
    try {
      await this.bookService.updateBook(id, updatedBook);
      this.messageSuccess = 'Book updated successfully!';
      this.loadBooks();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  }
  goBack(): void {
    this.location.back();
  }

}