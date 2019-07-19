// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const moment = require('moment');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const bid = sequelizeClient.define('bid', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: DataTypes.INTEGER,
    auction_id: DataTypes.INTEGER, // moved from Products
    format_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    starting: DataTypes.STRING,
    finish: DataTypes.STRING,
    rolling_time: DataTypes.INTEGER,
    bet_time: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    min_price: DataTypes.DOUBLE,
    buyout_price: DataTypes.DOUBLE,
    bid_step: DataTypes.DOUBLE,
    winner_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    tableName: 'sa_bid',
    timestamps: false,
    scopes: {
      lastBid: function (value) {
        return {
          where: {
            product_id: {
              [Op.eq]: value
            }
          },
          order: [
            ['id', 'DESC']
          ],
          limit: 1
        };
      },
      last: function () {
        return {
          order: [
            ['id', 'DESC']
          ],
          //  limit: 1
        };
      },
      bets: function () {
        return {
          include: Sequelize.models.Bet
        };
      },
      active: function () {
        return {
          include: {
            model: Sequelize.models.Auction,
            where: {
              status: 'active',
            }
          },
        };
      },
      live: function () {
        return {
          where: {
            finish: {
              [Op.gte]: moment().format('YYYY-MM-DD HH:mm:ss'),
            }
          }
        };
      },
      expired: function () {
        return {
          where: {
            finish: {
              [Op.lt]: moment().format('YYYY-MM-DD HH:mm:ss'),
            }
          }
        };
      }
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  bid.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return bid;
};
