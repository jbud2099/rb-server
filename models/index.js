const db = require('../db');

let User = require('./UserModel');
let Review = require('./ReviewModel');
let Favorite = require('./FavoriteModel');
module.exports = {
  dbConnection: db,
  models: {
    User,
    Review,
    Favorite
  }
  };

User.hasMany(Review, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

User.hasMany(Favorite, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Favorite.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

// Review.hasMany(Favorite);
// Favorite.belongsTo(Review);


