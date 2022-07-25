const Metadata = require("../../models/metadata.model")
const IndustryExperience = require("../../models/industryExperience.model")
const _ = require('lodash');

module.exports = {
    industryExperiences: async () => {
        try {
            const industryExperiencesFetched = await IndustryExperience.find();
            const metadataFetched = await Metadata.find();
            return industryExperiencesFetched.map(obj => {
                const industry = _.find(metadataFetched, o=>o._id==obj.userId);
                return {
                    ...industry._doc,
                    createdAt: new Date(obj._doc.createdAt).toISOString(),
                }
            })
        } catch (error) {
            throw error
        }
    },
}