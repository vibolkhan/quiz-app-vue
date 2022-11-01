const Sequelize = require("sequelize")

const question_table = require('../config/database').define(
    "question",
    {
      question: Sequelize.STRING,
      answer: Sequelize.JSON,
      quiz_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'quiz',
          key: 'id',
        },
      }
    },
    { tableName: "question" }
  )
question_table.sync()

module.exports = question_table
