import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function BasicExample() {
  const [isToggle, setIsToggle] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [numberInput, setNumberInput] = useState(1);
  const [quantity, setQuantiti] = useState(1);
  const [carttoogle, setcarttoogle] = useState(false);
  const [user_id, setUser_id] = useState(0);
  const [listCard, setlistCard] = useState([]);
  const showToggle = () => {
    setcarttoogle(!carttoogle)
  }
  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    if (user_id) {
      setUser_id(user_id);
    }
    loadAPICart();
  }, [user_id]);
    const loadAPICart=()=>{
      const apiUrl = `http://localhost:4000/cart/get-list-cart-3/${user_id}`;
      axios
        .get(apiUrl)
        .then(response => {
          if (response.data.results) {
            setlistCard(response.data.results);
          }
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }
    const handDecrease = () => {
    if (quantity > 1) {
      setQuantiti(quantity - 1);
      setNumberInput(quantity - 1); 
    }
  };
   const handleIncrease = () => {
    setQuantiti(quantity + 1);
    setNumberInput(quantity + 1); // Update the input value
  };

  useEffect(()=>{
    console.log("hahaha")
  },[listCard.length])

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
            <Nav.Link href="/list-case">Thể loại</Nav.Link>
            <Nav.Link href="#link">Liện hệ</Nav.Link>
            <Nav.Link href="#link">Giới thiệu</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <div className='d-flex box-header-top'>
          <div className='card-shopping-header flex_center cart' >
            <i className="fa-solid fa-cart-shopping" onClick={showToggle}></i>
            <p>0</p>
            <div className='cart-box-dowp' style={{ display: carttoogle ? 'block' : 'none' }}>
              {listCard.map((item) => {
                return (
                  <div className='cart-box-item'>
                    <i class="fa-solid fa-trash position-ab delete-cart"></i>
                    <div className='cart-box-item-img flex_center'>
                      <img src={item.img}/>
                    </div>
                    <div className='cart-box-item-infro'>
                      <div className='text-cart-box'> <span>{item.name}</span></div>
                      <div className='flex_Center  girl-5-5'>
                        <div className='flex_start'>
                          <span onClick={handDecrease}>-</span>
                          <input className='' onChange={checkNumber} value={item.quantity} />
                          <span onClick={handleIncrease}>+</span>
                        </div>
                        <div className='flex_start'>
                          <span>{item.color}/{item.size}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                )
              })}
              <Link to="/cart" className='see-all-cart'>Xem tất cả <i class="fa-solid fa-angles-right"></i></Link>
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
                  {user_id === null ? (
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
