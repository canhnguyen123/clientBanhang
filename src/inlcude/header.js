import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function BasicExample() {
  const [isToggle, setIsToggle] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [numberInput, setNumberInput] = useState(1);
  const [quantity, setQuantiti] = useState(1);
  const [carttoogle, setcarttoogle] = useState(false);
  const showToggle=()=>{
    setcarttoogle(!carttoogle)
  }
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const infroUser = JSON.parse(userInfo);
      setUserInfo(infroUser);
      console.log(infroUser.user_id)
    }
  }, []);
  const handDecrease = () => {
    if (quantity > 1) {
      setQuantiti(quantity - 1);
      setNumberInput(quantity - 1); // Update the input value
    }
  };

  const handleIncrease = () => {
    setQuantiti(quantity + 1);
    setNumberInput(quantity + 1); // Update the input value
  };

  const checkNumber = (e) => {
    const value = e.target.value;
    if (/^[1-9]\d*$/.test(value) || value === '') {
      setNumberInput(value);
    }
  };
  const Toggle = () => {
    setIsToggle(!isToggle);
  };
  const logout = () => {
    localStorage.removeItem('userInfo');
    toast.success('Đang xuất thành công', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
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
          <div className='card-shopping-header flex_center cart' >
              <i className="fa-solid fa-cart-shopping" onClick={showToggle}></i>
               <p>0</p>
            <div className='cart-box-dowp' style={{ display: carttoogle ? 'block' : 'none' }}>
              <div className='cart-box-item'>
                    <i class="fa-solid fa-trash position-ab delete-cart"></i>
                <div className='cart-box-item-img flex_center'>
                  <img src='https://firebasestorage.googleapis.com/v0/b/newdoan-19717.appspot.com/o/1695017837705-7d148aba47549e36caef70ae315ada2c.jpg?alt=media&token=0a63912c-4c70-4654-8275-b4c8a12ea815' />
                </div>
                <div className='cart-box-item-infro'>
                  <div> <span>Áo đẹp...</span></div>
                  <div className='flex_Center  girl-5-5'>
                    <div className='flex_start'>
                      <span onClick={handDecrease}>-</span>
                      <input className='' onChange={checkNumber} value={numberInput} />
                      <span onClick={handleIncrease}>+</span>
                    </div>
                      <div className='flex_start'>
                          <span>Đen/S</span>
                      </div>
                  </div>
                </div>

              </div>
            </div>
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
                  {userInfo === null ? (
                    <>
                      <li>
                        <Link to="/account/0">Đăng nhập</Link>
                      </li>
                      <li>
                        <Link to="/account/1">Đăng ký</Link>
                      </li>

                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/account/2">Đổi mật khẩu</Link>
                      </li>

                      <li>
                        <Link onClick={logout}>Đăng xuất</Link>
                      </li>
                    </>
                  )}


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
