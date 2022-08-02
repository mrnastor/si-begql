const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');

const JWTHelper = require('../../helper/jwt.helper')
const User = require("../../models/user.model")
const Manager = require("../../models/manager.model")
const Employee = require("../../models/employee.model")

module.exports = {
    users: async (args) => {
        try {
            console.log("I am called", args)
            const usersFetched = await User.find()
            return usersFetched.map(user => {
                return {
                    ...user._doc,
                    _id: user.id,
                    createdAt: new Date(user._doc.createdAt).toISOString(),
                }
            })
        } catch (error) {
            throw error
        }
    },

    userByFristName: async args => {
        try {
            // const usersFetched = await User.findOne(obj => obj.firstName === args.firstName)
            const tempList = await User.findOne({ ...args });
            return tempList
        } catch (error) {
            throw error
        }
    },

    userById: async args => {
        try {
            const tempList = _.find(await User.find(), o => o._id.equals(new ObjectId(args.userId)));
            return tempList
        } catch (error) {
            throw error
        }
    },

    addUser: async args => {
        try {
            const {
                firstName,
                lastName,
                email,
                password } = args.user
            const user = new User({
                firstName,
                lastName,
                email,
                password
            })
            user.isAdmin = false;
            const newUser = await user.save()
            return { ...newUser._doc, _id: newUser.id }
        } catch (error) {
            throw error
        }
    },

    addAdmin: async args => {
        try {
            const {
                firstName,
                lastName,
                email,
                password } = args.user
            const user = new User({
                firstName,
                lastName,
                email,
                password
            })
            user.isAdmin = true;
            const newUser = await user.save()
            return { ...newUser._doc, _id: newUser.id }
        } catch (error) {
            throw error
        }
    },

    signup: async args => {
        try {
        } catch (error) {
            throw error;
        }
    },

    login: async args => {
        try {
            const tempUser = _.find(await User.find(), o => o.email === args.email);
            if (args.password === tempUser.password) {
                let tempToken = JWTHelper.generateToken(tempUser);
                const employeeUser = _.find(await Employee.find(), o => tempUser._id.equals(new ObjectId(o.userId)));
                const managerUser = _.find(await Manager.find(), o => tempUser._id.equals(new ObjectId(o.userId)));
                console.log('employeeUser', employeeUser);
                console.log('managerUser', managerUser);
                console.log('tempUser', tempUser);
                let employeeId = '', managerId = '';
                if (employeeUser !== undefined) {
                    // user is employee
                    employeeId = employeeUser._id;
                    managerId = employeeUser.managerId
                } else if (managerUser !== undefined) {
                    // user is manager
                    employeeId = null;
                    managerId = managerUser._id
                } else {
                    // user is admin
                    employeeId = null;
                    managerId = null
                }
                return {
                    token: tempToken,
                    employeeId: employeeId,
                    managerId: managerId,
                    user: tempUser,
                    isAdmin: tempUser.isAdmin || false
                }
            } else {
                return {
                    token: null,
                    user: null,
                    isAdmin: null,
                    employeeId: null,
                    managerId: null,
                }
            }
        } catch (error) {
            throw error;
        }
    },
}