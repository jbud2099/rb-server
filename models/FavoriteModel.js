const db = require("../db");
const { DataTypes } = require("sequelize");

const Favorite = db.define("favorite", {
  // id: {
  //   type: DataTypes.UUID,
  //   primaryKey: true,
  //   defaultValue: DataTypes.UUIDV4,
  //   allowNull: false,
  // },
  game: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  yes: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  no: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Favorite;