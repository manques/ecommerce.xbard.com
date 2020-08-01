import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { CategoryService } from '../../../../shared/services/shop/product/category.service';
import { ProductService } from '../../../../shared/services/shop/product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
  // intialization
  categories;
  path;
  spinner = false;
  response;
  dimensionUnits = ['mm', 'cm', 'dm', 'metre'];
  weightUnits = ['g', 'kg'];
  addressId;
  //
  // start image
  selectedMainImage;
  selectedMainImageUrl;
  selectedGalleryImages = [];
  selectedGalleryImageUrl = [];
  // end image
  addForm = this.fb.group({
    name: ['', [Validators.required]],
    sku: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
    price: ['', [Validators.required]],
    quantity: ['', Validators.required],
    tags: [''],
    dimensions: this.fb.group({
      length: ['', Validators.required],
      breadth: ['', Validators.required],
      height: ['', Validators.required],
      units: ['cm', Validators.required]
    }),
    weight: this.fb.group({
      value: ['', Validators.required],
      units: ['kg', Validators.required]
    }),
    image: this.fb.group({
      main: [''],
      gallery: ['']
    }),
    description: this.fb.group({
      short: ['', Validators.required],
      long: [ '', Validators.required],
      features_title: this.fb.array([
        this.fb.control('')
      ]),
      features_value: this.fb.array([
        this.fb.control('')
      ])
    })
  });
  constructor(private fb: FormBuilder,
              private cs: CategoryService,
              private addProductService: ProductService) {}
  ngOnInit() {
    // category serives
    this.cs.categoryChange.subscribe( result => {
      this.categories = result;
    });
    this.cs.getCategories();
  }
  // short access
  get f() {
    return this.addForm.controls;
  }
  get fdPre() {
    return this.addForm.get('description') as FormGroup;
  }
  get short() {
    return this.fdPre.get('short') as FormGroup;
  }
  get long() {
    return this.fdPre.get('long') as FormGroup;
  }
  get fd() {
    return this.fdPre.controls;
  }
  get ffTitle() {
    return this.f.description.get('features_title') as FormArray;
  }
  get ffValue() {
    return this.f.description.get('features_value') as FormArray;
  }
  // dimensions
  get di() {
    return this.addForm.get('dimensions') as FormArray;
  }
  get l() {
    return this.di.get('length');
  }
  get b() {
    return this.di.get('breadth');
  }
  get h() {
    return this.di.get('height');
  }
  get dUnits() {
    return this.di.get('units');
  }
  // weight
  get wei() {
    return this.addForm.get('weight');
  }
  get wValue() {
    return this.wei.get('value');
  }
  get wUnits() {
    return this.wei.get('units');
  }
  // main image
  changeMainImage(event) {
    this.selectedMainImage = event.target.files[0];
    if (this.selectedMainImage === undefined) { return; }
    // limits fize size 5mb;
    if (this.selectedMainImage?.size > (1000000 * 15)) { return; }
    // empty & image file types
    if ((this.selectedMainImage?.size === 0)
         || (this.selectedMainImage?.type.match(/image\/*/) === null)) { return; }
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedMainImage);
    reader.onload = (evt) => {
      this.selectedMainImageUrl = evt.target.result;
    };
  }

  // main image closer
  mainCloser() {
    this.selectedMainImage = null;
    this.selectedMainImageUrl = null;
  }

  // select product gallery images
  changeGalleryImages(event) {
    this.checkImage(event.target.files);
    const gallery = event.target.files;
    this.selectedGalleryImageUrl = [];
    this.selectedGalleryImages = [];
    Object.values(gallery).forEach( (value: any) => {
      this.selectedGalleryImages.push(value);
      const reader = new FileReader();
      reader.readAsDataURL(value);
      reader.onload = (evt) => {
        this.selectedGalleryImageUrl.push(evt.target.result);
      };
    });
  }

  // gallery images closer
  galleryCloser(removeFile) {
    // remove Url
    this.selectedGalleryImageUrl = this.selectedGalleryImageUrl.filter(( file, index ) => {
      if (file === removeFile) {
        this.selectedGalleryImages.splice(index, 1);
      }
      return file !== removeFile;
    });
    // remove selected file
  }
  // check image valid
  checkImage(files) {
    for (const file of files) {
      if (file === undefined) { return; }
      // limits fize size 5mb;
      if (file?.size > (1000000 * 15)) { return; }
      // empty & image file types
      if ((file?.size === 0)
           || (file?.type.match(/image\/*/) === null)) { return; }
    }
  }
  // add features
  addFeatures() {
    this.ffTitle.controls.push(this.fb.control(''));
    this.ffValue.controls.push(this.fb.control(''));
  }

  // find path
   findPath() {
     this.path = this.addProductService.findPath(this.f.categoryId.value, this.categories);
   }
   // selected address
   selectedAddress(event) {
    this.addressId = event._id;
    console.log(this.addressId);
   }
  // add product form
  onSubmit() {
    console.log(this.wUnits);
    // this.spinner = true;
    const formData = new FormData();
    formData.append('categoryId', this.f.categoryId.value);
    formData.append('address', this.addressId);
    formData.append('path', this.path);
    formData.append('sku', this.f.sku.value);
    formData.append('name', this.f.name.value);
    formData.append('price', this.f.price.value);
    formData.append('quantity', this.f.quantity.value);
    formData.append('tags', this.f.tags.value);
    formData.append('length', this.l.value);
    formData.append('breadth', this.b.value);
    formData.append('height', this.h.value);
    formData.append('dimensionsUnits', this.dUnits.value);
    formData.append('weight', this.wValue.value);
    formData.append('weightUnits', this.wUnits.value);
    formData.append('shortDescription', this.fd.short.value);
    formData.append('longDescription', this.fd.long.value);
    for (let i = 0; i < this.ffTitle.controls.length; i++) {
      formData.append('featureTitle', this.ffTitle.controls[i].value);
      formData.append('featureValue', this.ffValue.controls[i].value);
    }
    formData.append('main', this.selectedMainImage);
    this.selectedGalleryImages.forEach( file => {
      formData.append('gallery', file);
    });
    // add product service
    this.addProductService.addProduct(formData)
                          .subscribe({
                            next: (result: any) => {
                              this.spinner = false;
                              this.response = {
                                success: true,
                                status: 'success',
                                message: result.message,
                                data: result.data,
                                redirected: '/seller/product-list'
                              };
                              this.addForm.reset();
                            },
                            error: (err: any) => {
                              this.spinner = false;
                              this.response = {
                                success: false,
                                status: 'warning',
                                message: err.error.message,
                                data: err.data,
                                redirected: ''
                              };
                            },
                            complete: () => {
                            }
                          });
  }
}
