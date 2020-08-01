import { Component, ViewChild, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MyLatLngService } from '../../../../shared/services/myLatLng.service';
import { StateDistrictService } from '../../../../shared/services/state-district.service';
import { AddressService } from '../../../../shared/services/shop/product/address.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})

export class AddAddressComponent implements OnInit {
  @Output() isAddAddress = new EventEmitter<boolean>();
  countries = ['india'];
  stateDistrict: any;
  districts;
  latLng;
  position;
  addressForm = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    pincode: ['', [Validators.required]],
    locality: ['', [Validators.required]],
    address: ['', [Validators.required]],
    district: ['', [Validators.required]],
    state: ['', [Validators.required]],
    country: ['', [Validators.required]],
    landmark: [''],
    alternativePhone: [''],
    addressType: ['', [Validators.required]]
  });
  constructor(private fb: FormBuilder,
              private ll: MyLatLngService,
              private sd: StateDistrictService,
              private addressService: AddressService) {}
  ngOnInit() {
    //  this.ll.LatLng();
     this.ll.latLngChange.subscribe( result => {
      this.position = result;
      if (this.position) {
        this.latLng = {
          lat: this.position.coords.latitude,
          lng: this.position.coords.longitude
        };
      }
     });
     this.sd.fetchstatesDistricts();
     // get state & district
     this.sd.stateDistrictChange.subscribe((result: any) => {
       this.stateDistrict = result;
     });
  }
 // get disticts
 getDistricts(value) {
   this.districts = value.districts;
 }
  //
  get f() {
    return this.addressForm.controls;
  }
  // add address form
  submit() {
    const addressList = {
      name: this.f.name.value,
      phone: this.f.phone.value,
      country: this.f.country.value,
      state: this.f.state.value.state,
      district: this.f.district.value,
      address: this.f.address.value,
      pincode: this.f.pincode.value,
      locality: this.f.locality.value,
      landmark: this.f.landmark.value,
      alternativePhone: this.f.alternativePhone.value,
      addressType: this.f.addressType.value
    };
    this.addressService
        .addAddress(addressList)
        .subscribe({
          next: (result: any) => {
          },
          error: (err: any) => {
          console.log(err);
          },
          complete: () => {
          console.log('complete');
          this.isAddAddress.emit(true);
          }
        });

  }
}
