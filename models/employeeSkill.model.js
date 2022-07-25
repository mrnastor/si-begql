const mongoose = require("mongoose")
const Schema = mongoose.Schema

const employeeSkillSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    metadataId:{
      type: String,
      required: true,
    },
    rate:{
      type: Int,
      required: true,
    },
    yearsExperience:{
      type: Int,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("EmployeeSkill", employeeSkillSchema)