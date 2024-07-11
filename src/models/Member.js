"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      // define association here
      Member.hasMany(models.Borrow);
    }
  }
  Member.init(
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      penaltyDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isPenalty: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Member",
    }
  );
  return Member;
};
