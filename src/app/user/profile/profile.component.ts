import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ProfileComponent implements OnInit {
  user;
  seller;
  disabled;
  profileBgEdit = false;
  profileImageEdit = false;
  profileEdit = false;
  spinner = true;
  // image file
  selectedBgFile: any;
  selectedProfileFile: any;
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.fetchUser();
    this.userService.userChange.subscribe( result => {
        this.user = result;
        this.seller = this.user?.isSeller;
        this.spinner = false;
    });
    if (this.user) {
      this.spinner = false;
    }
  }
  // isSeller
  changeSeller() {
    this.seller = !this.seller;
    // this.disabled = !this.disabled;
    this.userService.changeSeller(this.seller);
  }

  // ------------------- change background image --------------------
  changeBg(event) {
    this.selectedBgFile = event.target.files[0];
    // limits fize size 5mb;
    if (this.selectedBgFile.size > (1000000 * 15)) { return; }
    // empty & image file types
    if ((this.selectedBgFile.size === 0) || (this.selectedBgFile.type.match(/image\/*/) === null)) { return; }
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedBgFile);
    reader.onload = (eventBg: any) => {
      this.user.image.background  = eventBg.target.result;
    };

    // form data
    const formData = new FormData();
    formData.append('bgImage', this.selectedBgFile);
    this.userService.changeBg(formData);
  }
  //  change profile image
  changeProfile(event) {
    this.selectedProfileFile = event.target.files[0];
    // limit file size 5mb
    if (this.selectedProfileFile.size > (1000000 * 5)) { return; }
    // empty & image file types
    if ((this.selectedProfileFile.size === 0) &&
        (this.selectedProfileFile.type.match(/image\/*/) === null)) { return; }
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedProfileFile);
    reader.onload = (eventProfile: any) => {
      this.user.image.picture = eventProfile.target.result;
    };
    // update to the server
    this.userService.changeProfile(this.selectedProfileFile);
  }
}
