const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        hello: {
            type: GraphQLString,
            resolve(parent, args){
                return "Hello from the other side!"
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
