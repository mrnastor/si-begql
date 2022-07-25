const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');

const User = require("../../models/user.model")
const Employee = require("../../models/employee.model")
const ManagerResolver = require("../resolvers/manager.resolver");
const MetadataResolver = require("../resolvers/metadata.resolver");
const UserResolver = require("../resolvers/user.resolver");
const SkillsResolver = require("../resolvers/employeeSkill.resolver");
const metadataResolver = require('../resolvers/metadata.resolver');

function buildEmployeeObject(user, employee, manager, capability, primary, secondary, skills) {
    console.log(primary || null, secondary, skills)
    return {
        _id: employee.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        capability: {
            _id: capability._id,
            name: capability.name,
            description: capability.description
        },
        manager: {
            _id: employee.managerId,
            firstName: manager.firstName,
            lastName: manager.lastName,
            email: manager.email,
        },
        primarySkill: primary || null,
        secondarySkill: secondary || null,
        skills: skills || null,
        createdAt: new Date(employee._doc.createdAt).toISOString(),
    }
}

module.exports = {
    elist: async () => {
        return await Employee.find();
    },

    employeeById: async (args) => {
        try {
            const employeeFound = (await Employee.find()).find(o => o._id.equals(new ObjectId(args.employeeId)));
            const userPerEmployee = await UserResolver.userById({ userId: employeeFound.userId });
            const capabilityPerEmployee = await MetadataResolver.capabilityById({ id: employeeFound.capabilityId });
            const managerPerEmployee = await ManagerResolver.managerById({ managerId: employeeFound.managerId });
            const skills = await SkillsResolver.skillsPerEmployee({ employeeId: args.employeeId });
            const primarySkill = await MetadataResolver.metadataById({ id: employeeFound.primarySkillId });
            const secondarySkill = await metadataResolver.metadataById({ id: employeeFound.secondarySkillId });
            return buildEmployeeObject(userPerEmployee, employeeFound, managerPerEmployee, capabilityPerEmployee, primarySkill, secondarySkill, skills);
        } catch (error) {
            throw error
        }
    },

    employeesPerManager: async (args) => {
        try {
            const employeesFetched = _.find(await Employee.find(), o => o.managerId === args.managerId);
            return employeesFetched.map(async employee => {
                const userPerEmployee = await UserResolver.userById({ userId: employee.userId });
                const capabilityPerEmployee = await MetadataResolver.capabilityById({ id: employee.capabilityId });
                const managerPerEmployee = await ManagerResolver.managerById({ managerId: employee.managerId });
                const skills = await SkillsResolver.skillsPerEmployee({ employeeId: employee._id });
                const primarySkill = await MetadataResolver.metadataById({ id: employee.primarySkillId });
                const secondarySkill = await metadataResolver.metadataById({ id: employee.secondarySkillId });
                return buildEmployeeObject(userPerEmployee, employee, managerPerEmployee, capabilityPerEmployee, primarySkill, secondarySkill, skills);
            })
        } catch (error) {
            throw error
        }
    },

    employees: async () => {
        try {
            const employeesFetched = await Employee.find();
            return employeesFetched.map(async employee => {
                const userPerEmployee = await UserResolver.userById({ userId: employee.userId });
                const capabilityPerEmployee = await MetadataResolver.capabilityById({ id: employee.capabilityId });
                const managerPerEmployee = await ManagerResolver.managerById({ managerId: employee.managerId });
                const skills = await SkillsResolver.skillsPerEmployee({ employeeId: employee._id });
                const primarySkill = await MetadataResolver.metadataById({ id: employee.primarySkillId });
                const secondarySkill = await metadataResolver.metadataById({ id: employee.secondarySkillId });
                return buildEmployeeObject(userPerEmployee, employee, managerPerEmployee, capabilityPerEmployee, primarySkill, secondarySkill, skills);
            })
        } catch (error) {
            throw error
        }
    },

    setPrimarySkill: async args => {
        try {
            const {
                skillId,
                employeeId
            } = args;
            const newEmployee = Employee.findOneAndUpdate(
                { "_id": employeeId },
                { "$set": { primarySkillId: skillId } },
                { "new": true }
            ).exec();
            return {
                status: true,
                description: "Success"
            }

        } catch (error) {
            return {
                status: false,
                description: "Failed"
            }
        }
    },

    setSecondarySkill: async args => {
        try {
            const {
                skillId,
                employeeId
            } = args;
            const newEmployee = Employee.findOneAndUpdate(
                { "_id": employeeId },
                { "$set": { secondarySkillId: skillId } },
                { "new": true }
            ).exec();
            return {
                status: true,
                description: "Success"
            }

        } catch (error) {
            return {
                status: false,
                description: "Failed"
            }
        }
    },

    addEmployee: async args => {
        try {
            const {
                firstName,
                lastName,
                email,
                password,
                managerId,
                capabilityId,
                primarySkillId,
                secondarySkillId,
            } = args.employee
            const user = new User({
                firstName,
                lastName,
                email,
                password
            })
            const newUser = await user.save()
            const newEmployee = await (new Employee({
                userId: newUser.id,
                capabilityId: capabilityId,
                managerId: managerId,
                primarySkillId: primarySkillId || null,
                secondarySkillId: secondarySkillId || null,
            })).save();
            return { ...newEmployee._doc, _id: newUser.id }
        } catch (error) {
            throw error
        }
    },
}