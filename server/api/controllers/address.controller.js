const Address = require('../../db/models/address.model');
const User = require('../../db/models/user.model');
const response = require('../../shared/lib/response');
const error = require('../../shared/lib/error');
const userController = require('./user.controller');
const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const addAddress = (req, res, next) => {
  console.log(req.body);
   const options = {
     _id: req._id
   };
  const optionsData = {
    name: req.body.name,
    phone: Number(req.body.phone),
    country: req.body.country,
    state: req.body.state,
    district: req.body.district,
    address: req.body.address,
    pincode: Number(req.body.pincode),
    locality: req.body.locality,
    landmrk: req.body.landmark,
    alternativePhone: Number(req.body.alternativePhone),
    addressType: req.body.addressType
  };
  //
  console.log(optionsData);
  // find address schema
  // User.findOne({ _id: options._id })
  //     .then(result => {
  //       console.log(result);
  //       if(!result) {
  //         return error.error404(res, 'user no found');
  //       } else {
  //         console.log('---- address --------');
  //         console.log(result.address);
  //         if(result.address) {
  //           updateAddress(result.address, optionsData, res);
  //         } else {
            createAddressAndUpdate(options._id, optionsData, res);
      //     }
      //   }
      // })
}

// update address
// function updateAddress(_id, optionsData, res) {
//   console.log('update');
//   Address.updateOne({ _id: _id }, { $push: { addresses: optionsData }}).then( result => {
//     console.log(result);
//     if(!result){
//       return error.error500(res, 'problem update address schema');
//     } else {
//       return response.response200(res, 'update address success', result);
//     }
//   });
// }
// create address schema & update

function createAddressAndUpdate(_id, optionsData, res) {
  console.log('create');
  const address = new Address({
    _id: new mongoose.Types.ObjectId(),
    name: optionsData.name,
    phone: optionsData.phone,
    country: optionsData.country,
    state: optionsData.state,
    district: optionsData.district,
    address: optionsData.district,
    pincode: optionsData.pincode,
    locality: optionsData.locality,
    landmark: optionsData.landmark,
    alternativePhone: optionsData.alternativePhone,
    addressType: optionsData.addAddressType
  });

  address.save().then(result => {
    console.log(result);
    if(!result) {
      error.error500(res, 'db error');
    } else {
      User.updateOne(
          { _id: _id },
          { $push: { address: result._id } }
        )
          .exec((err, result2) => {
            console.log(result2);
            console.log(err);
            if(err) {
              return error.error500(res, 'problem update user');
            } else {
              return response.response200(res, 'address schema create & updated', result);
            }
          });
    }
  });

}

// get address list
const addressList = (req, res, next) => {
  console.log(req.query);
  const options = {
    _id: req._id,
    skip: Number(req.query.skip),
    limit: Number(req.query.limit)
  };
  console.log(options);
  // User
  // .findOne
  // (
  //   { _id: options._id }
  // )
  // .select("address -_id")
  // .populate({
  //   path: "address",
  //   options: {
  //     skip: options.skip,
  //     limit: options.limit
  //   }
  // })
  // .exec((err, result) => {
  //   console.log(err);
  //   console.log(result);
  // });
User.aggregate


  User.aggregate([{
    $facet: {
      address: [
        { $match: { _id: new mongoose.Types.ObjectId(req._id) },  },
        { $project: {  address: 1, _id: 0 }},
        // { $group: {
        //   _id: ,
        //   count: { $sum: 1 }
        // } },
        {
          $lookup: {
            from: "addresses",
            localField: "address",
            foreignField:  "_id",
            as: 'address'
          }
        },
        { $unwind: "$address" },
        { $replaceRoot: { newRoot: "$address" } },
        { $skip: options.skip },
        { $limit: options.limit },
        { $sort:{ "updated": -1 } }
        // { $group: {
        //   _id: "$address",
        //   count: { $count: 1 }
        //  }
        // }
      ],
      total: [
        { $match: { _id: new mongoose.Types.ObjectId(req._id) },  },
        { $project: {  address: 1, _id: 0 } },
        // { $group: {
        //   _id: null,
        //   count: { $sum: 1 }
        // } }
        {
          $lookup: {
            from: "addresses",
            localField: "address",
            foreignField:  "_id",
            as: 'address'
          }
        },
        { $unwind: "$address" },
        { $count: "count" }
        // { $replaceRoot: { newRoot: "$address" } },
        // {
        //   $count: "count"
        // },
        // {
        //   $replaceRoot: { newRoot: "$total.count" }
        // }
        // { $skip: options.skip },
        // { $limit: options.limit},
        // { $sort:{ "updated": -1 } },
        // { $group: {
        //   _id: "$address",
        //   count: { $count: 1 }
        //  }
        // }
      ]
    }
  }
],
  (err, result) => {
    console.log(err);
    console.log(result[0]);
    if(err) {
      return error.error500(res, err);
    }
    if(result){
      return response.response200(
        res,
        'address fetch success',
        {
        addresses: result[0].address, total: result[0].total[0].count
        }
        );
    }
  });
  // User.aggregate(
  //   [
  //     // query
  //     {
  //       $match: { _id: new mongoose.Types.ObjectId(req._id) }
  //     },
  //     // select
  //     {
  //       $project: {
  //         address: 1,
  //         _id: 0
  //       }
  //     },
  //     { $unwind: '$address' },
  //     // populate
  //     {
  //       $lookup: {
  //         from: "addresses",
  //         localField: "address",
  //         foreignField: "_id",
  //         as: "address"
  //       }
  //     }
  //   ],
  //   (err, result) => {
  //     console.log(result);
  //     console.log(err);
  //     if(err) {
  //       return error.error500(res, err);
  //     }
  //     if(result) {
  //       console.log(result);
  //       return response.response200(res, 'address', result);
  //     }
  //   }
  //   );

  // User.findOne({ _id: options._id })
  //     .exec( (err, result) => {
  //       console.log(';;;;;;;;;;;;;;;;;;');
  //       console.log(err);
  //       console.log(result);
  //       console.log(result.address);
  //       console.log(';;;;;;;;;;;;;;;;;;');
  //       if(!result.address){
  //         return response.response200(res, 'address not found', {
  //           addresses: [], total: 0
  //         });
  //       } else {
  //         console.log(result);
          // count address size
      //     Address.aggregate([
      //       { $match: { _id: result.address }},
      //       { $project: { addressSize: { $size: "$addresses" } }}
      //     ], (err, count) => {
      //       console.log(count);
      //      if(err) {
      //        return error.error500(res, err);
      //      }
      //      if(!count){
      //        return error.error404(res, 'count not found');
      //      } else {
      //       //  aadress list
      //       Address.aggregate([
      //         { $match: { _id: result.address }},
      //         { $unwind: '$addresses' },
      //         { $sort: { 'addresses.updated': -1 } },
      //         { $skip: options.skip },
      //         { $limit: options.limit },
      //         // {$project:{NumberOfItemsInArray:{$size:"$addresses"}}},
      //         { $group: { _id: '$_id', addresses: { $push: '$addresses' } } }
      //       ], (err, resultant) => {
      //         console.log(resultant);
      //         if(err) {
      //           return error.error500(res, err)
      //         }
      //         if(!resultant) {
      //           return error.error404(res, 'not found')
      //         } else {
      //           console.log({
      //             addresses: resultant[0].addresses, total: count[0].addressSize
      //           });
      //
      //         }
      //       });
      //       // end of address list
      //      }
      //     });
      //     // end count of address size
      //   }
      // });
}

// address update
const addressUpdate = (req, res, next) => {
  const options = {
    _id: req._id,
    addressSelectedId: req.body.addressSelectedId
  };
  console.log(options);
  User.findOne({ _id: options._id })
      .exec((err, result) => {
        console.log(result);
        if(err) {
          return error.error500(res, err);
        }
        if(!result) {
          return error.error404(res, 'not found user');
        } else {
          Address.updateOne(
            {
              _id: result.address,
              'addresses._id': options.addressSelectedId
            },
            {
              $set: { 'addresses.$.updated': Date.now() }
            })
            .exec( (err, resultant) => {
              console.log(resultant);
              response.response200(res, 'success', resultant);
            });
        }
      });
}

//
const cartItemsAndSellerPickupLocations = (req, res, next) => {
  const options = {
    _id: req._id
  };
  User.findOne({ _id: options._id})
      .select("cart -_id")
      .populate({
        path: 'cart', model: 'Cart',
        populate: {
          path: 'products.product', model: 'Product',
          populate: {
            path: 'user', model: 'User',
            populate: {
              path: 'address',
              model: 'Address',
              // select: 'addresses -_id',
              options: { $sort: { 'addresses.state': -1 } }
            }
          }
        }
      })
      .exec((err, result) => {
        console.log(err);
        console.log(result);
        if(err) {
          return error.error500(res, err);
        }
        if(!result) {
          return error.error404(res, 'not found');
        } else {
          return response.response200(res, 'cart items & pickup locations', result);
        }
      });
}
module.exports = {
  addAddress,
  addressList,
  addressUpdate,
  cartItemsAndSellerPickupLocations
};
