import { Component, OnInit} from '@angular/core';
import { WishlistService } from '../../../shared/services/shop/product/wishlist.service';
import { ProductService } from '../../../shared/services/shop/product/product.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})

export class WishlistComponent implements OnInit {
  items;
  constructor(private wish: WishlistService,
              private ps: ProductService) {}
  ngOnInit() {
    this.wish.fetchWishlist();
    // get items wishlist
    this.wish.changeWishlist.subscribe(result => {
      console.log(result);
      this.items = result;
    });
  }

  // add to cart
  addToCart(product, quantity) {
    this.ps.addToCart(product, quantity);
  }

  // remove wishlist item
  removeWishlistItem(id) {
    this.items = this.items.filter( element => element.product._id !== id );
    return this.ps.removeWishlist(id);
  }
}
