const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');

const User = require("../../models/user.model")
const Employee = require("../../models/employee.model")
const Metadata = require("../../models/metadata.model")
const EmployeeSkill = require("../../models/employeeSkill.model")

const MetadataResolver = require("../resolvers/metadata.resolver");

function skillBuilder(skill, metadata, empId) {
    // return {
    //     name: metadata.name,
    //     description: metadata.description,
    //     rate: skill.rate,
    //     yearsExperience: skill.yearsExperience,
    //     skillId: metadata._id,
    //     _id: skill._id
    // }
    return {
        rate: skill.rate,
        yearsExperience: skill.yearsExperience,
        _id: skill._id,
        skill: metadata,
        employeeId: empId
    }
}

module.exports = {
    employeeSkills: async () => {
        try {
            const employeeSkillsFetched = await EmployeeSkill.find();
            const metadataFetched = await Metadata.find();
            return employeeSkillsFetched.map(async obj => {
                console.log(obj);
                const metadata = await MetadataResolver.metadataById({ id: obj.skillId });
                const emp = await Employee.findOne({ _id: obj.employeeId });
                return skillBuilder(obj, metadata, emp._id)
            })
        } catch (error) {
            throw error
        }
    },

    skillsPerEmployee: async args => {
        try {
            let empSkills = await EmployeeSkill.find({ employeeId: args.employeeId });
            if (empSkills != undefined) {
                let skills = empSkills.map(async eskill => {
                    if (eskill != undefined) {
                        const metadata = await MetadataResolver.metadataById({ id: eskill.metadataId });
                        const emp = await Employee.findOne({ _id: eskill.employeeId });
                        return skillBuilder(eskill, metadata, emp._id);
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
            if (!skillId.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error(`Skill: ${skillId} does not exist.`)
            }
            if (!employeeId.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error(`Employee: ${employeeId} does not exist.`)
            }
            const skillsOfEmployee = await EmployeeSkill.find({ employeeId: employeeId, metadataId: skillId });
            const metadataSkill = await Metadata.findOne({ _id: skillId });
            const emp = await Employee.findOne({ _id: employeeId });

            if (metadataSkill === null) {
                throw new Error(`Skill: ${skillId} does not exist.`)
            }
            if (emp === null) {
                throw new Error(`Employee: ${employeeId} does not exist.`)
            }

            const user = await User.findOne({ _id: emp.userId });

            if (skillsOfEmployee.length === 0) {
                const newEmployeeSkill = await empSkill.save();
                return { ...newEmployeeSkill._doc, skill: metadataSkill }
            } else {
                throw new Error(`${metadataSkill.name} is already listed as a skill under ${user.firstName} ${user.lastName}`)
            }
        } catch (error) {
            throw error;
        }
    },

    deleteEmployeeSkill: async args => {
        try {
            const {
                id
            } = args
            const temp = _.find(await EmployeeSkill.find(), o => o._id.equals(new ObjectId(args.id)));
            await EmployeeSkill.deleteOne({ _id: id });
            return {
                message: `Successfully deleted.`,
                success: true
            }
        } catch (error) {
            throw error
        }
    },

}