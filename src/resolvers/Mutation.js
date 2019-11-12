const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
	// salt and hash the password with bcrypt
	const password = await bcrypt.hash(args.password, 10)

	// create a user with the new password
	const user = await context.prisma.createUser({ ...args, password })

	//use a JWT token to sign the user
	const token = jwt.sign({ userID: user.id }, APP_SECRET)

	return {
		token,
		user
	}
}

async function login(paren, args, context, info) {
	// get the user by their email form prisma
	const user = await context.prisma.user({ email: args.email })

	// if there is no user throw an error
	if (!user) {
		throw new Error('Invalid Credentials')
	}

	// compare the hashed passwords and throw an error if they do not match
	const valid = await bcrypt.compare(args.password, user.password)
	if (!valid) {
		throw new Error('Invalid Credentials')
	}

	//sign token for logged in user
	const token = jwt.sign({ userId: user.id }, APP_SECRET)

	return {
		user,
		token
	}
}

function post(parent, args, context, info) {
	// get the user id for creating a link
	const userId = getUserId(context)

	// return the link with connected user
	return context.prisma.createLink({
		url: args.url,
		description: args.description,
		postedBy: { connect: { id: userId } }
	})
}

async function vote(parent, args, context, info) {
    // validate the jwt
	const userId = getUserId(context)

    // see if the link exist
	const linkExists = await context.prisma.$exists.vote({
		user: { id: userId },
		link: { id: args.linkId }
    })
    
    // if the link exists throw an error
    if(linkExists) {
        throw new Error('You have already voted for this link.')
    }

    // if not create the new vote with the user and the link
    return context.prisma.createVote({
        user: { connect: { id: userId } },
        link: { connect: { id: args.linkId } } 
    })
}

module.exports = {
	signup,
	login,
    post,
    vote
}
