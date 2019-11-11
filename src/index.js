const { GraphQLServer } = require('graphql-yoga')

//describe the links
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

//resolvers there must be a resolver for each field
const resolvers = {
    Query: {
        info : () => 'This is the API of a Hackernews Clone.',
        feed: () => links,
    },
    Link: {
        id: (parent) => parent.id,
        description : (parent) => parent.description,
        url: (parent) => parent.url
    }
}

//server
const server = new GraphQLServer({
    typeDefs : './src/schema.graphql',
    resolvers
})

server.start(() => console.log('your Server is running on http://localhost:4000'))
