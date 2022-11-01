const Sequelize = require("sequelize")

const sequelize = new Sequelize("quiz_app", "root", "1234", {
    dialect: "mariadb",
  })
  
  sequelize
    .authenticate()
    .then(() => {
      console.log("connection made successfully")
    })
    .catch((err) => console.log(err, "this has a error"))

    module.exports = sequelize