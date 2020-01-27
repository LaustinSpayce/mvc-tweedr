var React = require('react')
var DefaultLayout = require('./templates/default/defaultlayout')

class Message extends React.Component {
  render () {
    return (
      <DefaultLayout title={this.props.message}>
        <h3>{this.props.message}</h3>
      </DefaultLayout>
    )
  }
}

module.exports = Message
