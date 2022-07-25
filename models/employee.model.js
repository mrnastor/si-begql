const mongoose = require("mongoose")
const Schema = mongoose.Schema

const employeeSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    managerId:{
      type: String,
      required: true,
    },
    metadataId:{
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Employee", employeeSchema)