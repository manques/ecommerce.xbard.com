import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/shop/product/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit {
  categories;
  constructor(private cs: CategoryService) {}
  ngOnInit() {
    this.cs.getCategories();
    this.cs.categoryChange.subscribe(result => {
      this.categories = result;
      console.log(result);
    });
  }
}
