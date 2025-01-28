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
    static associate(models) {
      // define association here
    }
  }
  customer.init({      id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4
  },
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'customer',
  });
  return customer;
};