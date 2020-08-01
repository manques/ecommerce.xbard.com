const fs  = require('fs');
const categorylist = require('./get-category.list');
const Category = require('../../../db/models/category.model');

const  crud = (req) => {
  console.log(req.body);
  console.log(req.file);
  let dir;
  //  categorylist.list(req.body.categoryId, []);
  //  Category.findOne({ _id: req.body._id }).then( category => {
  //   console.log('sdsfsdf'+category);
  //   list.push(category.name);
    // if(category.parent === null) {
    //   return list.reverse();
    // } else {
    //   return recursive(category.parent, list);
    // }
  // }).catch(err => {
  //   console.log(err);
  // });
  // console.log('list' + list);
  // let categoryPath = '';
  // for(let category of list){
  //   categoryPath += `/${category}`
  // }
  // dir = `./uploads/products${cateogryPath}/${req.body.name} - ${product.body.sku}`;
  // console.log(dir);
  // if(!fs.existsSync(dir)){
  //   fs.mkdirSync(dir, { recursive: true })
  // }
  // return dir;
};

module.exports = {
  crud
};
