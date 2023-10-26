import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './main/home/home';
import About from './main/about/about';
import Account from './main/account/account';
import Detail from './main/deatil/deatil'; // Đã sửa từ Deatil thành Detail

const Main = () => {
  const location = useLocation();

  return (
    <div className='flex_center'>
      <div className='main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:product_id" element={<Detail />} />
          <Route path="/about" element={<About />} />
          <Route path="/account/:activeTab" element={<Account />} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
