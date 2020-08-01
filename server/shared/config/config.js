module.exports = {
  dbUrl: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds027495.mlab.com:27495/ecommerce-db`,
  mongooseOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  protocol: 'http://'
}
