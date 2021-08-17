const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config');
const app = express();

app.use(express.json());
// app.use(express.urlencoded({extends: true}));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

const shortenerRouter = require('./router');
app.use(shortenerRouter);

app.use((req, res, next) => {
  res.status(404).json({message: 'This route does not exist'});
})

mongoose
  .connect(`${config.database.MONGO_URL}/${config.database.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.listen(config.server.PORT || 3000, () => console.log(`listening on port: ${config.server.PORT}`));
  })
  .catch(err => console.log(err));
