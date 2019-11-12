
/** newLinkSubscribe Section*/
function newLinkSubscribe(parent, args, context, info) {
	return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node()
}

const newLink = {
	subscribe: newLinkSubscribe,
	resolve: payload => payload
}

/** newVoteSubscribe Section */
function newVoteSubscribe(parent, args, context, info){
	return context.prisma.$subscribe.vote({ mutation_in: ['CREATED']}).node()
}

const newVote = {
	subscribe: newVoteSubscribe,
	resolve: payload => payload
}


module.exports = {
	newLink,
	newVote
}
