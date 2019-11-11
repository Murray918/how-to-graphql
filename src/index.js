const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require('./generated/prisma-client')




//resolvers there must be a resolver for each field
const resolvers = {
  Query: {
    info: () => "This is the API of a Hackernews Clone.",
    feed: () => (root, args, context, info) => {
        return context.prisma.links()
    }
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createdLink({
          url: args.url,
          description: args.description
      })
    },
  }
};

//server
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context : { prisma }
});

server.start(() =>
  console.log("your Server is running on http://localhost:4000")
);
