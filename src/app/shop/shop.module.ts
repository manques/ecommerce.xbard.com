import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from '../shop/shop-routing.module';
import { ProductComponent } from './product-list/product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
// import module


@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent
  ],
  imports: [
    ShopRoutingModule,
    SharedModule
  ],
  exports: [
    ShopRoutingModule,
    ProductComponent,
    ProductListComponent,
    SharedModule
  ]
})

export class ShopModule {}
