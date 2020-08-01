import { NgModule } from '@angular/core';
// seller routing module
import { SharedModule } from '../../shared/shared.module';
import { SellerRoutingModule } from './seller-routing.module';
import { BuyerModule } from '../buyer/buyer.module';
// import components
import { AddCategoryComponent } from '../seller/category-list/add-category/add-category.component';
import { CategoryListComponent } from '../seller/category-list/category-list.component';
import { AddProductComponent } from '../seller/seller-product-list/add-product/add-product.component';
import { SellerProductListComponent } from '../seller/seller-product-list/seller-product-list.component';

@NgModule({
  declarations: [
    AddCategoryComponent,
    CategoryListComponent,
    AddProductComponent,
    SellerProductListComponent
  ],
  imports: [
    SellerRoutingModule,
    SharedModule,
    BuyerModule
  ],
  exports: [
    SellerRoutingModule,
    SharedModule,
    // components
    AddCategoryComponent,
    CategoryListComponent,
    AddProductComponent,
    SellerProductListComponent,
    BuyerModule
  ]
})

export class SellerModule {
  constructor() {}
}
