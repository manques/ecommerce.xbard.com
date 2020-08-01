import { Injectable } from '@angular/core';
import { UserService } from '../../user.service';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../config/config';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  cartItemsAndSellerPickupLocations;
  changeItemsAndLocations = new Subject();
  constructor(private http: HttpClient) {}
  // get cart products & seller pickup locations
  getCartItemsAndSellerPicupLocations() {
    this.http.get(`${config.apiUrl}/address/cartItemsAndSellerPickupLocations`).subscribe({
      next: (result: any) => {
        console.log(result);
        this.cartItemsAndSellerPickupLocations = result;
        this.changeItemsAndLocations.next(this.cartItemsAndSellerPickupLocations);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }
}
