import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../config/config';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  categories = [];
  categoryChange = new Subject<any>();

  constructor(private http: HttpClient) {}
  // add category
  addCategory(obj) {
    return this.http
               .post(`${config.apiUrl}/category/add-category`, obj);
  }
  // get category list
  getCategories() {
    return this.http
               .get(`${config.apiUrl}/category/category-list`)
               .subscribe({
                 next: (result: any) => {
                   this.categories = result.data;
                   this.categoryChange.next(this.categories);
                 },
                 error: (err: any) => {
                 },
                 complete: () => {
                 }
               });
  }

  // breadcrumb list
  async breadcrumbList(id) {
  const result: any =  await this.http
                                 .get<any>(`${config.apiUrl}/category/breadcrumb/${id}`)
                                 .toPromise().then( (data: any) => {
                                  return data.data;
                                 });
  return result;
  }
}
