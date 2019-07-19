// Initializes the `Product` service on path `/products`
const createService = require('feathers-sequelize');
const createModel = require('../../models/product.model');
const hooks = require('./product.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/products', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('products');

  service.hooks(hooks);
};
