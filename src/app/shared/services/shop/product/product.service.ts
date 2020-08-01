import { Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../config/config';
import { Subject } from 'rxjs';
import { UserService } from '../../user.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  cartItems;
  cartListChange = new Subject<any>();
  cartUpdateDeleteChange = new Subject<any>();
  constructor(private http: HttpClient, private userService: UserService) {
    this.cartItems = [];
    this.userService.userChange.subscribe(result => {
      this.cartItems = [];
      if (result) {
        result.cart.products.forEach(element => {
          this.cartItems.push({
            product: element.product,
            quantity: element.quantity
          });
        });
      }
      //
      this.cartListChange.next(this.cartItems);
    });
  }

  // ---------------    add product to server --------------------
  addProduct(product) {
    return this.http.post(`${config.apiUrl}/product/add-product`, product);
  }

  findPath(id, categories) {
    let path = '';
    const lists = this.recursive(id, categories, []);
    for (const list of lists) {
      path += `/${list}`;
    }
    return path;
  }

  recursive(id, categories, path) {
    const category = this.findCategory(id, categories);
    path.push(category.name.trim());
    if (category.parent !== null) {
      return this.recursive(category.parent, categories, path);
    } else {
      return path.reverse();
    }
  }
  findCategory(id, categories) {
    for (const category of categories) {
      if (category._id === id) {
        return category;
      }
    }
  }
// ----------------  get seller products  from Server --------------------------------
getProducts(options) {
  return this.http
         .get(`${config.apiUrl}/product/products`
         + `?category=${options.category}`
         + `&sort=${options.sort}`
         + `&page=${options.page}`
         + `&pageSize=${+options.pageSize}`);
}

getSellerProducts(options) {
  return this.http
         .get(`${config.apiUrl}/product/seller/product-list`
         + `?category=${options.category}`
         + `&sort=${options.sort}`
         + `&page=${options.page}`
         + `&pageSize=${+options.pageSize}`);
}

// ------------------- get product from server --------------------
getProduct(id) {
  return this.http.get(`${config.apiUrl}/product/product/${id}`);
}
  //  get related products
  getRelatedProducts(id, categoryId, limit, skip) {
    return this.http.get(`${config.apiUrl}/product/relatedProducts/?_id=${id}&categoryId=${categoryId}&limit=${limit}&skip=${skip}`);
  }
  // ---------------------- wishlist ---------------------------------
    // add wishlist
  addWishlist(id) {
    this.http.get(`${config.apiUrl}/wishlist/add-wishlist/${id}`)
             .subscribe({
               next: (result: any) => {
                 console.log(result);
               },
               error: (err: any) => {
                console.log(err);
               },
               complete: () => {
                 console.log('add wishlist sucesss');
               }
             });
  }
  // remove wishlist
  removeWishlist(id) {
    this.http.get(`${config.apiUrl}/wishlist/remove-wishlist/${id}`)
             .subscribe({
               next: (result: any) => {
                 console.log(result);
               },
               error: (err: any) => {
                console.log(err);
               },
               complete: () => {
                 console.log('add wishlist sucesss');
               }
             });
  }

  // add to cart
  addToCart(product, quantity) {
    console.log(product);
    this.cartItemUpdate(product, quantity);
    this.http.post(`${config.apiUrl}/cart/add-item`, {
       productId: product._id,
       quantity
    }).subscribe({
      next: (result: any) => {
      },
      error: (err: any ) => {
      },
      complete: () => {
      }
    });
  }

  //
  cartItemUpdate(product, quantity) {
    const isCartItem = this.cartItems.some(element => {
      return element.product._id === product._id;
    });
    if (isCartItem) {
      this.cartItems.forEach((ele, i) => {
        if (this.cartItems[i].product._id === product._id) {
          this.cartItems[i].quantity += quantity;
        }
      });
      //
      this.cartListChange.next(this.cartItems);
    } else {
      this.cartItems.push({
        product,
        quantity
      });
      this.cartListChange.next(this.cartItems);
    }
  }
  // remove to cart
  removeToCart(productId) {
     // delete cart items
    this.cartItems = this.cartItems.filter(item => item.product._id === productId);
    this.cartUpdateDeleteChange.next(this.cartItems);
    this.http
        .get(`${config.apiUrl}/cart/remove-item/${productId}`)
        .subscribe({
          next: (result: any) => {
          },
          error: (err: any) => {
          },
          complete: () => {
            this.userService.fetchUser();
          }
        });
  }
  // get cart items
  getCartItems() {
    return this.cartItems;
  }
 // change
  changeQuantity(item) {
    this.http.post(
      `${config.apiUrl}/cart/change-quantity`,
      {
        productId: item.product._id,
        quantity: item.quantity
      }
    ).subscribe({
      next: (result: any) => {
      },
      error: (err: any) => {
      },
      complete: () => {
      }
    });
  }

}
