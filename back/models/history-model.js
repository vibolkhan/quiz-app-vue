const Sequelize = require("sequelize")

const history_table = require('../config/database').define(
    "history",
    {
      answers: Sequelize.JSON,
      quiz_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'quiz',
          key: 'id',
        },
      },
      score: Sequelize.INTEGER
    },
    { tableName: "history" }
  )

history_table.sync()

module.exports = history_table
