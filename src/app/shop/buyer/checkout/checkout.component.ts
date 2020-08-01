import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../shared/services/user.service';
import { AddressService } from '../../../shared/services/shop/product/address.service';
interface Check {
  isEditable: boolean;
  isCompleted: boolean;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {
      displayDefaultIndicatorType: false
    }
  }]
})

export class CheckoutComponent implements OnInit {
  isLogin: Check = { isEditable: true, isCompleted: false };
  isAddress: Check = { isEditable: true, isCompleted: false };
  isOptions: Check = { isEditable: true, isCompleted: false };
  isOrderSummary: Check = { isEditable: true, isCompleted: true };
  isPayment: Check = { isEditable: false, isCompleted: false };
  isFinish: Check = { isEditable: false, isCompleted: true };
  user;
  isSpinner = true;
  selectedAddress;
  constructor(private auth: AuthService,
              private userService: UserService,
              private addressService: AddressService ) {}
  ngOnInit() {
    this.user = this.userService.getUser();
    console.log(this.user);
    if (this.user) {
      this.isSpinner = false;
      this.isLogin.isCompleted = true;
    }
    this.userService.userChange.subscribe(result => {
      this.user = result;
      console.log(this.user);
      this.isSpinner = false;
      this.isLogin.isCompleted = true;
    });
  }
  // get Selected address
  getSelectedAddress(address) {
    console.log(address);
    this.selectedAddress = address;
    this.addressService.changeSelectedAddress.next(this.selectedAddress);
  }

}
