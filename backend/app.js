const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config');
const app = express();

app.use(express.json());
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

app.get('/', (req, res) => {
  res.status(200).json({message: "URL shortener service"});
});

app.use((req, res, next) => {
  res.status(404).json({message: 'This route does not exist'});
})

app.listen(config.server.PORT || 3000, () => console.log(`listening on port: ${config.server.PORT}`));