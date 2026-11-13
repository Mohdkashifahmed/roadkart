import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../shop.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-admin',
  imports: [FormsModule, RouterLink],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  products: any[] = [];
  orders: any[] = [];

  name = '';
  seller = '';
  price: any = '';
  category = 'snacks';

  constructor(public shop: ShopService) {}

  ngOnInit() {
    if (this.shop.user && this.shop.user.isAdmin) {
      this.loadData();
    }
  }

  loadData() {
    this.shop.getProducts().subscribe((data) => {
      this.products = data;
    });
    this.shop.getAllOrders().subscribe((data) => {
      this.orders = data;
    });
  }

  addProduct() {
    if (this.name === '' || this.seller === '' || this.price === '' || this.price === null) {
      alert('Please fill all the fields.');
      return;
    }

    const product = {
      name: this.name,
      seller: this.seller,
      price: this.price,
      category: this.category
    };

    this.shop.addProduct(product).subscribe(() => {
      alert('Product added!');
      this.name = '';
      this.seller = '';
      this.price = '';
      this.loadData();
    });
  }

  deleteProduct(id: string) {
    this.shop.deleteProduct(id).subscribe(() => {
      this.loadData();
    });
  }
}
