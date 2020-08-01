import { Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../config/config';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class WishlistService {
  wishlist: any;
  changeWishlist = new Subject<any>();

  constructor(private http: HttpClient) {}
  //  get wishlist
  fetchWishlist() {
    return this.http
    .get(`${config.apiUrl}/wishlist/list`)
    .subscribe({
      next: (result: any) => {
        console.log(result);
        this.wishlist = result.data.wishlist.products;
        this.changeWishlist.next(this.wishlist);
        console.log(this.wishlist);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }
  // get wishlist
  getWishlist() {
    return this.wishlist;
  }
}
