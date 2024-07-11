"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Borrow extends Model {
    static associate(models) {
      Borrow.belongsTo(models.Member);
      Borrow.belongsTo(models.Book);
    }
  }
  Borrow.init(
    {
      memberCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      borrowDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      returnDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isReturn: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Borrow",
    }
  );
  return Borrow;
};
