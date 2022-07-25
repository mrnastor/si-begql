const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');

const Metadata = require("../../models/metadata.model")
const EmployeeSkill = require("../../models/employeeSkill.model")

const MetadataResolver = require("../resolvers/metadata.resolver");

function skillBuilder(skill, metadata) {
    return {
        name: metadata.name,
        description: metadata.description,
        rate: skill.rate,
        yearsExperience: skill.yearsExperience,
        skillId: metadata._id,
        _id: skill._id
    }
}


module.exports = {
    employeeSkills: async () => {
        try {
            const employeeSkillsFetched = await EmployeeSkill.find();
            const metadataFetched = await Metadata.find();
            return employeeSkillsFetched.map(obj => {
                const skill = _.find(metadataFetched, o => o._id == obj.userId);
                return {
                    ...skill._doc,
                    createdAt: new Date(obj._doc.createdAt).toISOString(),
                }
            })
        } catch (error) {
            throw error
        }
    },

    skillsPerEmployee: async args => {
        try {
            let empSkills = [].concat(_.find(await EmployeeSkill.find(), o => args.employeeId==o.employeeId));
            if(empSkills != undefined){
                let skills = empSkills.map(async o=>{
                    if(o != undefined){
                        let metadata = await MetadataResolver.metadataById({ id: o.metadataId });
                        return skillBuilder(o,metadata);
                    } else {
                        return {}
                    }
                })
                return skills;
            } else {
                return []
            }
        } catch (error) {
            throw error;
        }
    },

    skillById: async args => {
        try {
            let skill = _.find(await EmployeeSkill.find(), o => o._id.equals(new ObjectId(args.employeeSkillId)));
            if (skill != undefined) {
                let metadataSkill = MetadataResolver.metadataById({ id: skill.metadataId });
                return skillBuilder(skill, metadataSkill);
            } else {
                return {};
            }
        } catch (error) {
            throw error;
        }
    },

    addEmployeeSkills: async args => {
        try {
            const {
                skillId,
                employeeId,
                rate,
                yearsExperience
            } = args;
            const empSkill = new EmployeeSkill({
                metadataId: skillId,
                employeeId: employeeId,
                rate: rate,
                yearsExperience: yearsExperience
            })
            const newEmployeeSkill = await empSkill.save();
            return { ...newEmployeeSkill._doc }
        } catch (error) {
            throw error;
        }
    }

}