import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

class Header extends React.Component {
  renderHeader = () => {
    return (
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Brand>
          <Link to='/'>
            <img className='logo' src='/assets/monecoproject-fav.png' />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            {/* <Nav.Link href='#features'>Features</Nav.Link>
            <Nav.Link href='#pricing'>Pricing</Nav.Link>
            <NavDropdown title='Dropdown' id='collasible-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            <Nav.Link>
              <img
                className='nav-logo'
                src='/assets/awards-logo-deloitte-500.svg'
              />
            </Nav.Link>
            <Nav.Link>
              <img
                className='nav-logo'
                src='/assets/awards-logo-2018-Best-Companies.svg'
              />
            </Nav.Link>
            <Nav.Link>
              <img
                className='nav-logo'
                src='/assets/awards-logo-techtrack.svg'
              />
            </Nav.Link>
            <Nav.Link>
              <img
                className='nav-logo'
                src='/assets/awards-logo-queens-award-for-enterprise.svg'
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  render() {
    return <header>{this.renderHeader()}</header>;
  }
}

export default Header;
