const folder = require('../folder/createFolder');
const deleteAll = require('./deleteUserAll');

module.exports = (req) => {
  // base user url
  const arr = req.baseUrl.split('/');
  const n = arr.length;
  const bdir = `./uploads/${arr[n-1]}`;
  // create folder
  folder.create(bdir);
   // username folder
   console.log(req._id);
   const udir = `${bdir}/${req._id }`;
   folder.create(udir);
  // route
  const subdir = req.route.path.split('/')[1];
  const rdir = `${udir}/${subdir}`;
  // create folder
  folder.create(rdir);
  // delete all files in dir
  deleteAll(rdir);

  return rdir;
}
