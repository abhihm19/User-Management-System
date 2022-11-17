import React from 'react'
import logo from '../iums_icon.png'

const Header = () => {
  return (
    <div>
      <header>
        <nav className='navbar navbar-light' style={{"backgroundColor": "	#faebd7"}}>
          <a className="navbar-brand" href="/">
            <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" />
              User Management System
          </a>
        </nav>
      </header>
    </div>
  )
}

export default Header