import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../shop.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  text = '';
  category = 'all';
  products: any[] = [];
  results: any[] = [];
  searched = false;

  constructor(public shop: ShopService) {}

  ngOnInit() {
    this.shop.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  search() {
    this.results = [];
    const text = this.text.toLowerCase();

    for (let i = 0; i < this.products.length; i++) {
      const p = this.products[i];
      const textMatch = p.name.toLowerCase().includes(text) || p.seller.toLowerCase().includes(text);
      const categoryMatch = this.category === 'all' || p.category === this.category;

      if (textMatch && categoryMatch) {
        this.results.push(p);
      }
    }

    this.searched = true;
  }
}
