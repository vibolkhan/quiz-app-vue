const Sequelize = require("sequelize")

const quiz_table = require('../config/database').define(
    "quiz",
    {
      title: {
        type: Sequelize.STRING,
        // allowNull: false
      },
      profile: {
        type: Sequelize.STRING,
        // allowNull: false
      },
    },
    { tableName: "quiz" }
  )


module.exports = quiz_table