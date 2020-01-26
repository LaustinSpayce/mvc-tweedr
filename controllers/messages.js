module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  const postNewMessage = (request, response) => {
      // First need to authenticate the user and get their ID.
      const logInToken = request.cookies.loginToken;
      const message = request.body.message;

      const displayConfirmation = (err, result) => {
        if (err) {
          console.log(err)
        }
        response.render('message', { message: "Tweed Posted!" });
      }

      const postMessage = (userID) => {
        if (userID) {
        db.messages.postMessage(message, userID, displayConfirmation);
        } else {
          console.log('invalid userID');
        }
      }

      db.users.verifyUserSignedIn(logInToken, postMessage);
  };

  // Display a new message page if the user is logged in.
  const newMessageForm = (request, response) => {
    const logInToken = request.cookies.loginToken;

    const displayNewMessageForm = (message, userID, callbackFunction) => {
      response.render('messages/newmessage', {userID: userID});
    }

    db.users.verifyUserSignedIn(logInToken, displayNewMessageForm);
  }

  // Home page, list all messages, show a box to put in a new message if logged in.
  const displayAllMessages = (request, response) => {

    let isloggedin = false;
    let user_id = 0;
    const logInToken = request.cookies.loginToken;

    const afterValidateLogin = (userID) => {
        user_id = userID;
        db.messages.selectAllMessages(sendMessagesToViewController);
    }

    const sendMessagesToViewController = (err, result) => {
      let signedinstatus = {
        userID: user_id
      }
      data = {
        messages: result,
        signedin: signedinstatus
      };
      response.render('messages/allmessages', data);
    }
    db.users.verifyUserSignedIn(logInToken, afterValidateLogin);
  }


  // Show one message with ID.
  const displayIndividualMessage = (request, response) => {
    console.log('finding individual message');
    let isloggedin = false;
    let user_id = 0;
    let messageID = request.params.id;
    const logInToken = request.cookies.loginToken;

    const sendMessageToViewController = (err, result) => {
      let signedinstatus = {
        userID: user_id
      }
      data = {
        message: result,
        signedin: signedinstatus
      };
      response.render('messages/individualmessage', data);
    };

    const afterValidateLogin = (userID) => {
      user_id = userID;
      console.log('user ID: ' + user_id);
      db.messages.selectIndividualMessage(messageID, sendMessageToViewController);
    }

    db.users.verifyUserSignedIn(logInToken, afterValidateLogin);

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
    displayIndividualMessage: displayIndividualMessage
  };

}
