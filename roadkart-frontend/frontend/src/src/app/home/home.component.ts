import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  products: any[] = [];

  constructor(public shop: ShopService) {}

  ngOnInit() {
    this.shop.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
