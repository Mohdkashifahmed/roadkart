import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../shop.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(public shop: ShopService, private router: Router) {}

  register() {
    if (this.name === '' || this.email === '' || this.password === '') {
      alert('Please fill all the fields.');
      return;
    }

    if (this.password.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    const user = { name: this.name, email: this.email, password: this.password };

    this.shop.register(user).subscribe({
      next: () => {
        alert('Registered successfully! Please login.');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Could not register. This email may already be used.');
      }
    });
  }
}
