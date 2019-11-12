const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

console.log(process.env.APP_SECRET)

//resolvers there must be a resolver for each field
const resolvers = {
  Query,
  Mutation,
  User,
  Link
}
		

//server
const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: request => {
		return {
			...request,
			prisma
		}
	}
})

server.start(() =>
	console.log('your Server is running on http://localhost:4000')
)
