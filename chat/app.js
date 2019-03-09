const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema.js');

const app = express();

app.use('/chat', graphqlHTTP({
    schema: schema,
    graphiql: true
}));


app.listen(4001, () =>{
    console.log('Listening on port 4001')
});
