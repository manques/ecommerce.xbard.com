import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { AddAddressComponent } from './address-list/add-address/add-address.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AddressListComponent } from './address-list/address-list.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'cart', component: CartComponent },
      { path: 'add-address', component: AddAddressComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'address-list', component: AddressListComponent },
      { path: 'checkout', component: CheckoutComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BuyerRoutingModule {
  constructor() {}
}
