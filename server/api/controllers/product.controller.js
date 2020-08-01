const Product = require('../../db/models/product.model');
const Category = require('../../db/models/category.model');
const mongoose = require('mongoose');
const config = require('../../shared/config/config');
const response = require('../../shared/lib/response');
const error = require('../../shared/lib/error');

// ----------------   add product -------------------
const addProduct = (req, res, next) => {
  // gallery images
  const gallery = [];
  req.files.gallery.forEach(element => {

    gallery.push(`${config.protocol}${req.headers.host}/${element.path}`);
  });
  features = [];
  // dynamic  features list
  if(req.body.featureTitle.length > 1){
    for(let i = 0; i < req.body.featureTitle.length; i++) {
      let feature = {
        title: req.body.featureTitle[i],
        value: req.body.featureValue[i]
      };
      features.push(feature);
    }
  } else if(req.body.featureTitle.length === 1) {
    let feature = {
      title: req.body.featureTitle,
      value: req.body.featureValue
    };
    features.push(feature);
  } else {

  }
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    category: req.body.categoryId,
    sku: req.body.sku,
    price: !isNaN(Number(req.body.price)) ? Number(req.body.price) : 0,
    quantity: !isNaN(Number(req.body.quantity)) ? Number(req.body.quantity) : 0,
    tags: req.body.tags,
    address: req.body.address,
    dimensions: {
      length: req.body.length,
      breadth: req.body.breadth,
      height: req.body.height,
      units: req.body.dimensionsUnits
    },
    weight: {
      value: req.body.weight,
      units: req.body.weightUnits
    },
    user: req._id,
    description: {
      short: req.body.shortDescription,
      long: req.body.longDescription,
      features: features
    },
    image: {
      main: `${config.protocol}${req.headers.host}/${req.files.main[0].path}`,
      gallery: gallery
    }
  });
  // response.response200(res, 'llll', 'ppppp')
  //save
  product.save()
  .then(result => {
    if(!result) {
      return error.error404(res, 'problem save data in db server')
    } else {
      return response.response200(res, 'successful add product data ', result);
    }
  })
  .catch(err => {
    return error.error500(res, 'kkkkkkkkkkk'+err);
  });
}

//  --------------- seller product list --------------------
const sellerProductList = (req, res, next) => {
  // find product count by category default all

  const options = {
    category: req.query.category,
    sort: req.query.sort,
    page: Math.max(0, req.query.page),
    pageSize: Number(req.query.pageSize),
    total: 0,
    user: req._id
  };
  let query;
  if(options.category === 'all'){
    this.query = {};
  } else {
    query['category'] = { $in:  findCategory(options.category) };
  }
  getProductsFromDB(options, query, req, res);
}

function getProductsFromDB(options, query, req, res) {
 // sort
  Product.countDocuments(query, (err, count) => {
                            if(err) return error.error500(res, err);
                            if(!count) {
                              return response.response200(res, 'Empty Products', { total : 0 , products: []});
                            } else {

                              // start product list
                              options.total = count;
                              Product.aggregate([{
                                $collStats: {
                                  latencyStats: {
                                    histograms: true
                                  },
                                  storageStats: { }
                                }
                              }]).exec((err, details) => {
                                console.log(details);
                              });
                              Product.find(query)
                                      .sort(findSortObj(options.sort))
                                      .limit(options.pageSize)
                                      .skip( options.page * options.pageSize )
                                      .select('name price quantity wishlist image.main')
                                      .populate({
                                        path: 'category',
                                        select: 'name'
                                      })
                                      .exec((err, products) => {
                                        if(err) return error.error500(res, err);
                                        console.log(req._id);
                                        return response.response200(res, 'fetch successful', {
                                          products: products,
                                          total: options.total,
                                        });
                                      });

                              // end product list

                            }
                          });

}

// find Category  obj
async function findCategory(category) {

    console.log('------- start-------');
    await leafList(category, []).then( datalist => {
      console.log('------- start in -------');
      console.log(datalist);
      console.log('------- start out -------');
      return datalist;
    });
    console.log('------- end -------');

}

// function leaflist
async function leafList(_id, list){
  await Category.find({ parent: _id })
          .exec((err, result) => {
            console.log('---------- result in----------');
            console.log(result);
            console.log('---------- result out----------');
            if(err) return response.error500;
            if(!result.length){
              console.log('----------list in----------');
              list.push(_id);
              console.log(list);
              console.log('----------list out----------');
              return [...list];
            } else {
              result.forEach( category => {
                // console.log('---------- result in----------');
                // console.log(_id);
                // console.log(result);
                // console.log(category);
                // console.log(list);
                leafList(category._id, list).then( (data) => {
                  console.log('-------data start------');
                  console.log(data);
                  console.log('-------data end------');
                  list = data;
                  // console.log(list);
                });
                // console.log('---------- result out----------');
              })
            }
          });
          return list;
}
// find sortBy
function findSortObj(value) {
  switch(value) {
    // newest
    case 'newest' :
      return { date: 'desc' };
      break;
    // price high to low
    case '-price':
      return { price: 'desc' };
      break;
    // price low to high
    case 'price':
      return { price: 'asc' };
      break;
    // popularity { rating: 'desc', reviewsCount: 'desc', purchase: 'desc' }
    case 'popularity':
      return {};
      break;
    // relevance based puchase history / number of click { purchse, click }
    case 'relevance':
      return {}
    // default
    default:
    return {};
  }
}

// --------------------  get product --------------------------
const product = (req, res, next) => {
  const _id = req.params._id;
  Product.findOne({ _id: _id })
        //  .select('name price quantity image description')
         .populate({ path: 'category', select: 'name'})
         .populate({ path: 'user', populate: {
           path: "address"
         }})
        //  .populate({ path: 'address' })
         .exec( (err, result) => {
           console.log(result);
            if(err) return error.error500(res, err);
            if(!result){
              return error.error404(res, 'product not found');
            } else {
              return response.response200(res, 'get product successful', result);
            }
         })
}

// ------------------ related products -------------------------
const relatedProducts = (req, res, next) => {
  console.log(req.query);
  options = {
    _id : req.query._id,
    limit : Number(req.query.limit),
    skip : Number(req.query.skip),
    c_id : req.query.categoryId
  };

      const query = {
        category: options.c_id,
        _id: { $ne: options._id }
      };
      console.log(query);
      Product
      .countDocuments(query).exec( (err, count) => {
        console.log(count);
        console.log(err);
        if(err) {
          return error.error500(res, err);
        }
        if(!count){
          response.response200(res, 'not related products', []);
        } else {
          console.log(count);
          Product
          .find(query)
          .limit(options.limit)
          .exec((err, products) => {
            console.log(err);
            if(err) return error.error500(res, err);
            return response.response200(res, 'related products fetch', products);
          });

        }
      })
}
// ---------------- get products -------------------------------

const products = (req, res, next) => {
  console.log(req.query);
  options = {
    category: req.query.category,
    sort: req.query.sort,
    page: Math.max(0, req.query.page),
    pageSize: Number(req.query.pageSize),
    total: 0,
  };

  let query;
  if(options.category === 'all'){
    query = {};
  }else {
    query['category'] = { $in: findCategory(options.category) };
  }
  getProductsFromDB(options, query,req, res);
}

module.exports = {
  addProduct,
  sellerProductList,
  product,
  relatedProducts,
  products
};
