const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Location model
class Trails extends Model {}

// create fields/columns for Location model
Trails.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    location_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'trails'
  }
);

module.exports = Trails;