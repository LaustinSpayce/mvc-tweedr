module.exports = (db) => {
  /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

  const postNewMessage = (request, response) => {
    // First need to authenticate the user and get their ID.
    const logInToken = request.cookies.loginToken
    const message = request.body.message

    const displayConfirmation = (err, result) => {
      if (err) {
        console.log(err)
      }
      response.render('message', {
        message: 'Tweed Posted!'
      })
    }

    const postMessage = (userID) => {
      if (userID) {
        db.messages.postMessage(message, userID, displayConfirmation)
      } else {
        console.log('invalid userID')
      }
    }

    db.users.verifyUserSignedIn(logInToken, postMessage)
  }

  // Display a new message page if the user is logged in.
  const newMessageForm = (request, response) => {
    const logInToken = request.cookies.loginToken

    const displayNewMessageForm = (message, userID, callbackFunction) => {
      response.render('messages/newmessage', {
        userID: userID
      })
    }

    db.users.verifyUserSignedIn(logInToken, displayNewMessageForm)
  }

  // Home page, list all messages, show a box to put in a new message if logged in.
  const displayAllMessages = (request, response) => {
    const isloggedin = false
    let user_id = 0
    const logInToken = request.cookies.loginToken

    const afterValidateLogin = (userID) => {
      user_id = userID
      db.messages.selectAllMessages(sendMessagesToViewController)
    }

    const sendMessagesToViewController = (err, result) => {
      const signedinstatus = {
        userID: user_id
      }
      data = {
        messages: result,
        signedin: signedinstatus
      }
      response.render('messages/allmessages', data)
    }
    db.users.verifyUserSignedIn(logInToken, afterValidateLogin)
  }

  // Show one message with ID.
  const displayIndividualMessage = (request, response) => {
    const isloggedin = false
    let user_id = 0
    const messageID = request.params.id
    const logInToken = request.cookies.loginToken

    const sendMessageToViewController = (err, result) => {
      const signedinstatus = {
        userID: user_id
      }
      data = {
        message: result,
        signedin: signedinstatus
      }
      response.render('messages/individualmessage', data)
    }

    const afterValidateLogin = (userID) => {
      user_id = userID
      db.messages.selectIndividualMessage(messageID, sendMessageToViewController)
    }
    db.users.verifyUserSignedIn(logInToken, afterValidateLogin)
  }

  // Show form to edit one message.
  const editMessageForm = (request, response) => {
    const isloggedin = false
    let user_id = 0
    const messageID = request.params.id
    const logInToken = request.cookies.loginToken

    const sendMessageToViewController = (err, result) => {
      const signedinstatus = {
        userID: user_id
      }
      const data = {
        message: result,
        signedin: signedinstatus
      }
      if (signedinstatus.userID === result.user_id) {
        response.render('messages/editmessage', data)
      } else {
        response.status(300).redirect('/signin/')
      }
    }

    const afterValidateLogin = (userID) => {
      user_id = userID

      db.messages.selectIndividualMessage(messageID, sendMessageToViewController)
    }
    db.users.verifyUserSignedIn(logInToken, afterValidateLogin)
  }

  // When we receive a message, put it out there!
  const editMessagePut = (request, response) => {
    // First need to authenticate the user and get their ID.
    const logInToken = request.cookies.loginToken
    const message = request.body.message
    const messageURL = `/messages/${request.body.messageID}`
    const messageID = request.body.messageID

    const displayConfirmation = (err, result) => {
      if (err) {
        console.log(err)
      } else {
        response.redirect(messageURL)
      }
    }

    const editTheMessage = (userID) => {
      const user_id = userID

      if (userID) {
        db.messages.editMessage(message, user_id, messageID, displayConfirmation)
      } else {
        console.log('invalid userID')
      };
    }

    db.users.verifyUserSignedIn(logInToken, editTheMessage)
  }

  const deleteMessage = (request, response) => {
    const logInToken = request.cookies.loginToken
    const messageURL = `/messages/${request.body.messageID}`
    const messageID = request.body.messageID
    const submitUserID = request.body.userID
    const user_id = 0

    const displayConfirmation = (err, result) => {
      if (err) {
        console.log(err)
      } else {
        response.render('message', { message: 'message deleted' })
      }
    }

    const deleteTheMessage = (userID) => {
      const user_id = userID
      if (userID == submitUserID) {
        db.messages.deleteMessage(messageID, user_id, displayConfirmation)
      } else {
        console.log('invalid userID')
      };
    }

    db.users.verifyUserSignedIn(logInToken, deleteTheMessage)
  }

  /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
  return {
    newMessageForm: newMessageForm,
    postNewMessage: postNewMessage,
    displayAllMessages: displayAllMessages,
    displayIndividualMessage: displayIndividualMessage,
    editMessageForm: editMessageForm,
    editMessagePut: editMessagePut,
    deleteMessage: deleteMessage
  }
}
