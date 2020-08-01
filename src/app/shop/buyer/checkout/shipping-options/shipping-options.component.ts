import { Component, OnInit, Input } from '@angular/core';
import { AddressService } from '../../../../shared/services/shop/product/address.service';
import { UserService } from '../../../../shared/services/user.service';
import { CartService } from '../../../../shared/services/shop/product/cart.service';

@Component({
  selector: 'app-shipping-options',
  templateUrl: './shipping-options.component.html',
  styleUrls: ['./shipping-options.component.css']
})

export class ShippingOptionsComponent implements OnInit {
  dropIn;
  itemsAndLocations;
  constructor(private addressService: AddressService,
              private userService: UserService,
              private cartService: CartService) {}
  ngOnInit() {
    this.cartService.getCartItemsAndSellerPicupLocations();
    this.addressService.changeSelectedAddress.subscribe( (result: any) => {
      console.log(result);
      this.dropIn = result;
    });
    this.cartService.changeItemsAndLocations.subscribe( (result: any) => {
      console.table(result.data.cart.products[0].product.user.address.addresses);
      this.itemsAndLocations = result;
    });
  }
}
