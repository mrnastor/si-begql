const mongoose = require("mongoose")
const Schema = mongoose.Schema

const managerSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Manager", managerSchema)