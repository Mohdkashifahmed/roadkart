import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShopService } from '../shop.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html'
})
export class CartComponent {
  constructor(public shop: ShopService) {}
}
