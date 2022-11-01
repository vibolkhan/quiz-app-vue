const express = require('express')
const router = express.Router()
const historyTable = require('../models/history-model')
const vertifyToken = require('./auth')

router.get("/", vertifyToken, async (req, res) => {
    const alldata = await historyTable.findAll()
    res.json(alldata)
})

router.post("/", vertifyToken, async (req, res) => {
  historyTable.create(req.body)
  res.send("data posted ")
})

router.delete("/:id", vertifyToken, async (req, res) => {
  historyTable.destroy({
    where: {
      id: req.params.id,
    },
  })
  res.send("deleted")
})

router.put("/:id", vertifyToken, async (req, res) => {
  historyTable.update(req.body, {
    where: {id: req.params.id}
  });
  res.send('updated')
})

router.get("/:id", vertifyToken, async (req, res) => {
  const alldata = await historyTable.findAll({
    where: {quiz_id: req.params.id}
  })
  res.json(alldata)
})

module.exports = router

