import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../../../shared/services/shop/product/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

export class AddCategoryComponent implements OnInit {
  spinner;
  categories;
  categoryForm = this.fb.group({
    parent: [''],
    name: ['', [Validators.required]]
  });
  constructor(private fb: FormBuilder,
              private categoryService: CategoryService) {}
  ngOnInit() {
    this.spinner = true;
    this.categoryService.getCategories();
    this.categoryService.categoryChange.subscribe(result => {
      this.categories = result;
      this.spinner = false;
    });
  }
  // f
  get f() {
    return this.categoryForm.controls;
  }
  submit() {
    this.spinner = true;
    console.log(this.f);
    this.categoryService
    .addCategory({
      name: this.f.name.value,
      parent: this.f.parent.value
    }).subscribe({
      next: (result: any)  => {
        console.log(result);
      },
      error: (err: any) => {
        console.log(err);
        this.spinner = false;
        this.categoryForm.reset();
      },
      complete: () => {
        this.spinner = false;
        console.log('complete');
        this.categoryForm.reset();
        this.categoryService.getCategories();
      }
    });
  }
}
