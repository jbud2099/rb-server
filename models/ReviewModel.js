const db = require("../db");
const { DataTypes } = require("sequelize");

const Review = db.define("review", {
  // id: {
  //   type: DataTypes.UUID,
  //   primaryKey: true,
  //   defaultValue: DataTypes.UUIDV4,
  //   allowNull: false,
  // },
  review: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  played: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Review