const Category = require('../../../db/models/category.model');

module.exports = async (req) => {
  console.log(req.body.categoryId, []);
  return await recursive(req.body.categoryId, []);
}


async function recursive(id, list) {
    await Category.findOne({ _id: id }).then( category => {
      list.push(category.name);
      // console.log(list);
      if(category.parent === null) {
        // console.log(list);
        return list.reverse();
      } else {
        // console.log(list);
        recursive(category.parent, list);
      }
    }).catch(err => {
      console.log(err);
    });

}
