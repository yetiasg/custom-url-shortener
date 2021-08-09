const createError = require('http-errors');
const URL = require('./URLModel');

exports.shorten = async(req, res, next) => {
  res.status(200).json({message: "short route"});
}