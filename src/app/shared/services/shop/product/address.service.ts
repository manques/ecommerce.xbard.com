import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../config/config';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class AddressService {
  addressList;
  changeAddressList = new Subject<any>();
  changeSelectedAddress = new Subject<any>();
  constructor(private http: HttpClient,
              private router: Router) {
  }
  // add address
  addAddress(options) {
    return this.http.post(`${config.apiUrl}/address/add-address`, options);
  }
  // fetch address
  fetchAddressList(skipLimit) {
    console.log('address list');
    this.http.get(`${config.apiUrl}/address/address-list?skip=${skipLimit.skip}&limit=${skipLimit.limit}`)
        .subscribe({
          next: (result: any) => {
            console.log(result);
            this.addressList = { addresses: result.data.addresses, total: result.data.total };
            this.changeAddressList.next(this.addressList);
          },
          error: (err: any) => {
            console.log(err);
          },
          complete: () => {
          }
        });
  }
  // get address
  getAddressList() {
    return this.addressList;
  }
  // selection update address
  selectionUpdateAddress(obj) {
    this.http.put(`${config.apiUrl}/address/address-update`, obj)
             .subscribe({
               next: (result: any) => {
                console.log(result);
               },
               error: (err: any) => {
                console.log(err);
               },
               complete: () => {
                console.log('completed update');
               }
             });
  }
// get selected;
// getSelectedAddrss() {
//   return .
// }
}

