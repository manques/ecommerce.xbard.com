import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StateDistrictService {
  stateDistrict;
  stateDistrictChange = new Subject<any>();
  constructor(private http: HttpClient) {
    this.fetchstatesDistricts();
  }

  // get server india states & districts
  fetchstatesDistricts() {
    return this.http
        .get('http://localhost:8880/uploads/state-district/state-district.json')
        .subscribe({
      next: (result: any) => {
        this.stateDistrict = result;
        this.stateDistrictChange.next(result);
      }
    });
  }
  //  get state & district
  getStateDistrict() {
    return this.stateDistrict;
  }
}
