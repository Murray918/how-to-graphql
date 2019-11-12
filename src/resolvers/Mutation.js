
async function signup(parent, args, context, info) {
    // salt and hash the password with bcrypt
    const password = await bcrypt.hash(args.password, 10)
    
    // create a user with the new password
    const user = await context.prisma.createUser({...args, password})

    //use a JWT token to sign the user
    const token = jwt.sign({userID: user.id}, APP_SECRET) 

    return {
        token,
        user
    }
}

async function login(paren, args, context, info) {

    // get the user by their email form prisma 
    const user = await context.prisma.user({email: args.email})

    // if there is no user throw an error
    if (!user) {
        throw new Error ('Invalid Credentials')
    }

    // compare the hashed passwords and throw an error if they do not match
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid Credentials')
    }

    //sign token for logged in user
    const token = jwt.sign({userId: user.id}, APP_SECRET)

    return {
        user,
        token
    }
}

module.exports = {
    signup,
    login,
    post
}