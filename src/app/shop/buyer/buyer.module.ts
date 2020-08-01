import { NgModule } from '@angular/core';
import { BuyerRoutingModule } from './buyer-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserModule } from '../../user/user.module';

import { CartComponent } from '../buyer/cart/cart.component';
import { AddAddressComponent } from '../buyer/address-list/add-address/add-address.component';
import { AddressListComponent } from '../buyer/address-list/address-list.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShippingOptionsComponent } from './checkout/shipping-options/shipping-options.component';

@NgModule({
  declarations: [
    CartComponent,
    AddAddressComponent,
    AddressListComponent,
    WishlistComponent,
    CheckoutComponent,
    ShippingOptionsComponent
  ],
  imports: [
    BuyerRoutingModule,
    SharedModule,
    UserModule
  ],
  exports: [
     BuyerRoutingModule,
     SharedModule,
     CartComponent,
     AddAddressComponent,
     WishlistComponent,
     AddressListComponent,
     CheckoutComponent,
     UserModule,
     ShippingOptionsComponent
    ]
})

export class BuyerModule {
  constructor() {}
}
