import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})

export class GoogleMapsComponent implements OnInit, AfterViewInit {
  @Input() mapOptions: any;
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;
  marker: google.maps.Marker;
  markers: google.maps.Marker[];
  labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  labelIndex = 0;
  infoWindow: google.maps.InfoWindow;
  @ViewChild('search') searchElement: any;
  constructor() {}
  ngOnInit() {
  }
  ngAfterViewInit() {
    const latLng = { lat: this.mapOptions.lat, lng: this.mapOptions.lng };
    const mapProperties = {
      center: new google.maps.LatLng(this.mapOptions.lat, this.mapOptions.lng),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.addMarker(latLng);
    this.map.addListener('click', this.addEvent);

    // autocomplete
    const defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-33.8902, 151.1759),
      new google.maps.LatLng(-33.8474, 151.2631));
    const option = {
      bounds: defaultBounds,
      types: ['establishment']
    };
    const autocomplete = new google.maps.places.Autocomplete(
      this.searchElement.nativeElement,
      {types: ['geocode']}
    );
    autocomplete.bindTo('bounds', this.map);
    const pl = autocomplete.getPlace();
    if (pl) {
    }
  }
  addEvent = (event) => {
    const latlng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    this.addMarker(latlng);
  }
  // add marker
    addMarker(latLng) {

      if (this.marker) {
        this.marker.setMap(null);
      }
      // my location marker icon
      this.marker = new google.maps.Marker({
        position: latLng,

        icon: '../../../../../favicon.ico'
      });
      this.marker.setMap(this.map);
      this.openInfoWindow(latLng, latLng);
    }

    // open info window
    openInfoWindow(latLng, content) {
      if (this.infoWindow) {
        this.infoWindow.close();
      }
      // my location info window
      this.infoWindow = new google.maps.InfoWindow({
        position: latLng
      });
      this.infoWindow.setContent(JSON.stringify(content));
      this.infoWindow.open(this.map, this.marker);
      google.maps.event.clearListeners(this.marker, 'click');
    }
}
