import React, { useState, useEffect } from 'react';
import SliderDeail from './ingredient/sliderDeail';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Accordion from 'react-bootstrap/Accordion';

function Deatil(props) {
  const [productList, setProductList] = useState([]);
  const [quantity, setQuantiti] = useState(1);
  const [numberInput, setNumberInput] = useState(1);

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

  useEffect(() => {
    const apiUrl = 'http://localhost:4000/product/deatil/' + 71;

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data.status === 'success') {
          if (response.data.results) {
            setProductList(response.data.results);
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <section className='row mg-t-85'>
      {productList.map((product) => (
        <div className='row'>
          <div className='col-6'>
            <SliderDeail listImg={product.images} />
          </div>
          <div className='col-6'>
            <div key={product.id} className='deatil-context'>
              <h3>{product.name}</h3>
              <h4 className='context-span'>Mã sản phẩm : {product.code}</h4>
              <span className='context-span'>Danh mục: {product.theloai_name}</span>
              <span className='context-span'>Phân loại: {product.phanloai_name}</span>
              <span className='context-span'>Thể loại: {product.theloai_name}</span>
              <span className='context-span'>Thương hiệu: {product.brand_name}</span>
              <span className='context-span'>Mã thương hiệu: {product.brand_code}</span>

              <div className='mg-35'>
                <span className='context-span'>Màu sắc :</span>
                <div className='list-span-box '>
                  {product.colorList.map((item, index) => (
                    <div className='item-span-box flex_center' key={index}>
                      <span>{item.color}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='mg-35'>
                <span className='context-span'>Kích cỡ :</span>
                <div className='list-span-box '>
                  {product.sizeList.map((item, index) => (
                    <div className='item-span-box flex_center' key={index}>
                      <span>{item.size}</span>
                    </div>
                  ))}
                </div>
              </div>


              <div className='check-quantity mg-35'>
                <div className='check-quantity-item-box flex_center' onClick={handDecrease}>
                  <span>-</span>
                </div>
                <input onChange={checkNumber} value={numberInput} />
                <div className='check-quantity-item-box flex_center' onClick={handleIncrease}>
                  <span>+</span>
                </div>
              </div>
              <div className='mg-35 list-button-card'>
                    <button className='button-card bg-red-blink flex_center mg-5'><i class="fa-solid mg-r-5 fa-cart-shopping"></i> Mua ngay</button>
                    <button className='button-card bg-yellow-og flex_center mg-5'><i class="fa-solid mg-r-5 fa-cart-plus"></i> Thêm vào giỏ hàng</button>

              </div>
              <Tabs defaultActiveKey='profile' id='uncontrolled-tab-example' className='mb-3 tab-menu'>
                <Tab eventKey='home' title='Mô tả'>
                  <Accordion defaultActiveKey='0'>
                    <Accordion.Item eventKey='0'>
                      <Accordion.Header>Xem thêm</Accordion.Header>
                      <Accordion.Body>
                        <div dangerouslySetInnerHTML={{ __html: product.mota }} />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Tab>
                <Tab eventKey='profile' title='Đặc điểm'>
                  <Accordion defaultActiveKey='0'>
                    <Accordion.Item eventKey='0'>
                      <Accordion.Header>Xem thêm</Accordion.Header>
                      <Accordion.Body>
                        <div dangerouslySetInnerHTML={{ __html: product.dacdiem }} />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Tab>
                <Tab eventKey='contact' title='Bảo quản'>
                  <Accordion defaultActiveKey='0'>
                    <Accordion.Item eventKey='0'>
                      <Accordion.Header>Xem thêm</Accordion.Header>
                      <Accordion.Body>
                        <div dangerouslySetInnerHTML={{ __html: product.baoquan }} />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Deatil;
