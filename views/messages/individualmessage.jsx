var React = require('react')
var DefaultLayout = require('../templates/default/defaultlayout')

class IndividualMessage extends React.Component {
  render () {
    const deleteURL = `/messages/${this.props.message.id}?_method=DELETE`
    const title = `Another thrilling message by ${this.props.message.username}.`
    return (
      <DefaultLayout title={title}>
        <h3>TWEEDR:</h3>
        <h4>{this.props.message.username} wrote:</h4>
        <p>{this.props.message.message}</p>
        <p><small>On some date at some time.</small></p>
        <form action={deleteURL} method='POST'>
          <input type='hidden' name='userID' value={this.props.signedin.userID} />
          <input type='hidden' name='messageID' value={this.props.message.id} />
          <input type='submit' />
        </form>
      </DefaultLayout>
    )
  }
}

module.exports = IndividualMessage
