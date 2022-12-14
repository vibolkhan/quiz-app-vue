const Sequelize = require("sequelize")

const historyTable = require('../config/database').define(
    "history",
    {
      answers: Sequelize.JSON,
      score: Sequelize.INTEGER
    },
    { tableName: "history" }
  )

module.exports = historyTable
