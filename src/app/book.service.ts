import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

const authorizationToken = environment.authorization;

export interface Book {
  name: string;
  title: string;
  entity: number;
  checkedOut: number;
  _id: string;
}


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private getUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/books';
  private registerUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/books';
  private deleteUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/deleteOne/books';
  private updateUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/books';
  
  private activityHistory: any[] = [];

  constructor() { }
 


  
  async getAllBooks(): Promise<any[]> { 
    const myHeaders = new Headers();
    myHeaders.append("Authorization", authorizationToken);

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
    };
    
    try {
      const response = await fetch(this.getUrl, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      throw error;
    }
  }

  async registerBook(name: string, title: string, entity: number): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTg4NzJkYzkyMDIwNzZjZGJmZiIsInVzZXJuYW1lIjoiMDAyNzQ4NjAwIiwiaWF0IjoxNzEyOTc5OTMzLCJleHAiOjE3MTUxMzk5MzN9.0-JLh0-J35WJ-7Z6bD2Rw0GFUsn67d8X8mnWSwRF_Xg");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        name: name,
        title: title,
        entity: entity,
        checkedOut: 0

      })
    };

    try {
      const response = await fetch(this.registerUrl, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      return result;
    } catch (error) {
      throw error;
    }
  }



  async deleteBook(id: string): Promise<void> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTg4NzJkYzkyMDIwNzZjZGJmZiIsInVzZXJuYW1lIjoiMDAyNzQ4NjAwIiwiaWF0IjoxNzEyOTc5OTMzLCJleHAiOjE3MTUxMzk5MzN9.0-JLh0-J35WJ-7Z6bD2Rw0GFUsn67d8X8mnWSwRF_Xg");

    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: myHeaders
    };

    try {
      const response = await fetch(`${this.deleteUrl}/${id}`, requestOptions); // Updated URL for delete
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async updateBook(id: string, updatedBook: any): Promise<void> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTg4NzJkYzkyMDIwNzZjZGJmZiIsInVzZXJuYW1lIjoiMDAyNzQ4NjAwIiwiaWF0IjoxNzEyOTc5OTMzLCJleHAiOjE3MTUxMzk5MzN9.0-JLh0-J35WJ-7Z6bD2Rw0GFUsn67d8X8mnWSwRF_Xg");

    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(updatedBook)
    };

    try {
      const response = await fetch(`${this.updateUrl}/${id}`, requestOptions); 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  }



  async handleCheckOut(id: string, member: string): Promise<string | void> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTg4NzJkYzkyMDIwNzZjZGJmZiIsInVzZXJuYW1lIjoiMDAyNzQ4NjAwIiwiaWF0IjoxNzEyOTc5OTMzLCJleHAiOjE3MTUxMzk5MzN9.0-JLh0-J35WJ-7Z6bD2Rw0GFUsn67d8X8mnWSwRF_Xg");
    
    try {
        const books = await this.getAllBooks(); 
        const bookToUpdate = books.find((book: any) => book._id === id); 

        if (!bookToUpdate) {
            throw new Error(`Book with id ${id} not found`);
        }

        if (bookToUpdate.entity === 0) {
            return `Book '${bookToUpdate.title}' is not available for checkout.`;
        }

        const updatedBook = {
            ...bookToUpdate,
            entity: bookToUpdate.entity - 1, 
            checkedOut: bookToUpdate.checkedOut + 1 
        };

        await this.updateBook(id, updatedBook); 
        
    } catch (error) {
        throw error;
    }
}
  
  

async returnBook(id: string, member: string): Promise<string | void> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTg4NzJkYzkyMDIwNzZjZGJmZiIsInVzZXJuYW1lIjoiMDAyNzQ4NjAwIiwiaWF0IjoxNzEyOTc5OTMzLCJleHAiOjE3MTUxMzk5MzN9.0-JLh0-J35WJ-7Z6bD2Rw0GFUsn67d8X8mnWSwRF_Xg");
  
  try {
      const books = await this.getAllBooks(); 
      const bookToUpdate = books.find((book: any) => book._id === id); 

      if (!bookToUpdate) {
          throw new Error(`Book with id ${id} not found`);
      }

      
      const updatedBook = {
          ...bookToUpdate,
          entity: bookToUpdate.entity + 1, 
          
      };

      await this.updateBook(id, updatedBook);
      
  } catch (error) {
      throw error;
  }
}




async calculateMostCheckedOutBooks(): Promise<Book[]> {
  try {
    const books = await this.getAllBooks();
    if (books.length === 0) {
      return [];
    }

    let maxCheckedOut = 0;
    const mostCheckedOutBooks: Book[] = [];

    for (const book of books) {
      if (book.checkedOut > maxCheckedOut) {
        maxCheckedOut = book.checkedOut;
        mostCheckedOutBooks.length = 0; 
        mostCheckedOutBooks.push(book);
      } else if (book.checkedOut === maxCheckedOut) {
        mostCheckedOutBooks.push(book); 
      }
    }

    return mostCheckedOutBooks;
  } catch (error) {
    throw new Error('Failed to calculate most checked out books');
  }
}



}















