const Metadata = require("../../models/metadata.model")

module.exports = {
    metadatas: async () => {
        try {
            const metadatasFetched = await Metadata.find()
            return metadatasFetched.map(metadata => {
                return {
                    ...metadata._doc,
                    _id: metadata.id,
                    name: metadata.name,
                    type: metadata.type,
                    description: metadata.description,
                    createdAt: new Date(metadata._doc.createdAt).toISOString(),
                }
            })
        } catch (error) {
            throw error
        }
    },

    metadataByName: async args => {
        try {
            const tempList = await Metadata.findOne({ ...args });
            return tempList
        } catch (error) {
            throw error
        }
    },

    addMetadata: async args => {
        try {
            const {
                name,
                type,
                description
            } = args.metadata
            const metadata = new Metadata({
                name,
                type,
                description
            })
            const newMetadata = await metadata.save()
            return { ...newMetadata._doc, _id: newMetadata.id }
        } catch (error) {
            throw error
        }
    },
}