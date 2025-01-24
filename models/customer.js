'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    static associate(models) {
      // Define the association between customer and order
      customer.hasMany(models.order, {
        foreignKey: 'customerId', // The key in the order table that references the customer
        as: 'orderhere'           // Alias for the association (used in eager loading)
      });
    }
  }

  customer.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'customer',
  });

  return customer;
};
