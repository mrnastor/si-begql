const express = require("express")
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require("./graphql/schema")
const graphqlResolvers = require("./graphql/resolvers")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT || 80;
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
    .then(() => app.listen(PORT, console.log("Server is running in "+PORT)))
    .catch(error => {
        throw error
    })

// app.listen(APP_PORT, () => console.log("Server is running on localhost:"+APP_PORT))