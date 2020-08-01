import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/shop/product/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  items;
  message;
  itemsTotalPrice;
  deliveryPrice;
  constructor(private ps: ProductService) {}
  ngOnInit() {
    this.deliveryPrice = 50;
    this.itemsTotalPrice = 0;
    // get cart
    this.items = this.ps.getCartItems();
    // suscribe cart items
    this.ps.cartListChange.subscribe( (result: any) => {
      this.items = [];
      this.items = result;
      this.changePrice();
      if (this.items.length === 0) {
        this.message = 'empty cart';
      }
    });
    if (this.items) {
      this.changePrice();
    }
  }
  // ngOnChanges
  // delete cart item
  removeCartItem(productId) {
    this.ps.removeToCart(productId);
    this.items = this.items.filter( item => productId !== item.product._id);
    this.changePrice();
  }
  // change quantity
  changeQuantity(item) {
    this.ps.changeQuantity(item);
    this.changePrice();
  }

  // items total price
  changePrice() {
    if (this.items?.length > 0) {
      this.itemsTotalPrice = 0;
      this.items.forEach(element => {
        this.itemsTotalPrice += ( element.quantity * element.product.price);
      });
    } else {
      this.itemsTotalPrice = 0;
    }
  }
}
