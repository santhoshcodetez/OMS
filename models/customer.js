'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   // In customer model
static associate(models) {
  customer.hasMany(models.order, {
    foreignKey: "customerId",  // Make sure this matches the column in the orders table
    as: "orderhere"
  });
}

  }
  customer.init({
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'customer',
  });
  return customer;
};