import React, { useState, useEffect } from 'react';
import SliderDeail from './ingredient/sliderDeail';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Accordion from 'react-bootstrap/Accordion';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Deatil() {
  const { product_id } = useParams();
  const [productList, setProductList] = useState([]);
  const [quantity, setQuantiti] = useState(1);
  const [numberInput, setNumberInput] = useState(1);
  const [colorChane, setcolorChane] = useState('');
  const [sizeChane, setsizeChane] = useState('');
  let [selectedPrice, setSelectedPrice] = useState(0);
  const [user_id, setUser_id] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const infroUser = JSON.parse(userInfo);
      setUser_id(infroUser.user_id);

    }
  }, []);
  useEffect(() => {
    const apiUrl = 'http://localhost:4000/product/deatil/' + product_id;
    axios
      .get(apiUrl)
      .then(response => {
        if (response.data.results) {
          setProductList(response.data.results);
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
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
  const chaneColor = (selectedColor) => {
    setcolorChane(selectedColor);
  }
  const chaneSize = (selectedSize) => {
    setsizeChane(selectedSize);
  }
  function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }
  const findData = () => {
    const price = productList[0].quantity.find((item) => {
      return item.size === sizeChane && item.color === colorChane && item.quantity_ > 0;
    });

    if (price) {
      if (selectedPrice !== price.price) {
        setSelectedPrice(price.price);
      }
      return <p>Giá sản phẩm: {formatPrice(price.price)}</p>;
    } else {
      if (selectedPrice !== 0) {
        setSelectedPrice(0);
      }
      return <p>Không có sản phẩm có giá và màu này chọn cái khác hoặc hết hàng</p>;
    }
  };
  const addCart = async () => {
    if (colorChane === "" || sizeChane === "" || selectedPrice === 0) {
      toast.error("Bạn chưa chọn sản phẩm hoặc không còn hàng", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    else {
      console.log('Đủ điều kiện')
      const apiUrl = `http://localhost:4000/cart/add/${user_id}`;
      console.log(apiUrl)
      const data = {
        product_id: product_id,
        card_size: sizeChane,
        card_color: colorChane,
        card_quantity: quantity
      };
      try {
        const response = await axios.post(apiUrl, data);
        if(response.data.status==="success"){
            toast.success(response.data.mess, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
             });
        }
        else{
          alert(response.data.mess)
        }
      } catch (error) {
        console.error('Error posting to the API:', error);
      }
      
    }



  };




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
                <small>*Lưu ý: Chọn size và màu sắc để xem giá</small>
              </div>
              <div className='mg-35'>
                <span className='context-span'>Màu sắc :</span>
                <div className='list-span-box '>
                  {product.colorList.map((color) => (
                    <div onClick={() => chaneColor(color)}
                      className={`item-span-box flex_center color-span-box ${colorChane === color ? 'active' : ''}`}
                    >
                      <span className={`color-span-text ${colorChane === color ? 'active' : ''}`}>{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='mg-35'>
                <span className='context-span'>Kích cỡ :</span>
                <div className='list-span-box '>
                  {product.sizeList.map((size, index) => (
                    <div onClick={() => chaneSize(size)} className={`item-span-box flex_center size-span-box ${sizeChane === size ? 'active' : ''}`}>
                      <span className={`size-span-text ${sizeChane === size ? 'active' : ''}`}>{size}</span>
                    </div>
                  ))}
                </div>
              </div>

              {colorChane != "" && sizeChane != "" ? findData() : ""}

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
                <button onClick={addCart} className='button-card bg-yellow-og flex_center mg-5'><i class="fa-solid mg-r-5 fa-cart-plus"></i> Thêm vào giỏ hàng</button>

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
