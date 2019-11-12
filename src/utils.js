const jwt = require('jsonwebtoken')
const APP_SECRET = process.env.APP_SECRET || 'party-on-wayne'

function getUserId(context) {
    //get the auth from the request
    const Authorization = context.request.get('Authorization')
    if(Authorization) {
        //replace with a blank
        const token = Authorization.replace('Bearer', '')
        const { userId } = jwt.verify(token, APP_SECRET)
        return userId 
    }
    throw new Error('Un Authorized')
}


module.exports = {
    APP_SECRET,
    getUserId,
  }
  