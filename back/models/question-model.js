const Sequelize = require("sequelize")

const question_table = require('../config/database').define(
    "question",
    {
      question: Sequelize.STRING,
      answer: Sequelize.JSON,
      image: Sequelize.STRING
    },
    { tableName: "question" }
  )

module.exports = question_table