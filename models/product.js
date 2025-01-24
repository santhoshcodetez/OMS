'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
      // Define the association between product and orderDetails
      product.hasMany(models.orderDetail, {
        foreignKey: 'productId',  // The key in the orderDetail table that references the product
        as: 'orderDetails'        // Alias for the association (used in eager loading)
      });
    }
  }

  product.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'product',
  });

  return product;
};
