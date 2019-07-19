const users = require('./users/users.service.js');

const product = require('./product/product.service.js');

const bid = require('./bid/bid.service.js');

const auction = require('./auction/auction.service.js');


module.exports = function (app) {
  app.configure(users);
  app.configure(product);
  app.configure(bid);
  app.configure(auction);
  app.configure(users);
};
