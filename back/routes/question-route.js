const express = require("express")
const router = express.Router()
const questionTable = require("../models/associations").question
const vertifyToken = require("./auth")

router.get("/", vertifyToken, async (req, res) => {
  const alldata = await questionTable.findAll()
  res.json(alldata)
})

router.post("/", vertifyToken, async (req, res) => {
  questionTable.create(req.body)
  res.send("data posted")
})

router.delete("/:id", vertifyToken, async (req, res) => {
  questionTable.destroy({
    where: {
      id: req.params.id,
    },
  })
  res.send("deleted")
})

router.put("/:id", async (req, res) => {
  questionTable.update(req.body, {
    where: { id: req.params.id },
  })
  res.send("updated")
})

router.get("/:id", async (req, res) => {
  const alldata = await questionTable.findAll({
    where: { quizId: req.params.id },
  })
  res.json(alldata)
})

module.exports = router
