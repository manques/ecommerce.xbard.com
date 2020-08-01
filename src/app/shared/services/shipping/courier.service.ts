import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root'
})

export class CourierService {
  constructor(private http: HttpClient) {}
  // serviceability
  serviceability(options) {
    return this.http.post(`${config.apiUrl}/courier/serviceability`, options);
  }
}
