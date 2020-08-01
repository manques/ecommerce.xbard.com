// -------------import build-in module--------------------
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const morgan = require('morgan');
// import custom module


// --------------------  import db connection  -------------------------
const db = require('./db/db.connection');
db();
// create server
const app = express();
// ---------------------------   middleware   --------------------------
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined'));

// routing
// ----------------- import routes module ------------------
const userRoutes = require('./api/routes/user.route');
const categoryRoutes = require('./api/routes/category.route');
const productRoutes = require('./api/routes/product.route');
const cartRoutes = require('./api/routes/cart.route');
const wishlistRoutes = require('./api/routes/wishlist.route');
const addressRoutes = require('./api/routes/address.route');

// ------------- redirect router  /  use routes-------------------
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/address', addressRoutes);
//--------------- create uploads folder & serve/expose its file to public --------------------
const fs = require('fs');
const dir = './uploads';
if(!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}
// expose static file
app.use(`/uploads`, express.static('./uploads'));


// error handler
app.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500)
       .json({
         status: error.status || 500,
         message: error.message || 'server error',
         data: null,
         success: false
       });
});


// create port number
const PORT = process.env.PORT || 8880;
// connect to create server & connect port
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
