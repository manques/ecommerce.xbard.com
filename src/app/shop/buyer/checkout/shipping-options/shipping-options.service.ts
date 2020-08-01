import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ShipOptionsServie {
  constructor() {}
  // compare address
  compareAddress(pickup, dropoff) {
    // check country
    if (pickup.country !== dropoff.country) {
      return this.international(pickup, dropoff);
    } else {
      // check state
      if (pickup.state !== dropoff.state) {
        return this.interstate(pickup, dropoff);
      } else {
         // check district
         if (pickup.district !== dropoff.district) {
          return this.interdistrict(pickup, dropoff);
         } else {
           // check pincode
           if (pickup.pincode !== dropoff.pincode) {
            return this.interpincode(pickup, dropoff);
           } else {
             // check address
             if (pickup.address !== dropoff.address) {
              return this.local(pickup, dropoff);
             } else {
               return this.hyperlocal(pickup, dropoff);
             }
           }
         }
      }
    }
  }
  // international
  international(pickup, dropoff) {}
  // interstate
  interstate(pickup, dropoff) {}
  // interdistict
  interdistrict(pickup, dropoff) {}
  // interpincode
  interpincode(pickup, dropoff) {}
  // local
  local(pickup, dropoff) {}
  // hyperlocal
  hyperlocal(pickup, dropoff) {}
}
