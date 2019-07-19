// Initializes the `Bid` service on path `/bids`
const createService = require('feathers-sequelize');
const createModel = require('../../models/bid.model');
const hooks = require('./bid.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/bids', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('bids');

  service.hooks(hooks);
};
