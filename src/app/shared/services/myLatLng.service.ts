import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MyLatLngService {
  latLngChange = new Subject<any>();
  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  position;
  message;
  constructor() {
    this.LatLng();
  }
  LatLng() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.displayLocation, this.showError, this.options);
    } else {
      this.message = 'not support google navigator';
    }
  }

  displayLocation = (position) => {
    this.position = position;
    this.latLngChange.next(position);
  }

  showError(error) {
    // let mess;
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.message = 'You denied the request for your location';
        break;
      case error.POSITION_UNAVAILABLE:
        this.message = 'your location information is unavailable';
        break;
      case error.UNKNOWN_ERROR:
        this.message = 'An unknown error occured please try again after some time';
        break;
    }
  }
}
