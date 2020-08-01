const Category = require('../../db/models/category.model');
const mongoose = require('mongoose');
const error = require('../../shared/lib/error');
const response = require('../../shared/lib/response');

// add category
const add = (req, res, next) => {
  // category
   const category = new Category({
     _id: new mongoose.Types.ObjectId(),
     name: req.body.name,
     parent: req.body.parent ? req.body.parent : null
   });
  //  save
  category.save()
          .then( data => {
            if(!data){
              return error.error500(res, 'internal server error');
            } else {
              return response.response200(res, 'successful added category', data);
            }
          })
          .catch( err => { return error.error500(res, err); });
};

// list categories

const list = (req, res, next) => {
  Category.find()
          .then(data => {
            if(!data){
              return error.error500(res, 'category search problem');
            } else {

              return response.response200(res, 'successful fetch categories', data);
            }

          })
          .catch( err => {
            return error.error500(res, err);
          });
}

// breadcrumb
const breadcrumb = (req, res, next) => {
  const _id = req.params._id;
  let list = [];
  repeatBreadcrumb(res, _id, list);
}

// recursive breadcrumb
function repeatBreadcrumb(res, id, list) {
  Category.findOne({ _id: id }).exec((err, result) => {
    if(err) return error.error500(res, err);
    if(!result)  {
      return error.error404(res, `fetch problem of this category ${id}`);
    } else {
      if(result.parent === null) {
        list.push({ _id: result._id, name: result.name });
        return response.response200(res, 'breadcrumb fetch successful', list.reverse() );
      } else {
        list.push({ _id: result._id, name: result.name });
        return repeatBreadcrumb(res, result.parent, list);
      }

    }
  });
}

module.exports = {
  add,
  list,
  breadcrumb
};
