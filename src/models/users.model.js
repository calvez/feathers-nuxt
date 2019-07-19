// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;


module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    website_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    increment_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    created_at: DataTypes.TIME,
    updated_at: DataTypes.TIME,
    is_active: DataTypes.INTEGER,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    bidder_name: DataTypes.STRING,
  }, {
    tableName: 'sa_users',
    timestamps: false,
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });


  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/

  };

  return users;
};
