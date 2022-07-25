const User = require("../../models/user.model")

module.exports = {
    users: async () => {
        try {
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
            const tempList = await User.findOne({...args});
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
}