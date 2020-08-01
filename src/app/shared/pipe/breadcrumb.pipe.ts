import { Pipe, PipeTransform } from '@angular/core';
import { CategoryService } from '../../shared/services/shop/product/category.service';

@Pipe({
  name: 'breadcrumb'
})

export class BreadcrumbPipe implements PipeTransform {
  constructor(private cs: CategoryService) {}
  async transform(id) {
    const pathList: any = await this.cs.breadcrumbList(id).then( data => {
      return data;
    });
    console.log(pathList);
    return [...pathList];
  }
}

