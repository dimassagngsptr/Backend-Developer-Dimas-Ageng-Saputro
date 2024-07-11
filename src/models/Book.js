"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      // define association here
      Book.hasMany(models.Borrow);
    }
  }
  Book.init(
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock: {
        defaultValue: 1,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
