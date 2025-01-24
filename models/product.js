'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product.hasMany(models.orderDetail, {
        foreignKey: "productId",
        as: "orderDetails"
    });
    }
  }
  product.init({
    productName: DataTypes.STRING,
    productPrice: DataTypes.INTEGER,
    productCompany: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};