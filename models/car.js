"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Car.belongsTo(models.Manufacture, { foreignKey: "manufacture_id" });
      Car.belongsTo(models.Type, { foreignKey: "type_id" });
      Car.belongsTo(models.Transmission, { foreignKey: "transmission_id" });
    }
  }
  Car.init(
    {
      model: DataTypes.STRING,
      plate: DataTypes.STRING,
      image: DataTypes.STRING,
      rentPerDay: DataTypes.INTEGER,
      description: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      availableAt: DataTypes.DATE,
      available: DataTypes.BOOLEAN,
      year: DataTypes.STRING,
      options: DataTypes.ARRAY(DataTypes.STRING),
      specs: DataTypes.ARRAY(DataTypes.STRING),
      manufacture_id: DataTypes.INTEGER,
      type_id: DataTypes.INTEGER,
      transmission_id: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
      deletedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Car",
      paranoid: true,
    }
  );
  return Car;
};
