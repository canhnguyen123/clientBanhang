import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom'; 
import Login from "./login";
import Register from "./register";

const Account = () => {
  const { activeTab: activeTabFromUrlParams } = useParams();

  // Sử dụng useLocation để lấy giá trị activeTab từ state nếu có
  const location = useLocation();
  const activeTabFromUrl = location.state ? location.state.activeTab : 0;

  // Khởi tạo activeTab bằng useState
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <div className='account flex_center'>
      <div>
        <div className='titel'>
          <ul>
            <li onClick={() => handleTabChange(0)}>
              <h3 className={activeTab === 0 ? 'active' : ''}>Đăng nhập</h3>
            </li>
            <li onClick={() => handleTabChange(1)}>
              <h3 className={activeTab === 1 ? 'active' : ''}>Đăng kí</h3>
            </li>
          </ul>
        </div> 
        <div className="content-account">
          {activeTab === 0 ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
}

export default Account;
