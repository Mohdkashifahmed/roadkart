import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../shop.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(public shop: ShopService, private router: Router) {}

  login() {
    if (this.email === '' || this.password === '') {
      alert('Please enter your email and password.');
      return;
    }

    this.shop.login(this.email, this.password).subscribe({
      next: (user) => {
        this.shop.user = user;
        alert('Login successful!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err.status === 401) {
          alert('Wrong email or password.');
        } else {
          alert('Server problem. Check that the back end and MongoDB are running.');
        }
      }
    });
  }
}
