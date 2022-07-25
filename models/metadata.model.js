const mongoose = require("mongoose")
const Schema = mongoose.Schema

const metadataSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Metadata", metadataSchema)