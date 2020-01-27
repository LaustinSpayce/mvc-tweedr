/**
 * ===========================================
 * Modules required
 * ===========================================
 */

const sha256 = require('js-sha256')
const SALT = 'potatoTomatoHelloGoodbyeSleep'
const SESSION_LENGTH_TIME = {
  weeks: 2
} // 2 weeks
const moment = require('moment')

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
  // verify if user is signed in, if so, perform the callback.
  const verifyUserSignedIn = (loginToken, callbackFunction) => {
    const queryString = 'SELECT * FROM sessions WHERE token = $1;'
    const queryValues = [loginToken]
    dbPoolInstance.query(queryString, queryValues, (err, result) => {
      if (err) {
        console.log('error with token authentication', err)
      } else {
        const authResult = result.rows[0]
        if (authResult) {
          if (moment().isBefore(moment(authResult.expiry))) {
            callbackFunction(authResult.user_id)
            return
          }
        }
        callbackFunction(false)
      }
    })
  }

  // Make a token.
  const createLoggedInToken = (id, username, loggedInCallback) => {
    const timeNow = moment()
    const loginToken = sha256(id + timeNow.format() + SALT)
    const expiryDate = moment().add(SESSION_LENGTH_TIME)
    const queryString = 'INSERT INTO sessions (token, user_id, expiry) VALUES ($1, $2, $3) RETURNING *;'
    const queryValues = [loginToken, id, expiryDate.format()]
    dbPoolInstance.query(queryString, queryValues, (err, result) => {
      if (err) {
        console.log('error!', err)
      } else {
        loggedInCallback(loginToken, result.rows[0].user_id, result.rows[0].expiry)
      }
    })
  }

  // `dbPoolInstance` is accessible within this function scope
  const signIn = (username, password, callback) => {
    const hashedPassword = sha256(password + SALT)
    const queryString = 'SELECT * FROM users WHERE username = $1 AND hashedpassword = $2'
    const queryValues = [username, hashedPassword]
    dbPoolInstance.query(queryString, queryValues, (err, result) => {
      if (err) {
        console.log('Error', err)
      } else {
        if (result.rows.length > 0) {
          console.log('user logged in')
          createLoggedInToken(result.rows[0].id, result.rows[0].username, callback)
        } else {
          console.log('bad username or password')
        }
      }
    })
  }

  // Check the username is unique.
  const checkUniqueUsername = (username, callback) => {
    const queryString = 'SELECT * FROM users WHERE username = $1;'
    const queryValues = [username]
    dbPoolInstance.query(queryString, queryValues, callback)
  }

  const registerAccount = (username, password, usernameRegistrationCallback) => {
    const checkUniqueUserNameCallback = (err, result) => {
      if (err) {
        console.log('Error', err)
      } else {
        if (result.rows.length === 0) {
          const hashedPassword = sha256(password + SALT)
          const queryString = 'INSERT INTO users (username, hashedpassword) VALUES ($1, $2);'
          const queryValues = [username, hashedPassword]
          dbPoolInstance.query(queryString, queryValues, usernameRegistrationCallback)
        } else {
          console.log('username already taken!')
        }
      }
    }

    checkUniqueUsername(username, checkUniqueUserNameCallback)
  }

  return {
    signIn,
    registerAccount,
    verifyUserSignedIn
  }
}
