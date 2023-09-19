import { Component, inject } from '@angular/core';
import { CommonModule} from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'expenses-fe';
  authService = inject(AuthService);
  router = inject(Router);
 

  onLogout() {
    this.authService.onLogout();
    this.router.navigate(['/login'])
  }
}
