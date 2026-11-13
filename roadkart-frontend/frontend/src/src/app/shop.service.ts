import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ShopService {
  url = 'http://localhost:3000';   // address of our Express server
  cart: any[] = [];                // items in the cart
  user: any = null;                // logged in user (null = nobody logged in)

  constructor(private http: HttpClient) {}

  // ---------- Product Catalog ----------
  getProducts() {
    return this.http.get<any[]>(this.url + '/products');
  }

  // ---------- Cart ----------
  addToCart(product: any) {
    this.cart.push({ name: product.name, seller: product.seller, price: product.price });
    alert(product.name + ' added to cart!');
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  getTotal() {
    let total = 0;
    for (let i = 0; i < this.cart.length; i++) {
      total = total + this.cart[i].price;
    }
    return total;
  }

  // ---------- User Login ----------
  register(user: any) {
    return this.http.post(this.url + '/register', user);
  }

  login(email: string, password: string) {
    return this.http.post<any>(this.url + '/login', { email: email, password: password });
  }

  logout() {
    this.user = null;
  }

  // ---------- Checkout and Orders ----------
  placeOrder(order: any) {
    return this.http.post(this.url + '/orders', order);
  }

  getMyOrders(email: string) {
    return this.http.get<any[]>(this.url + '/orders', { params: { email: email } });
  }

  getItemNames(order: any) {
    let names = '';
    for (let i = 0; i < order.items.length; i++) {
      names = names + order.items[i].name;
      if (i < order.items.length - 1) {
        names = names + ', ';
      }
    }
    return names;
  }

  // ---------- Admin ----------
  addProduct(product: any) {
    return this.http.post(this.url + '/products', product);
  }

  deleteProduct(id: string) {
    return this.http.post(this.url + '/products/delete', { id: id });
  }

  getAllOrders() {
    return this.http.get<any[]>(this.url + '/orders/all');
  }
}
