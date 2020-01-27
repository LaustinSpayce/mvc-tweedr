var React = require('react')
var DefaultLayout = require('../templates/default/defaultlayout')

class EditMessage extends React.Component {
  render () {
    const actionURL = `/messages/${this.props.message.id}?_method=PUT`
    return (
      <DefaultLayout title='Edit Message'>
        <h3>Edit Message</h3>
        <form action={actionURL} method='POST'>
          <label htmlFor='MessageContent'>Tweed:</label>
          <input type='hidden' name='userID' value={this.props.userID} />
          <input type='hidden' name='messageID' value={this.props.message.id} />
          <p><input type='text' className='form-control' id='MessageContent' name='message' defaultValue={this.props.message.message} /></p>
          <input type='submit' className='btn btn-primary' />
        </form>
      </DefaultLayout>
    )
  }
}

module.exports = EditMessage
