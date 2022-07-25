const mongoose = require("mongoose")
const Schema = mongoose.Schema

const employeeSkillSchema = new Schema(
  {
    employeeId: {
      type: String,
      required: true,
    },
    metadataId:{
      type: String,
      required: true,
    },
    rate:{
      type: Number,
      required: true,
    },
    yearsExperience:{
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("EmployeeSkill", employeeSkillSchema)