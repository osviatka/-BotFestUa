'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    city: DataTypes.STRING,
    type: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    classMethods: {
      associate(models) {
        Event.hasMany(models.Order);
      }
    }
  });
  return Event;
};
