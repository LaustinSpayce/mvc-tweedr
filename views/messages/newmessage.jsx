var React = require('react')
var DefaultLayout = require('../templates/default/defaultlayout')

class NewMessage extends React.Component {
  render () {
    return (
      <DefaultLayout title='Sign In'>
        <h3>Write new Tweed</h3>
        <form action='/messages' method='POST'>
          <label htmlFor='MessageContent'>Tweed:</label>
          <input type='hidden' name='userID' value={this.props.userID} />
          <p><input type='text' className='form-control' id='MessageContent' name='message' /></p>
          <input type='submit' className='btn btn-primary' />
        </form>
      </DefaultLayout>
    )
  }
}

module.exports = NewMessage
