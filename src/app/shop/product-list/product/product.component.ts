import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../../../shared/services/shop/product/product.service';
import { CourierService } from '../../../shared/services/shipping/courier.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit, OnChanges {
  product;
  pincode;
  isPincode = true;
  gallery = [];
  viewImage;
  message = 'service is not available this area';
  i = 0;
  quantity;
  quantityLimit = 10;
  wishlist = false;
  relatedProducts;
  limitRelatedProduct = 4;
  startIndexRelatedProduct = 0 ;
  //
  options;

  constructor(private router: ActivatedRoute,
              private ps: ProductService,
              private courier: CourierService) {}
  ngOnInit() {
   this.router.params.subscribe( routeParams => {
     console.log(routeParams);
     this.getProduct(routeParams._id);
   });
   this.pincode = 822120;
   if (this.pincode) {
     this.isPincode = false;
   }
  }
  // onChange
  ngOnChanges() {
  }

  //  get product
  getProduct(id) {
    this.gallery = [];
    this.ps.getProduct(id).subscribe({
      next: (result: any) => {
        this.product = result.data;
        console.log(this.product);
        console.log(this.product.address);
        this.viewImage = this.product.image.main;
        this.gallery.push(this.product.image.main);
        this.product.image.gallery.forEach(element => {
        this.gallery.push(element);
        });
       //  out of stock quantity disable
        if (this.product.quantity < 1) {
          this.quantity = null;
        } else {
         this.quantity = 1;
        }
        // related products
        this.getRelatedProducts(this.product._id,
                                this.product.category._id,
                                this.limitRelatedProduct,
                                this.startIndexRelatedProduct);
      },
      error: (err: any) => {
      },
      complete: () => {
      }
    });
  }

  // change pincode
  changePincode(event) {
    event.stopPropagation();
    this.isPincode = !this.isPincode;
    this.i = this.i + 1;
  }
  // change view image
  changeViewImage(i) {
    this.viewImage = this.gallery[i];
    return true;
  }

  // favorite
  changeWishlist() {
    this.wishlist = !this.wishlist;
  }

  // related products
  getRelatedProducts(id, categoryId, limit, skip) {
    // if (this.relatedProducts.length < (this.startIndexRelatedProduct + this.limitRelatedProduct - 1) ) {
      this.ps.getRelatedProducts(id, categoryId, limit, skip).subscribe({
        next: (result: any) => {
          this.relatedProducts = result.data;
        },
        error: (err: any) => {
        },
        complete: () => {
        }
      });
    // }
  }

  // check pincode availability
  checkPincode(options) {
    this.courier.serviceability(options).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }
  // end
}
