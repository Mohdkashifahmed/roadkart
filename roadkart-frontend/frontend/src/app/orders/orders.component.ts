import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShopService } from '../shop.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-orders',
  imports: [RouterLink],
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(public shop: ShopService) {}

  ngOnInit() {
    if (this.shop.user) {
      this.shop.getMyOrders(this.shop.user.email).subscribe((data) => {
        this.orders = data;
      });
    }
  }
}
