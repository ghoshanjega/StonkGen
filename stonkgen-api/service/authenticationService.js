const low = require('lowdb')
var _ = require('lodash');
const FileSync = require('lowdb/adapters/FileSync')
const { ErrorHandler } = require('../helper/error')

const adapter = new FileSync('database/user.json')
const userdb = low(adapter)

// Set some defaults (required if your JSON file is empty)
userdb.defaults({ users: [], userSessions: [] })
    .write()

const userTable = userdb.get('users')
const sessionTable = userdb.get('userSessions')

var authenticationService = {
    login: function (auth) {
        const { userName, password } = auth
        if (!userName || !password) {
            throw new ErrorHandler(400, 'Missing required email and password fields')
        }
        else {
            const user = userTable.find({ userName: userName }).value();
            if (user) {
                if (user.password === password) {

                    const session = Date.now().toString()
                    sessionTable.push({
                        id: session,
                        userId: user.id
                    }).write()
                    return {
                        userName: user.userName,
                        fullName: user.fullName,
                        sessionId: session,
                        admin : user.admin || false
                    }
                }
                throw new ErrorHandler(401, 'Unauthorized')
            }
            throw new ErrorHandler(404, 'No user found. Sign up instead')
        }

    },
    signup: function (auth) {
        const { userName, password, fullName, admin } = auth
        if (!userName || !password || !fullName) {
            throw new ErrorHandler(400, 'Missing required email and password fields')
        }
        else if (userTable.find({ userName: userName }).value()){
            throw new ErrorHandler(400, 'User name already taken')
        }
        else {
            const newUser = _.last(userTable.push({
                id: Date.now().toString(),
                fullName,
                userName,
                password,
                admin : admin || false
            }).write())
            
            const session = Date.now().toString()
            sessionTable.push({
                id: session,
                userId: newUser.id
            }).write()
            return {
                userName: newUser.userName,
                fullName: newUser.fullName,
                sessionId: session
            }
        }
    },
    getUserIdFromSession: function(auth)  {
        const {sessionId} = auth;
        return sessionTable.find({id : sessionId}).value();
    },
    getAllSessionsOfUser: function(auth) {
        const {userId } = auth;
        return sessionTable.filter({userId}).value();
    },
    listAllUsers: function() {
        return userTable.value()
    }
};

module.exports = authenticationService;