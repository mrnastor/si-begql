const express = require("express")
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require("./graphql/schema")
const graphqlResolvers = require("./graphql/resolvers")
const mongoose = require("mongoose")
const cors = require("cors");
/*
import graphqlSchema from './graphql/schema';
import graphqlResolvers from './graphql/resolvers';
import mongoose from 'mongoose';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
*/

const app = express()
const PORT = process.env.PORT || 80;
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "POST, PUT, PATCH, GET, DELETE"
        )
        return res.status(200).json({})
    }
    next()
})
app.use(cors())
app.use(
    "/graphql",
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true,
    })
)
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.aad0t.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect(uri, options)
    .then(() => app.listen(PORT, console.log("Server is running in " + PORT)))
    .catch(error => {
        throw error
    })
