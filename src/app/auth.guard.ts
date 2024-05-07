// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from './auth.service';
// import { BookService } from './book.service';
// export const authGuard: CanActivateFn = (route, state) => {
//   // debugger;

//   const authService = inject(AuthService);
//   const router = inject(Router);
//   const bookService = inject(BookService);

//   if ( localStorage.getItem('isLoggedIn') === 'true'){
//     return true;
//   }else{
//     router.navigate(['/home'])
//     return false;
//   }
// };



import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
