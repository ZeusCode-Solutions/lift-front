import React from 'react';
import { Navbar } from 'react-bootstrap';

class Footer extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ borderTop: '1px solid olive' }}>
        <Navbar.Brand style={{ color: 'olive' }}>Code Fellows</Navbar.Brand>
      </Navbar>
    )
  }
}

export default Footer;