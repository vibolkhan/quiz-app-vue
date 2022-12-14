const express = require('express')
const router = express.Router()
const quiz_table = require('../models/associations').quiz
const vertifyToken = require('./auth')
const { Op } = require("sequelize");

const multer = require("multer");


router.post("/", vertifyToken, async (req, res) => {
  try {
    let imagePath = 'jhh'
    
    const storage = multer.diskStorage({   
      destination: function(req, file, cb) { 
        cb(null, './uploads');    
      }, 
      filename: function (req, file, cb) { 
        const fileName = file.originalname.split('.')
        imagePath = fileName[0] + ' - SAM QUIZ - ' + Date.now() + '.' + fileName[1]
        cb(null , fileName[0] + ' - SAM QUIZ - ' + Date.now() + '.' + fileName[1]);   
      }
    });

    const upload = multer({ storage: storage }).single("profile");

    const ddata = req.body
    console.log(ddata);

    const data = await quiz_table.create(req.body)
    upload(req, res, (err) => {
      if(err) {
        res.status(400).send("Something went wrong!");
      }
    });
    res.send(data)
  } catch (err) {
    res.status(404).json({msg: "Cannot create data"})
  }
})
  
router.get("/", vertifyToken, async (req, res) => {
  try {
    const alldata = await quiz_table.findAll()
    res.json(alldata)
  } catch (err) {
    res.status(404).json({msg: "Cannot get data"})
  }
})

router.get("/myQuiz/:userId", vertifyToken, async (req, res) => {
  try {
    const alldata = await quiz_table.findAll({
      where: {userId: req.params.userId}
    })
    res.json(alldata)
  } catch (error) {
    res.status(404).json({msg: "Cannot get data"})
  }
})

router.put("/:id", vertifyToken, async(req, res) => {
  try {
    await quiz_table.update(req.body, {
      where: {id: req.params.id}
    });
    res.send('updated')
  } catch(err) {
    res.status(404).json({msg: "Cannot update data"})

  }
})
  
router.delete("/:id", vertifyToken, (req, res) => {
  try {
    quiz_table.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.send("deleted")
  } catch(err) {
    res.status(404).json({msg: "Cannot delete data"})
  }
})

module.exports = router