var React = require('react')

class NavBar extends React.Component {
  render () {
    return (
      <nav className='navbar navbar-dark bg-dark navbar-expand-md'>
        <a className='navbar-brand' href='/'>TWEEDR</a>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>
      </nav>
    )
  }
}

module.exports = NavBar
