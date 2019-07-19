// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const auction = sequelizeClient.define('auction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    start: DataTypes.STRING,
    status: DataTypes.INTEGER,
  }, {
    tableName: 'sa_auction',
    timestamps: false,
    // scopes: {
    //   active: {
    //     status: {
    //       [Op.eq]: 'active'
    //     },
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
  auction.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return auction;
};
