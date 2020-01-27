module.exports = (app, allModels) => {
  /*
     *  =========================================
     *  =========================================
     *  =========================================
     *  =========================================
     *    ALL ROUTES FOR POKEMON CONTROLLER
     *  =========================================
     *  =========================================
     *  =========================================
     */

  // require the controller
  const userControllerCallbacks = require('./controllers/users')(allModels)
  const messageControllerCallbacks = require('./controllers/messages')(allModels)

  app.get('/signin', userControllerCallbacks.signInPage)

  app.post('/signin', userControllerCallbacks.signIn)

  app.get('/login', userControllerCallbacks.signInPage)

  app.get('/register', userControllerCallbacks.registerPage)

  app.post('/register', userControllerCallbacks.registerAccount)

  app.get('/check', userControllerCallbacks.checkIfSignedIn)

  //
  // Messages RESTful Routes.
  //

  // Index - list all messages
  app.get('/', messageControllerCallbacks.displayAllMessages)
  app.get('/messages/', messageControllerCallbacks.displayAllMessages)
  // New - Form to make new message
  app.get('/messages/new', messageControllerCallbacks.newMessageForm)
  // Create - POST add new to db then redirect
  app.post('/messages/', messageControllerCallbacks.postNewMessage)
  // Show - Show one message
  app.get('/messages/:id', messageControllerCallbacks.displayIndividualMessage)

  // Edit - Edit form for one message
  app.get('/messages/:id/edit', messageControllerCallbacks.editMessageForm)

  // Update - PUT Update a specific message then redirect
  app.put('/messages/:id', messageControllerCallbacks.editMessagePut)

  // Destroy - DELETE a specific message then redirect.
  app.delete('/messages/:id', messageControllerCallbacks.deleteMessage)
}
