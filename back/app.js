const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
app.use(cors('*')); // To allow any origin
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/uploads', express.static('uploads'));

app.use('/user', require('./routes/user-route'))
app.use('/quiz', require('./routes/quiz-route'))
app.use('/question', require('./routes/question-route'))
app.use('/history', require('./routes/history-route'))

app.use('/image', require('./routes/image-route'))

app.listen(port, () => {
  console.log(`server starts at http://localhost:${port}`);
});

