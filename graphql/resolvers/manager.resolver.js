const ObjectId = require('mongodb').ObjectId;

const User = require("../../models/user.model")
const Manager = require("../../models/manager.model")
const Employee = require("../../models/employee.model")
const _ = require('lodash');
const { EmployeeSkillType } = require('../schema/master.schema');

function buildManagerObject(user, manager) {
    return {
        _id: manager._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userId: user._id,
        createdAt: new Date(manager._doc.createdAt).toISOString(),
    }
}

module.exports = {
    managerById: async (args) => {
        try {
            const managerFetched = _.find(await Manager.find(), manager => manager._id.equals(new ObjectId(args.managerId)))
            const userFetched = _.find(await User.find(), user => user._id.equals(new ObjectId(managerFetched.userId)))
            return buildManagerObject(userFetched, managerFetched);
        } catch (error) {
            throw error
        }
    },

    managers: async () => {
        try {
            const usersFetched = await User.find();
            const managersFetched = await Manager.find();
            return managersFetched.map(manager => {
                const userPerManager = _.find(usersFetched, userItem => userItem._id == manager.userId);
                return {
                    ...manager._doc,
                    _id: manager.id,
                    firstName: userPerManager.firstName,
                    lastName: userPerManager.lastName,
                    email: userPerManager.email,
                    createdAt: new Date(manager._doc.createdAt).toISOString(),
                    userId: userPerManager._id,
                }
            })
        } catch (error) {
            throw error
        }
    },

    addManager: async args => {
        try {
            const {
                firstName,
                lastName,
                email,
                password
            } = args.manager
            const user = new User({
                firstName,
                lastName,
                email,
                password,
                isAdmin: false,
            })

            let checkUser = await User.find({email:email});
            if(checkUser.length>0){
                throw new Error(`${email} is already exsiting`)
            }

            const newUser = await user.save()
            const newManager = await (new Manager({
                userId: newUser.id
            })).save();
            return { ...newManager._doc, _id: newManager.id }
        } catch (error) {
            throw error
        }
    },

    deleteManager: async args => {
        try {
            console.log(args);
            let employeeList = await Employee.find({ managerId: args.id });
            if (employeeList.length > 0) {
                return {
                    success: false,
                    message: `Re-assign all (${employeeList.length}) employees first before removing.`
                }
            } else {
                let managerToDelete = await Manager.findOne({ _id: args.id });
                if (!Boolean(managerToDelete)) {
                    return {
                        success: false,
                        message: `Cannot find Manager`
                    }
                }
                let userToDelete = await User.findOne({ _id: managerToDelete.userId });
                if (!Boolean(userToDelete)) {
                    return {
                        success: false,
                        message: `Cannot find User. Contact Admin for resolve.`
                    }
                }
                await Manager.deleteOne({ _id: args.id });
                await User.deleteOne({ _id: managerToDelete.userId });
                return {
                    success: true,
                    message: `Successfully Deleted ${userToDelete.firstName} ${userToDelete.lastName}`
                }
            }
        } catch (error) {
            throw error
        }
    },
}