const { GraphQLServer } = require("graphql-yoga");

//describe the links
let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];

let idCount = links.length;

//resolvers there must be a resolver for each field
const resolvers = {
  Query: {
    info: () => "This is the API of a Hackernews Clone.",
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
  }
};

//server
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});

server.start(() =>
  console.log("your Server is running on http://localhost:4000")
);
