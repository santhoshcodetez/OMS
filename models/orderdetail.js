'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderDetail extends Model {
    static associate(models) {
      // Define the association between orderDetail and order
      orderDetail.belongsTo(models.order, {
        foreignKey: 'orderId', // Foreign key for the order
        as: 'orderhere'        // Alias for the association (used in eager loading)
      });
      // Define the association between orderDetail and product
      orderDetail.belongsTo(models.product, {
        foreignKey: 'productId', // Foreign key for the product
        as: 'producthere'        // Alias for the association (used in eager loading)
      });
    }
  }

  orderDetail.init({id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4
  },
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    productId: DataTypes.INTEGER, // Foreign key for product
    orderId: DataTypes.INTEGER    // Foreign key for order
  }, {
    sequelize,
    modelName: 'orderDetail',
  });

  return orderDetail;
};
