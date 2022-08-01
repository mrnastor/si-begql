const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');

const JWTHelper = require('../../helper/jwt.helper')
const User = require("../../models/user.model")

module.exports = {
    users: async (args) => {
        try {
            console.log("I am called",args)
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
                return {
                    token: tempToken,
                    user: tempUser
                }
            } else {
                return {
                    token: null,
                    user: null
                }
            }
        } catch (error) {
            throw error;
        }
    },
}