import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LibrarianDashboardComponent } from './librarian-dashboard/librarian-dashboard.component';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { MenuProfileComponent } from './admin-dashboard/dashboard-menu/menu-profile/menu-profile.component'; // Assuming you have a ProfileComponent
import { MenuManageUsersComponent } from './admin-dashboard/dashboard-menu/menu-manage-users/menu-manage-users.component'; // Assuming you have a ManageUsersComponent
import { MenuReportsComponent } from './admin-dashboard/dashboard-menu/menu-reports/menu-reports.component'; // Assuming you have a ReportsComponent
import { DashboardMenuComponent } from './admin-dashboard/dashboard-menu/dashboard-menu.component'; 
import { LibrarianProfileComponent } from './librarian-dashboard/librarian-profile/librarian-profile.component';
import { BookRegistrationComponent } from './librarian-dashboard/book-registration/book-registration.component';
import { BookManagementComponent } from './librarian-dashboard/book-managment/book-managment.component';
import { MemberProfileComponent } from './member-dashboard/member-profile/member-profile.component';
import { ReturnBookComponent } from './member-dashboard/return-book/return-book.component';
import { CheckOutBookComponent } from './member-dashboard/check-out-book/check-out-book.component';
import { MemberActivitiesComponent } from './member-dashboard/member-activities/member-activities.component';
import { AuthGuard } from './auth.guard';





export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'home', component: HomeComponent },


    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard-menu', component: DashboardMenuComponent, canActivate: [AuthGuard]},

    { path: 'menu-profile', component: MenuProfileComponent, canActivate: [AuthGuard] },
    { path: 'menu-reports', component: MenuReportsComponent, canActivate: [AuthGuard] },
    { path: 'menu-manage-users', component: MenuManageUsersComponent, canActivate: [AuthGuard] },


    
    // { path: 'dashboard-menu', 
    //     component: DashboardMenuComponent, 
    //     canActivate: [authGuard] ,
        
    //     children: [
    //         { path: 'menu-profile', component: MenuProfileComponent },
    //         { path: 'menu-manage-users', component: MenuManageUsersComponent },
    //         { path: 'menu-reports', component: MenuReportsComponent },
    //         { path: '', redirectTo: 'menu-profile', pathMatch: 'full' } // Default child route
    //       ]
    // }, 








    {path: 'librarian-dashboard', component: LibrarianDashboardComponent, canActivate: [AuthGuard]}, 
    {path: 'librarian-profile', component: LibrarianProfileComponent, canActivate: [AuthGuard] },
    {path: 'book-registration', component: BookRegistrationComponent, canActivate: [AuthGuard] },
    {path: 'book-managment', component: BookManagementComponent, canActivate: [AuthGuard] },

        //canActivate: [authGuard] ,
        // children : [
        //     { path: '', component: DashboardHomeComponent, pathMatch: 'full' },
        //     { path: 'settings', component: DashboardSettingComponent }

        // ]
    


    { path: 'member-dashboard', component: MemberDashboardComponent, canActivate: [AuthGuard]},
        //canActivate: [authGuard] ,
     
        // children : [
        //     { path: '', component: DashboardHomeComponent, pathMatch: 'full' },
        //     { path: 'settings', component: DashboardSettingComponent }

        // ]

        
   
    {path: 'member-profile', component: MemberProfileComponent, canActivate: [AuthGuard]}, 
    {path: 'return-book', component: ReturnBookComponent, canActivate: [AuthGuard] },
    {path: 'check-out-book', component: CheckOutBookComponent, canActivate: [AuthGuard] },
    {path: 'member-activities', component: MemberActivitiesComponent, canActivate: [AuthGuard] },


    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
