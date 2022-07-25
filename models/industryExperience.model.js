const mongoose = require("mongoose")
const Schema = mongoose.Schema

const industryExperienceSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    metadataId:{
      type: String,
      required: true,
    },
    yearsExperience:{
      type: Int,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("IndustryExperience", industryExperienceSchema)