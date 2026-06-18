const mongoose = require("mongoose")

const catSchema = new mongoose.Schema({
  name: String,
  breed: String,
  image: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true })

module.exports = mongoose.model("Cat", catSchema)