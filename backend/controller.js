const createError = require('http-errors');
const URLModel = require('./URLModel');
const config = require('./config.js')

exports.shorten = async(req, res, next) => {
  try{
    const originalUrl = req.body.originalUrl;
    console.log(req.body)
    const url = new URLModel({
      originalURL: originalUrl
    });
    const result = await url.save();
    res.status(200).json({ newUrl: `${config.server.BASE_URL}/#${result._id}`});
  }catch (error){
    next(error);
  }
}

exports.returnOriginalUrl = async(req, res, next) => {
  try{ 
    const newUrl = new URL(req.body.newUrl)
    const _id = newUrl.hash.slice(1)
    const {originalURL} = await URLModel.findOne({_id});
    res.status(200).json({ originalURL });
  }catch (error){
    next(error);
  }
}