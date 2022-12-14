const express = require('express')
const router = express.Router()

const multer = require("multer");
let newFile = ''
const storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
    cb(null, './uploads');    
  }, 
  filename: function (req, file, cb) { 
    const fileName = file.originalname.split('.')
    const newName = fileName[0] + ' - SAM QUIZ - ' + Date.now() + '.' + fileName[1]
    newFile = newName
    cb(null , newName);
  }
});


const upload = multer({ storage: storage }).single("profile");

router.post("/", (req, res) => {
  upload(req, res, (err) => {
    if(err) {
      res.status(400).send("Something went wrong!");
    }
    res.send(newFile);
  });
});

module.exports = router
