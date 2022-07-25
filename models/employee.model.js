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
    capabilityId:{
      type: String,
      required: true,
    },
    primarySkillId:{
      type: String,
      required: false,
    },
    secondarySkillId:{
      type: String,
      required: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Employee", employeeSchema)