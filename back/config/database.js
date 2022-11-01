const Sequelize = require("sequelize")
require("dotenv").config();

const sequelize = new Sequelize("quiz_app", process.env.USER, process.env.PASSWORD, {
    dialect: process.env.DIALECT,
  })
  
  sequelize
    .authenticate()
    .then(() => {
      console.log("connection made successfully")
    })
    .catch((err) => console.log(err, "this has a error"))

    module.exports = sequelize