import { Component, OnInit, OnChanges } from '@angular/core';
import { ProductService } from '../../shared/services/shop/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  category;
  sort;
  page;
  pageSize;
  products: any;
  total;
  message;
  user;
  quantity = 1;
  constructor(private ps: ProductService,
              private route: ActivatedRoute,
              private userService: UserService,
              private auth: AuthService) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.userService.fetchUser();
      this.userService.userChange.subscribe(user => {
        this.user = user;
        if (this.user && this.products) {
          this.selectWishlist();
        }
      });
    }

    this.route.queryParams.subscribe((params: any) => {
      this.category = params.category ? params.category : 'all';
      this.sort = params.sort ? params.sort : 'newest';
      this.page = params.page ? params.page : 0;
      this.pageSize = params.limit ? params.limit : 16;
      this.getProducts({
        category:  this.category,
        sort : this.sort,
        page: this.page,
        pageSize: this.pageSize,
      });
    });
  }

  getProducts(options) {
    this.ps.getProducts(options).subscribe({
      next: (result: any) => {
        this.products = result.data.products;
        this.total = result.data.total;
        this.message = result.message;
        if (this.user && this.products) {
          this.selectWishlist();
        }
      },
      error: (err: any) => {
      },
      complete: () => {
      }
    });
  }
  //  wishlist
  changeWishlist(selectedProduct) {
    if (!selectedProduct.wishlist) {
      this.ps.addWishlist(selectedProduct._id);
      this.updateCurrentUI(selectedProduct._id, true);
    } else {
      this.ps.removeWishlist(selectedProduct._id);
      this.updateCurrentUI(selectedProduct._id, false);
    }
  }

  // selected wishlist view
  selectWishlist() {
    if (this.user.wishlist && this.products) {
      for (let i = 0; i < this.products.length; i++) {
        this.user.wishlist.products.forEach(ele => {
          if (i < this.products.length) {
            if (this.products[i]?._id === ele.product._id) {
              this.products[i].wishlist = true;
              i++;
            } else {
              this.products[i].wishlist = false;
            }
          }
        });
      }
      //
    }
  }
  // update current ui wishlist
  updateCurrentUI(selectedProduct, value) {
    this.products.forEach((element, index) => {
      if (selectedProduct === element._id) {
        this.products[index].wishlist = value;
        return;
      }
    });
  }

  // add to cart
  addToCart(product, quantity) {
    this.ps.addToCart(product, quantity);
  }
}
