const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const shortId = require('shortid');

const URLSchema = new Schema({
  originalURL: {
    type: String,
    required: true
  },
  _id: {
    type: String,
    required: true,
    default: shortId.generate
  },
})

module.exports = mongoose.model('URLModel', URLSchema);