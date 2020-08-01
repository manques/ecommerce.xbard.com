import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product-list/product/product.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  { path: 'product/:_id', component: ProductComponent },
  { path: 'products', component: ProductListComponent},
  { path: 'seller', loadChildren: () => import('./seller/seller.module').then( m => m.SellerModule ) },
  { path: '', loadChildren: () => import ('./buyer/buyer.module').then( m => m.BuyerModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ShopRoutingModule { }
