import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import components
import { AddCategoryComponent } from '../seller/category-list/add-category/add-category.component';
import { CategoryListComponent } from '../seller/category-list/category-list.component';
import { AddProductComponent } from './seller-product-list/add-product/add-product.component';
import { SellerProductListComponent } from './seller-product-list/seller-product-list.component';
const routes: Routes = [
  { path: '', children: [
    { path: 'category-list', component: CategoryListComponent },
    { path: 'add-category', component: AddCategoryComponent },
    { path: 'add-product', component: AddProductComponent},
    { path: 'product-list', component: SellerProductListComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SellerRoutingModule {

}
