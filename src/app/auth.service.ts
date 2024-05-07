import { Injectable } from '@angular/core';

interface UserReport {
  numberOfMembers: number;
  numberOfLibrarians: number;
  numberOfAdmins: number;
  numberOfActiveMembers: number;
  numberOfActiveLibrarians: number;
  numberOfActiveAdmins: number;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/users';
  private registerUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/users'; 
  private updateOne = 'https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/users'; 
  
  private get sessionKey(): string {
    return localStorage.getItem('sessionKey') || '';
  }


  constructor() { }

  isloggedIn = false; 

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  async login(email: string, password: string, role: string): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTg4NzJkYzkyMDIwNzZjZGJmZiIsInVzZXJuYW1lIjoiMDAyNzQ4NjAwIiwiaWF0IjoxNzEyOTc5OTMzLCJleHAiOjE3MTUxMzk5MzN9.0-JLh0-J35WJ-7Z6bD2Rw0GFUsn67d8X8mnWSwRF_Xg");
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders
    };
  
    try {
      const response = await fetch(this.apiUrl, requestOptions);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      const user = result['data'].find((userdata: any) => {
        if (userdata.email === email && userdata.password === password && userdata.role === role) {
          return userdata;
        }
      });
  
      if (user) {
        this.isloggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('sessionKey', user._id); 
        return user;
      } else {
        throw new Error(`User not found`);
      }
    } catch (error) {
      throw error;
    }
  }
  

  async register(firstName: string, lastName: string, email: string, password: string, role: string, active: boolean): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTg4NzJkYzkyMDIwNzZjZGJmZiIsInVzZXJuYW1lIjoiMDAyNzQ4NjAwIiwiaWF0IjoxNzEyOTc5OTMzLCJleHAiOjE3MTUxMzk5MzN9.0-JLh0-J35WJ-7Z6bD2Rw0GFUsn67d8X8mnWSwRF_Xg");
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: role, 
        active: active 
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

  logout() {
    this.isloggedIn = false;
    localStorage.removeItem('isLoggedIn');
  }

  getUserRole(): string {
   
    const role = localStorage.getItem('userRole');
    return role ? role : ''; 
  }


  async getUserData(): Promise<{ firstName: string, lastName: string, email: string, password: string }> {
    try {
      const sessionKey = localStorage.getItem('sessionKey');
      if (!sessionKey) {
        throw new Error('Session key not found in local storage');
      }
  
      // Retrieve the user ID from the session key
      const userId = this.getUserId();
      if (!userId) {
        throw new Error('User ID not found');
      }
  
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTg4NzJkYzkyMDIwNzZjZGJmZiIsInVzZXJuYW1lIjoiMDAyNzQ4NjAwIiwiaWF0IjoxNzEyOTc5OTMzLCJleHAiOjE3MTUxMzk5MzN9.0-JLh0-J35WJ-7Z6bD2Rw0GFUsn67d8X8mnWSwRF_Xg');
  
      const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/findOne/users/${userId}`, {
        method: 'GET',
        headers: myHeaders
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch admin data');
      }
  
      const responseData = await response.json();
      const adminData = responseData.data; 
  
  
      // Ensure that data is an object
      if (typeof adminData !== 'object' || Array.isArray(adminData)) {
        throw new Error('Admin data not found or invalid format');
      }
  
      // Extract firstName, lastName, email, and password from the admin object
      const { firstName, lastName, email, password } = adminData;
  
      return { firstName, lastName, email, password };
    } catch (error) {
      throw error;
    }
  }
  
  
  getUserId(): string | null {
   
    return localStorage.getItem('sessionKey');
  }
  
  async updateUserData(updatedFields: any): Promise<void> {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTg4NzJkYzkyMDIwNzZjZGJmZiIsInVzZXJuYW1lIjoiMDAyNzQ4NjAwIiwiaWF0IjoxNzEyOTc5OTMzLCJleHAiOjE3MTUxMzk5MzN9.0-JLh0-J35WJ-7Z6bD2Rw0GFUsn67d8X8mnWSwRF_Xg');
  
      const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/users/${this.sessionKey}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(updatedFields) // Ensure updatedFields is properly formatted JSON
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  }
  

  async getUsers(): Promise<any[]> {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTg4NzJkYzkyMDIwNzZjZGJmZiIsInVzZXJuYW1lIjoiMDAyNzQ4NjAwIiwiaWF0IjoxNzEyOTc5OTMzLCJleHAiOjE3MTUxMzk5MzN9.0-JLh0-J35WJ-7Z6bD2Rw0GFUsn67d8X8mnWSwRF_Xg");
  
      const response = await fetch(this.apiUrl, {
        headers: myHeaders
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
      const users = responseData.data;
  
      if (!Array.isArray(users)) {
        throw new Error('Users data is not in valid format');
      }
      return users;
    } catch (error) {
      throw new Error(`Error fetching users: ${(error as Error).message}`);
    }
  }

  async updateUser(userId: string, updatedFields: any): Promise<void> {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTg4NzJkYzkyMDIwNzZjZGJmZiIsInVzZXJuYW1lIjoiMDAyNzQ4NjAwIiwiaWF0IjoxNzEyOTc5OTMzLCJleHAiOjE3MTUxMzk5MzN9.0-JLh0-J35WJ-7Z6bD2Rw0GFUsn67d8X8mnWSwRF_Xg");
     
  
      const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/users/${userId}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(updatedFields)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  }
  
  

  async deleteUser(id: string): Promise<void> {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTg4NzJkYzkyMDIwNzZjZGJmZiIsInVzZXJuYW1lIjoiMDAyNzQ4NjAwIiwiaWF0IjoxNzEyOTc5OTMzLCJleHAiOjE3MTUxMzk5MzN9.0-JLh0-J35WJ-7Z6bD2Rw0GFUsn67d8X8mnWSwRF_Xg");
  
      const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/deleteOne/users/${id}`, {
        method: 'DELETE',
        headers: myHeaders
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      throw error;
    }
  }

  async activateUser(id: string): Promise<void> {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTg4NzJkYzkyMDIwNzZjZGJmZiIsInVzZXJuYW1lIjoiMDAyNzQ4NjAwIiwiaWF0IjoxNzEyOTc5OTMzLCJleHAiOjE3MTUxMzk5MzN9.0-JLh0-J35WJ-7Z6bD2Rw0GFUsn67d8X8mnWSwRF_Xg');
  
      const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/users/${id}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({ active: true })
      });
  
      if (!response.ok) {
        throw new Error('Failed to activate user');
      }
    } catch (error) {
      throw error;
    }
  }
  
  async deactivateUser(id: string): Promise<void> {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTg4NzJkYzkyMDIwNzZjZGJmZiIsInVzZXJuYW1lIjoiMDAyNzQ4NjAwIiwiaWF0IjoxNzEyOTc5OTMzLCJleHAiOjE3MTUxMzk5MzN9.0-JLh0-J35WJ-7Z6bD2Rw0GFUsn67d8X8mnWSwRF_Xg');
  
      const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/users/${id}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({ active: false })
      });
  
      if (!response.ok) {
        throw new Error('Failed to deactivate user');
      }
    } catch (error) {
      throw error;
    }
  }



  async generateReport(): Promise<UserReport> {
    try {
      const users = await this.getUsers(); 
      
      // Initialize counters
      let numberOfMembers = 0;
      let numberOfLibrarians = 0;
      let numberOfAdmins = 0;
      let numberOfActiveMembers = 0;
      let numberOfActiveLibrarians = 0;
      let numberOfActiveAdmins = 0;
  
      // Iterate through the users and count based on role and active status
      users.forEach(user => {
        switch (user.role) {
          case 'member':
            numberOfMembers++;
            if (user.active) {
              numberOfActiveMembers++;
            }
            break;
          case 'librarian':
            numberOfLibrarians++;
            if (user.active) {
              numberOfActiveLibrarians++;
            }
            break;
          case 'admin':
            numberOfAdmins++;
            if (user.active) {
              numberOfActiveAdmins++;
            }
            break;
          default:
           
            break;
        }
      });
  
      // Construct the report object
      const report: UserReport = {
        numberOfMembers,
        numberOfLibrarians,
        numberOfAdmins,
        numberOfActiveMembers,
        numberOfActiveLibrarians,
        numberOfActiveAdmins,
      };
  
      return report;
    } catch (error) {
      throw error;
    }
  }
  

}  