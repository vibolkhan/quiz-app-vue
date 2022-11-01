const express = require('express')
const router = express.Router()
const quiz_table = require('../models/quiz-model')
const vertifyToken = require('./auth')

// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' })


router.post("/", vertifyToken, async (req, res) => {
  await quiz_table.create(req.body)
  res.send("data posted")
})
  
router.get("/", vertifyToken, async (req, res) => {
  const alldata = await quiz_table.findAll()
  res.json(alldata)
})

router.put("/:id", vertifyToken, async(req, res) => {
  await quiz_table.update(req.body, {
    where: {id: req.params.id}
  });
  res.send('updated')
})
  
router.delete("/:id", vertifyToken, (req, res) => {
  quiz_table.destroy({
    where: {
      id: req.params.id,
    },
  })
  res.send("deleted")
})

module.exports = router