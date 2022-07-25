const mongoose = require("mongoose")
const Schema = mongoose.Schema

const industryExperienceSchema = new Schema(
  {
    employeeId: {
      type: String,
      required: true,
    },
    metadataId:{
      type: String,
      required: true,
    },
    yearsExperience:{
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("IndustryExperience", industryExperienceSchema)