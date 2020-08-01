import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddressService } from '../../../shared/services/shop/product/address.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})

export class AddressListComponent implements OnInit {
  @Output() address = new EventEmitter<any>();
  @Output() deliveryHere = new EventEmitter<boolean>();
  @Input() isCheckout: boolean;
  addressList;
  selectedAddress;
  isAddAddress = false;
  skip = 0;
  limit = 3;
  total;
  currentSize;
  constructor(private as: AddressService) {}
  ngOnInit() {
    this.as.fetchAddressList(
      { skip: this.skip, limit: this.limit }
    );
    this.as.changeAddressList.subscribe( result => {
      console.log(result);
      this.addressList = result.addresses;
      this.total = result.total;
      this.currentSize = this.addressList.length;
      console.log(this.currentSize);
      console.log(this.total);
      if (this.total > 0) {
        this.selectedAddress = this.addressList[0]._id;
        this.address.emit(this.addressList[0]);
      }
    });
  }
  // on  change selection in angular
  onSelectionChange(address) {
    this.selectedAddress = address._id;
    console.log(address);
    this.as.selectionUpdateAddress(
      { addressSelectedId: this.selectedAddress }
      );
    //
    this.address.emit(address);
  }
  getMoreAddress() {
    this.as.fetchAddressList(
      { skip: this.skip, limit: this.total }
    );
  }

  // fetch after  update address
  get fetchAddressList() {
    this.as.fetchAddressList(
      { skip: this.skip, limit: this.limit }
    );
    return;
  }
}
