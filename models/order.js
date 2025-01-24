'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   // In order model
static associate(models) {
  order.hasMany(models.orderDetail, {
    foreignKey: "orderId",  // Ensure this matches the column in the orderDetails table
    as: "orderDetails"
  });
}

  }
  order.init({
    orderDate: DataTypes.INTEGER,
    totalAmount: DataTypes.INTEGER,
    status: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    discountApplied: DataTypes.INTEGER,
    customerId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};