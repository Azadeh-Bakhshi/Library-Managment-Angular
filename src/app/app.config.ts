import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthService } from './auth.service';
import {BookService } from './book.service'; 
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    AuthService, 
    BookService
  ] 
};
