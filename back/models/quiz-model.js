const Sequelize = require("sequelize")

const quiz_table = require('../config/database').define(
    "quiz",
    {
      title: {
        type: Sequelize.STRING,
        // allowNull: false
      },
      profile: {
        type: Sequelize.BLOB("long"),
        // allowNull: false
      },
    },
    { tableName: "quiz" }
  )
  

quiz_table.sync()

module.exports = quiz_table