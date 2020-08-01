// import mongoose module
const mongoose = require('mongoose');

// import
const config = require('../shared/config/config');

// import chalk module
const chalkConfig = require('../shared/config/chalk-config');

//
module.exports = () => {
  // create db connection
  mongoose.connect(config.dbUrl, config.mongooseOptions);
  // all connection events
  // when success  events
  mongoose.connection.on('connected', () => {
    console.log(chalkConfig.connected('mongoose default connection opento', config.dbUrl));
  });

  // if connection throws an error
  mongoose.connection.on('error', err => {
    // chalkConfig.error('mongoose default connection error', err)
    console.log(chalkConfig.error('mongoose default connection error', err));
  });

  // connection is disconnected
  mongoose.connection.on('disconnectd', () => {
    console.log(chalkConfig.disconnected('mongoose deafult connection disconnected'));
  });

  // if node process ends - close the mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(  () => {
      console.log(chalkConfig.termination('mongoose default connection disconnected through app termination'));
      process.exit(0);
    });
  });

}
