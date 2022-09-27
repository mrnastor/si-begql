const ObjectId = require('mongodb').ObjectId;
const mongoose = require("mongoose")
const _ = require('lodash');

const User = require("../../models/user.model")
const EmployeeSkill = require("../../models/employeeSkill.model")
const Metadata = require("../../models/metadata.model")
const Employee = require("../../models/employee.model")
const ManagerResolver = require("../resolvers/manager.resolver");
const MetadataResolver = require("../resolvers/metadata.resolver");
const UserResolver = require("../resolvers/user.resolver");
const SkillsResolver = require("../resolvers/employeeSkill.resolver");
const metadataResolver = require('../resolvers/metadata.resolver');
const JWTHelper = require('../../helper/jwt.helper');
const { filter } = require('lodash');

function buildEmployeeObject(user, employee, manager, capability, primary, secondary, skills) {
    return {
        _id: employee.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userId: user._id,
        capability: capability || null,
        capabilityId: capability ? capability._id : null,
        manager: {
            _id: employee.managerId,
            firstName: manager.firstName,
            lastName: manager.lastName,
            email: manager.email,
            userId: manager.userId
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

    employeeByUserId: async (args) => {
        try {
            const employeeFound = (await Employee.find()).find(o => o.userId === args.id);
            console.log(employeeFound)
            const userPerEmployee = await UserResolver.userById({ userId: args.id });
            const capabilityPerEmployee = await MetadataResolver.capabilityById({ id: employeeFound.capabilityId });
            const managerPerEmployee = await ManagerResolver.managerById({ managerId: employeeFound.managerId });
            const skills = await SkillsResolver.skillsPerEmployee({ employeeId: args.id });
            const primarySkill = await MetadataResolver.metadataById({ id: employeeFound.primarySkillId });
            const secondarySkill = await metadataResolver.metadataById({ id: employeeFound.secondarySkillId });
            return buildEmployeeObject(userPerEmployee, employeeFound, managerPerEmployee, capabilityPerEmployee, primarySkill, secondarySkill, skills);
        } catch (error) {
            throw error
        }
    },

    employeesPerManager: async (args) => {
        try {
            const employeesFetched = await Employee.find({ managerId: args.managerId });
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

    employees: async (args, header, context) => {
        // JWTHelper.globalTokenCheck(header.get('authorization'));
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
            } = args
            const user = new User({
                firstName,
                lastName,
                email,
                password,
                isAdmin: false
            })
            let checkUser = await User.find({ email: email });
            if (checkUser.length > 0) {
                throw new Error(`${email} is already exsiting`)
            }
            const newUser = await user.save()
            const newEmployee = await (new Employee({
                userId: newUser.id,
                capabilityId: capabilityId || null,
                managerId: managerId,
                primarySkillId: primarySkillId || null,
                secondarySkillId: secondarySkillId || null,
            })).save();
            return {
                ...newEmployee._doc,
                userId: newUser._doc._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            }
        } catch (error) {
            throw error
        }
    },

    tempSignUp: async args => {
        try {
            const {
                firstName,
                lastName,
                email,
                password,
                primarySkillId,
                secondarySkillId,
            } = args
            const user = new User({
                firstName,
                lastName,
                email,
                password,
                isAdmin: false,
            })
            let checkUser = await User.find({ email: email });
            if (checkUser.length > 0) {
                throw new Error(`${email} is already exsiting`)
            }
            let managerList = await ManagerResolver.managers();
            const newUser = await user.save()
            const newEmployee = await (new Employee({
                userId: newUser.id,
                managerId: managerList[0]._id,
                primarySkillId: primarySkillId || null,
                secondarySkillId: secondarySkillId || null,
            })).save();
            return {
                ...newEmployee._doc,
                userId: newUser._doc._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            }
        } catch (error) {
            throw error
        }
    },

    updateEmployee: async args => {
        const {
            user,
            employee,
        } = args;
        try {
            let userDoc = await User.findOneAndUpdate(
                { _id: user._id },
                user,
                { new: true }
            )
            let empDoc = await Employee.findOneAndUpdate(
                { _id: employee._id },
                employee,
                { new: true }
            )
            return {
                success: true,
                message: 'Updated.'
            };
        } catch (error) {
            if (error.kind === 'ObjectId') {
                throw new Error('User not found.')
            } else
                throw error.message
        }
    },

    employeeList: async (args) => {
        const {
            page = 0,
            itemsPerPage = 100,
            searchKeyword = '',
            managerId = '',
            capabilities = [],
            primarySkills = [],
            secondarySkills = [],
            skills = [],
            filterFields = [],
            skillRate = undefined,
            skillYearExperience = undefined
        } = args.options;
        try {
            // Query builder for EmployeeSkills that match in 'skills' field
            let empSkillsQuery = {
                metadataId: { $in: skills }
            };
            if (skillRate !== undefined) {
                empSkillsQuery['rate'] = { $eq: skillRate }
            }
            if (skillYearExperience !== undefined) {
                empSkillsQuery['yearsExperience'] = { $eq: skillYearExperience }
            }
            let empSkills = await EmployeeSkill
                .find(empSkillsQuery)
                .populate({ path: "metadataId", model: Metadata });

            // Query builder for Users that match filterFields (firstName, lastName and/or email)
            let userQuery = {};
            filterFields.forEach((field, index) => {
                userQuery[field] = new RegExp(searchKeyword, "i");
            })
            let users = await User.find(userQuery);
            // console.log(users.map(u => `${u.firstName} ${u.lastName} - ${u._id}`), userQuery)

            // Query builder for employees initialization
            let empQuery = {
                $and: [
                    { _id: { $ne: null } },
                ],
            };

            // Query builder for employees with specific skills if 'skills' field is populated
            if (skills.length > 0) {
                empQuery.$and.push({ _id: { $in: empSkills.map(s => (s.employeeId)) } })
            }

            // Query builder for employees with user fields if 'filterFields' field is populated
            if (filterFields.length > 0) {
                empQuery.$and.push({ userId: { $in: users.map(u => u._id) } })
            }

            //Query builder for employees that match the employee details from args
            if (managerId.length > 0) {
                empQuery.$and.push({ "managerId": managerId })
            }
            if (capabilities.length > 0) {
                empQuery.$and.push({ "capabilityId": { $in: capabilities } })
            }
            if (primarySkills.length > 0) {
                empQuery.$and.push({ "primarySkillId": { $in: primarySkills } })
            }
            if (secondarySkills.length > 0) {
                empQuery.$and.push({ "secondarySkillId": { $in: secondarySkills } })
            }
            const empFetched = await Employee.find(empQuery).populate({ path: "userId", model: User });
            // console.log(empFetched);
            // console.log(empFetched.map(u => `${u.userId.firstName} ${u.userId.lastName} - ${u.userId._id}`), empFetched.length)
            // console.log(empQuery)

            let emplist = empFetched.map(async employee => {
                const userPerEmployee = await UserResolver.userById({ userId: employee.userId });
                const capabilityPerEmployee = await MetadataResolver.capabilityById({ id: employee.capabilityId });
                const managerPerEmployee = await ManagerResolver.managerById({ managerId: employee.managerId });
                const skills = await SkillsResolver.skillsPerEmployee({ employeeId: employee._id });
                const primarySkill = await MetadataResolver.metadataById({ id: employee.primarySkillId });
                const secondarySkill = await metadataResolver.metadataById({ id: employee.secondarySkillId });
                return buildEmployeeObject(userPerEmployee, employee, managerPerEmployee, capabilityPerEmployee, primarySkill, secondarySkill, skills);
            })
            let totalPages = Math.ceil(emplist.length / itemsPerPage);
            if (totalPages > 0 && page >= totalPages) {
                throw new Error(`Acessing page (${page + 1}) more than total pages (${totalPages})`)
            } else
                return {
                    currentPage: page,
                    totalPages: totalPages,
                    totalItems: emplist.length,
                    paginatedList: emplist.splice(itemsPerPage * page, itemsPerPage)
                };
        }
        catch (e) {
            throw (e);
        }
    }
}