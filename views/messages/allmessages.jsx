var React = require('react')
var DefaultLayout = require('../templates/default/defaultlayout')

class NewMessage extends React.Component {
  render () {
    let postNewMessage = 'Sign in to post whatever you like.'

    if (this.props.signedin.userID) {
      postNewMessage = <form action='/messages' method='POST'><input type='hidden' name='userID' value={this.props.signedin.userID} /><p><input type='text' className='form-control' id='MessageContent' name='message' /></p><input type='submit' className='btn btn-primary' /></form>
    }

    const allMessages = this.props.messages.map((message, index) => {
      return <li key={index}>{message.username} - {message.message}</li>
    })

    return (
      <DefaultLayout title='Sign In'>
        <h3>TWEEDR</h3>
        <h4>What Ya Thinking?</h4>
        <p>
          {postNewMessage}
        </p>
        <ul>
          {allMessages}
        </ul>
      </DefaultLayout>
    )
  }
}

module.exports = NewMessage
