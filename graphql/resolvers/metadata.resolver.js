const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');

const Metadata = require("../../models/metadata.model")
const EmployeeSkill = require("../../models/employeeSkill.model")

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

    capabilityById: async args => {
        try {
            const tempList = _.find(await Metadata.find(), o => o._id.equals(new ObjectId(args.id)) && o.type == 'capability');
            return tempList
        } catch (error) {
            throw error
        }
    },

    //angular 62de5da4d6c74487764576a1
    //react 62de5da4d6c744877645769f

    metadataById: async args => {
        try {
            const tempList = _.find(await Metadata.find(), o => o._id.equals(new ObjectId(args.id)));
            return tempList
        } catch (error) {
            throw error
        }
    },

    metadataByType: async args => {
        try {
            const metadatasFetched = await Metadata.find()
            return metadatasFetched.filter(o => o.type === args.type).map(metadata => {
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

    deleteMetadata: async args => {
        try {
            const {
                id
            } = args
            const temp = _.find(await Metadata.find(), o => o._id.equals(new ObjectId(args.id)));
            await EmployeeSkill.deleteMany({metadataId:id})
            await Metadata.deleteOne({ _id: id });
            return {
                message: `Successfully deleted ${temp.name}.`,
                success: true
            }
        } catch (error) {
            throw error
        }
    },

    updateMetadata: async args => {
        try {
            let doc = await Metadata.findOneAndUpdate(
                { _id: args.id },
                args.metadata,
                { new: true }
            )
            return doc;
        } catch (error) {
            if (error.kind === 'ObjectId') {
                throw new Error('Metadata not found.')
            } else
                throw error.message
        }
    },
}