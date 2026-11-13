import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../shop.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-checkout',
  imports: [FormsModule, RouterLink],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  address = '';
  phone = '';

  constructor(public shop: ShopService, private router: Router) {}

  placeOrder() {
    if (this.address === '' || this.phone === '') {
      alert('Please fill the address and phone number.');
      return;
    }

    const order = {
      userEmail: this.shop.user.email,
      address: this.address,
      phone: this.phone,
      items: this.shop.cart,
      total: this.shop.getTotal(),
      date: new Date().toLocaleDateString()
    };

    this.shop.placeOrder(order).subscribe({
      next: () => {
        alert('Order placed successfully!');
        this.shop.cart = [];
        this.router.navigate(['/orders']);
      },
      error: () => {
        alert('Could not place the order. Is the server running?');
      }
    });
  }
}
