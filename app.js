const express = require("express")
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require("./graphql/schema")
const graphqlResolvers = require("./graphql/resolvers")
const mongoose = require("mongoose")
const cors = require("cors");
var bodyParser = require('body-parser')

/*
import graphqlSchema from './graphql/schema';
import graphqlResolvers from './graphql/resolvers';
import mongoose from 'mongoose';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
*/

const app = express()
const PORT = process.env.PORT || 80;

app.use(
    "/graphql", cors(),
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true,
    })
)
app.options('*', cors());

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.aad0t.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
// const uri = `mongodb://127.0.0.1:27017`
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect(uri, options)
    .then(() => app.listen(PORT, console.log("Server is running in " + PORT)))
    .catch(error => {
        throw error
    })
