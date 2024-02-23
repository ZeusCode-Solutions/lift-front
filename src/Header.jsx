import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";


class Header extends React.Component {
  render() {
    let linkStyle = {
        color: 'white',
        margin: '1rem'
    }
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Workouts</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link" style={linkStyle}>Home</Link></NavItem>
        <NavItem><Link to="/about" className="nav-link" style={linkStyle}>About</Link></NavItem>
        
        
      </Navbar>
    )
  }
}

export default Header;