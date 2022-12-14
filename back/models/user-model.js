const Sequelize = require("sequelize")
const bcrypt = require('bcryptjs');

const user = require('../config/database').define(
    "user",
    {
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
    },
    { tableName: "user" }
  )
  
user.beforeCreate((user, options) => {
  return bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash;
    })
    .catch(err => {
      throw new Error(); 
    });
});

module.exports = user