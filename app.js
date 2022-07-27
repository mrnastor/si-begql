const express = require("express")
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require("./graphql/schema")
const graphqlResolvers = require("./graphql/resolvers")
const mongoose = require("mongoose")
/*
import graphqlSchema from './graphql/schema';
import graphqlResolvers from './graphql/resolvers';
import mongoose from 'mongoose';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
*/

const app = express()
const PORT = process.env.PORT || 80;

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

app.configure(function () {
    app.use(allowCrossDomain);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(application_root, "public")));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

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
