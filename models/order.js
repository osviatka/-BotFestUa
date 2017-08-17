'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    eventId: DataTypes.INTEGER,
    telegramId: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        Order.belongsTo(models.Event);
      }
    }
  });
  return Order;
};

