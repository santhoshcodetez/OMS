'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // In orderDetail model
static associate(models) {
  orderDetail.belongsTo(models.order, {
    foreignKey: "orderId",  // Ensure this matches the column name in orderDetails table
    as: "orderhere"
  });

  orderDetail.belongsTo(models.product, {
    foreignKey: "productId",
    as: "producthere"
  });
}

  
  }
  orderDetail.init({
    quantity: DataTypes.INTEGER,
    productId: DataTypes.UUID,
    customerId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'orderDetail',
  });
  return orderDetail;
};