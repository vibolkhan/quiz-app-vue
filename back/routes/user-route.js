const express = require('express')
const router = express.Router()
const userTable = require('../models/associations').user
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const vertifyToken = require('./auth')

// create user
router.post("/", async (req, res) => {
  await userTable.create(req.body)
  res.send('data posted')
})
  
// get user
router.get("/", vertifyToken, async (req, res) => {
  const alldata = await userTable.findAll({
    attributes: {
      exclude: ['password']
    }
  })
  res.json(alldata)
})

// login
router.post( '/login', async (req, res) => {
    // check if user exists by email
    const user = await userTable.findAll({
      where: {
        email: req.body.email
      }
    })
    if (user.length > 0) {
      if (await verifyPassword(req.body.password,user)) {
        const token = jwt.sign({
          data: 'foobar'
        }, 'secret', { expiresIn: '3h' });

        const loginView = {
          user,
          token
        }
        res.send(loginView)
      } else {
        res.send("error", 401)
      }
    } else {
      res.send("error", 401)
    }
})

async function verifyPassword(password, user) {
  if (user.length > 0) {
    return await bcrypt.compare(password, user[0].dataValues.password)
  }
}

// delete user
router.delete("/:id", vertifyToken, (req, res) => {
  userTable.destroy({
    where: {
      id: req.params.id,
    },
  })
  res.send("deleted")
})

module.exports = router