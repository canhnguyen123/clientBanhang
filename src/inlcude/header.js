import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

function BasicExample() {
  const [isToggle, setIsToggle] = useState(false);

  const Toggle = () => {
    setIsToggle(!isToggle);
  };

  return (
    <Navbar className='header'>
      <Container className='header-container'>
        <Navbar.Brand >GENZ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Trang chủ</Link>
            <Nav.Link href="#link">Mua hàng</Nav.Link>
            <NavDropdown title="Khác" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Liên hệ</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Góp ý</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Giới thiệu</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        <div className='d-flex box-header-top'>
          <div className='card-shopping-header flex_center cart'>
            <i className="fa-solid fa-cart-shopping"></i>
            <p>0</p>
          </div>

          <div className='account-home'>
            <div className='account-home-img'>
              <img
                className='img-account'
                src='https://firebasestorage.googleapis.com/v0/b/newdoan-19717.appspot.com/o/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg?alt=media&token=e55a5617-e31a-4bd6-86d6-c2a79a2bb8f8&_gl=1*wcu0mv*_ga*MTM1NDI4Mzc3Mi4xNjg2NjU2Nzg4*_ga_CW55HF8NVT*MTY5NjgyMTkyNC4zMS4xLjE2OTY4MjIwNTcuNDkuMC4w'
                onClick={Toggle}
              />
              {isToggle === true ? (
                <ul className='sub-menu'>
                  <li>
                  <Link to="/account/0">Đăng nhập</Link>
                  </li>
                  <li>
                  <Link to="/account/1">Đăng ký</Link>
                 </li>
                </ul>
              ) : ('')}
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
