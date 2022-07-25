const User = require("../../models/user.model")

module.exports = {
    managerById: async () => {
        try {
            const usersFetched = await User.find();
            const managersFetched = await User.findOne(manager=>manager._id===args.id);
            return managersFetched.map(manager => {
                return {
                    ...manager._doc,
                    _id: manager.id,
                    manager: usersFetched.findOne(user=>user.id===manager.userId),
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
            console.log(usersFetched);
            const managersFetched = await User.find();
            return managersFetched.map(manager => {
                return {
                    ...manager._doc,
                    _id: manager.id,
                    manager: usersFetched.findOne(user=>user.id===manager.userId),
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
                password } = args.user
            const user = new User({
                firstName,
                lastName,
                email,
                password
            })
            const newUser = await user.save()
            const newManager = await {
                userId:newUser.id
            }.save();
            return { ...newManager._doc, _id: newUser.id }
        } catch (error) {
            throw error
        }
    },
}