'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    static associate(models) {
      // Define the association between order and orderDetails
      order.hasMany(models.orderDetail, {
        foreignKey: 'orderId', // Foreign key in the orderDetail table
        as: 'orderDetails'     // Alias for the association
      });
    }
  }

  order.init({id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4
  },
    orderDate: DataTypes.DATE,
    totalAmount: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'order',
  });

  return order;
};
