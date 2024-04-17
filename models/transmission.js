"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transmission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transmission.hasMany(models.Car, { foreignKey: "transmission_id" });
    }
  }
  Transmission.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transmission",
      paranoid: true,
    }
  );
  return Transmission;
};
