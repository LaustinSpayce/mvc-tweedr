var React = require('react')
var DefaultLayout = require('../templates/default/defaultlayout')

class SignInPage extends React.Component {
  render () {
    return (
      <DefaultLayout title='Sign In'>
        <h3>Sign In Page</h3>
        <form action='/signin' method='POST'>
          <div className='form-group'>
            <label htmlFor='usernameID'>User Name:</label>
            <input type='text' className='form-control' id='usernameID' name='username' />
          </div>
          <div className='form-group'>
            <label htmlFor='passwordID'>Password:</label>
            <input type='password' className='form-control' id='passwordID' name='password' />
          </div>
          <input type='submit' className='btn btn-primary' />
        </form>
      </DefaultLayout>
    )
  }
}

module.exports = SignInPage
