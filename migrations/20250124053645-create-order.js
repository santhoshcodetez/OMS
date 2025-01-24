'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4
      },
      orderDate: {
        type: Sequelize.INTEGER
      },
      totalAmount: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      discountApplied: {
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};