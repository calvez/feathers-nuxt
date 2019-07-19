// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const {
  Op,
  literal
} = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const product = sequelizeClient.define('product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sku: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    long_description: DataTypes.STRING,
    brand: DataTypes.STRING,
    identifier: DataTypes.STRING,
    manufacturer: DataTypes.STRING,
    material: DataTypes.STRING,
    production_date: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    product_type: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    //auction_id        : DataTypes.INTEGER, // moved to Bid
    slug: DataTypes.STRING,
    seller_id: DataTypes.INTEGER,
    created: DataTypes.TIME,
    modified: DataTypes.TIME,
    status: DataTypes.INTEGER
  }, {
    tableName: 'sa_product',
    timestamps: false,
    underscored: true,
    // scopes: {
    //   live: function () {
    //     include: [
    //       {
    //         model: Sequelize.models.Bid,
    //         where:
    //         {
    //           id: {
    //             [Op.in]: literal('(SELECT MAX(id) FROM sa_bid GROUP BY product_id)')
    //           }
    //         },
    //       },
    //     ];
    //   }
    // },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  product.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return product;
};
