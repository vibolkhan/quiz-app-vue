const question = require('./question-model')
const quiz = require('./quiz-model')
const user = require('./user-model')
const history = require('./history-model')

// question with quiz relationship
quiz.hasMany(question)
question.belongsTo(quiz, {
    foreignKey: {
        allowNull: false,
        name: 'quizId',
        model: 'quiz',
        onDelete: 'cascade'
    }
})

// user with quiz relationship
user.hasMany(quiz)
quiz.belongsTo(user, {
    foreignKey: {
        allowNull: false,
        name: 'userId',
        model: 'user',
        onDelete: 'cascade'
    }
})

// history with quiz relationship
quiz.hasMany(history)

history.belongsTo(quiz, {
    foreignKey: {
        allowNull: false,
        name: 'quizId',
        model: 'quiz',
        onDelete: 'cascade'
    }
})

history.sync()
user.sync()
quiz.sync()
question.sync()

module.exports = {user, quiz, question, history}
