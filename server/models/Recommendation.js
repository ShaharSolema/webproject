const mongoose = require("mongoose");
const validator = require("validator");
const { recompileSchema } = require("./Product");
const Schema = mongoose.Schema;

const recommendationSchema = new mongoose.Schema({
  ImageUrl:string});

  const Recommandation = mongoose.model("Recommandation", recommendationSchema);
module.exports = Recommandation;