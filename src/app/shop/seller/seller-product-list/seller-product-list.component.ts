import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../shared/services/shop/product/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CourierService } from '../../../shared/services/shipping/courier.service';

export interface DataSource {
 image: string;
 details: any;
 quantity: number;
 actions: string;
}

@Component({
  selector: 'app-seller-product-list',
  templateUrl: './seller-product-list.component.html',
  styleUrls: ['./seller-product-list.component.css']
})

export class SellerProductListComponent implements OnInit {
  category = 'all';
  sort = 'newest';
  page = 0;
  pageSize = 8;
  pageSizeOptions = [ 1, 4, 8, 12, 16, 32, 64 ];
  total;
  spinner = true;
  response;
  products = [];
  // details - name, price, category
  displayedColumns: string[] = [ 'image', 'details', 'quantity', 'actions'];
  dataSource;
  // ViewChild for paginator
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  constructor(private ps: ProductService, private courier: CourierService) {}
  ngOnInit() {
    this.getProducts();
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  // get product
  getProducts() {
    const options = {
      category: this.category,
      sort: this.sort,
      page: this.page,
      pageSize: this.pageSize
    };
    return this.ps.getSellerProducts(options).subscribe({
      next: (result: any) => {
        this.products = [];
        result.data.products.forEach(element => {
          this.products.push({
            image: element.image.main,
            details: {
              _id: element._id,
              name: element.name,
              price: element.price,
              category: {
                name: element.category.name,
                _id: element.category._id
              }
            },
            quantity: element.quantity,
            actions: ''
          });
          this.dataSource = new MatTableDataSource(this.products);
          this.dataSource.paginator = this.paginator;
        });
        this.total = result.data.total;
        this.spinner = false;
        this.response = {
          success: true,
          status: 'success',
          message: result.message,
          data: result.data,
          redirected: ''
         };
      },
      error: (err: any) => {
        this.spinner = false;
        this.response = {
          success: false,
          status: 'warning',
          message: err.error.message,
          data: '',
          redirected: ''
         };
      },
      complete: () => {
      }
    });
  }

  // apply filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // change paginator
  changePageSize(event) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    this.getProducts();
  }


}
