var React = require('react')
var DefaultLayout = require('../templates/default/defaultlayout')

class Home extends React.Component {
  render () {
    return (
      <DefaultLayout title='Sign In'>
        <h3>Hello</h3>
      </DefaultLayout>
    )
  }
}

module.exports = Home
