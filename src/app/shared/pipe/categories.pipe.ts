import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categories'
})

export class CategoriesPipe implements PipeTransform {
  categoriesList = [];
  constructor() {}
  transform(categories: any) {
    if (categories) {
      this.dfs(categories);
    }
    return this.categoriesList;
  }
  // defth first search
  dfs(categories) {
    const root = categories.filter( category => category.parent === null);
    this.categoriesList = [];
    this.recursive(root, categories, 0);
  }

  recursive(children, categories, count) {
    for (const i of children ) {
      const labelChild = this.addLabel(i, count);
      this.categoriesList.push(labelChild);
      const childs = categories.filter(category => category.parent === i._id);
      if (childs.length) {
        this.recursive(childs, categories, count + 1);
      }
    }
  }
  addLabel(child, count) {
    if ( count === 0 ) {
      return child;
    } else {
      for (let i = 1; i <= count; i++) {
        child.name = `   ` + child.name;
      }
      return child;
    }
  }
  //
  // end
}
