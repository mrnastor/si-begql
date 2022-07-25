const User = require("../../models/user.model")
const Manager = require("../../models/manager.model")
const _ = require('lodash');

module.exports = {
    managerById: async () => {
        try {
            const usersFetched = await User.find();
            const managersFetched = await User.findOne(manager => manager._id === args.id);
            return managersFetched.map(manager => {
                return {
                    ...manager._doc,
                    _id: manager.id,
                    manager: _.find(usersFetched, { _id: manager.userId }),
                    createdAt: new Date(manager._doc.createdAt).toISOString(),
                }
            })
        } catch (error) {
            throw error
        }
    },

    managers: async () => {
        try {
            const usersFetched = await User.find();
            const managersFetched = await Manager.find();
            return managersFetched.map(manager => {
                const userPerManager = _.find(usersFetched, userItem=>userItem._id==manager.userId);
                console.log(userPerManager)
                return {
                    ...manager._doc,
                    _id: manager.id,
                    firstName:userPerManager.firstName,
                    lastName:userPerManager.lastName,
                    email:userPerManager.email,
                    createdAt: new Date(manager._doc.createdAt).toISOString(),
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
                password
            })
            const newUser = await user.save()
            const newManager = await (new Manager({
                userId: newUser.id
            })).save();
            return { ...newManager._doc, _id: newUser.id }
        } catch (error) {
            throw error
        }
    },
}