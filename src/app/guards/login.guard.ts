import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if the username is present in localStorage
    const username = localStorage.getItem('username');

    if (!username) {
      // If there's no username in localStorage, redirect to the login component
      this.router.navigate(['/login']);
      return false; // Prevent access to the protected route
    }

    return true; // Allow access to the protected route
  }
}