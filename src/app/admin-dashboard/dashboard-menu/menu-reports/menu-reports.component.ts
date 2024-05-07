import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../auth.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { BookService } from './../../../book.service';

@Component({
  selector: 'app-menu-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-reports.component.html',
  styleUrl: './menu-reports.component.css'
})
export class MenuReportsComponent implements OnInit {
  report: any = {};

  constructor(private authService: AuthService,private location: Location,private bookService: BookService) { }

  ngOnInit(): void {
    this.generateReport();
  }

  async generateReport() {
    try {
      this.report = await this.authService.generateReport();
      const mostCheckedOutBooks = await this.bookService.calculateMostCheckedOutBooks();
      this.report.mostCheckedOutBooks = mostCheckedOutBooks;
    } catch (error) {
      console.error('Error generating report:', error);
    }
  }
  


  goBack(): void {
    this.location.back();
  }
}