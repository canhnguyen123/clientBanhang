import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'alertifyjs/build/css/alertify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function ListCart() {
    const navigate = useNavigate();
    const [user_id, setUser_id] = useState(0);
    const [listCard, setListCard] = useState([]);
    const [numberProduct,setNumberProduct]=useState(0)
    const [quantityAll,setquantityAll]=useState(0)
    const [money,setmoney]=useState(0)
    const [moneyShip,setmoneyShip]=useState(0)
    useEffect(() => {
        const user_id = localStorage.getItem('user_id');
        if (user_id) {
            setUser_id(user_id);
        }
        callAPiList()
            if(numberProduct>0){
                setmoneyShip(30000)
            }else{
                setmoneyShip(0) 
              }
    }, [user_id,numberProduct]);
    
    const callAPiList=()=>{
           const apiUrl = `http://localhost:4000/cart/get-list/${user_id}`;
         axios
            .get(apiUrl)
            .then(response => {
                if (response.data.results) {
                    setListCard(response.data.results);
                }
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }
    const changeSelect = (e) => {
        const value = e.target.value;
    
        if (value === "0") {
            const inputElements = document.querySelectorAll('.checked-input-box');
            inputElements.forEach((inputElement) => {
                inputElement.checked = true;
            });
        } else if (value === "1") {
            const inputElements = document.querySelectorAll('.checked-input-box');
            inputElements.forEach((inputElement) => {
                inputElement.checked = false;
            });
            setquantityAll(0)
            setmoney(0)
            setNumberProduct(0);
          
        }
    }
      
        const changeChecked = (e,quantity,price) => {
            const isChecked = e.target.checked;
            const itemId = e.target.value;
            const changeAmount = isChecked ? 1:-1 ;
            const changeQuantity = isChecked ? quantity:-quantity ;
            const Chaneprice = isChecked ? (price*quantity):-(price*quantity) ;
            setquantityAll((quantityCart) => quantityCart + changeQuantity)
            setmoney((money) => money + Chaneprice)
            setNumberProduct((prevNumberProduct) => prevNumberProduct + changeAmount);
        }       
    function formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    }
    const payying = () => {
        const checkedValues = [];
        const checkedInputs = document.querySelectorAll('.checked-input-box');
        checkedInputs.forEach((input) => {
          if (input.checked) {
            checkedValues.push(input.value);
          }
        });
        
        navigate('/payying', { state: { data: checkedValues } });
      }
      
    const deleteCart=()=>{
        const checkedItems = [];
        const inputElements = document.querySelectorAll('.checked-input-box');

        inputElements.forEach((inputElement) => {
            if (inputElement.checked) {
            const checkedValue = inputElement.value;
            checkedItems.push(checkedValue);
            }
        });
            const apiDealet = `http://localhost:4000/cart/delete/${user_id}`;
            const data={
                arrId:checkedItems
            }
            axios
                .post(apiDealet,data)
            .then(response => {
                if (response.data.status==="success") {
                    toast.success(response.data.mess, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                        callAPiList()
                }
                else if(response.data.status==="fail"){
                    toast.error(response.data.mess, {
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
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
            if(numberProduct>0){
                setmoneyShip(30000)
            }else{
                setmoneyShip(0) 
              }
    }
  
    const handleConfirmation = (message) => {
        confirmAlert({
            title: 'Xóa sản phẩm',
            message: 'Bạn có muốn xóa sản phẩm này không?',
            buttons: [
              {
                label: (
                  <span>
                    Đồng ý
                  </span>
                ),
                onClick: () => {
                    deleteCart()
                }
              },
              {
                label: (
                  <span>
                    Hủy
                  </span>
                ),
                onClick: () => {
                }
              }
            ]
          });
    }
    
  
    return (
        <div className='flex_center w-100'>
            <div className='row main-95'>
                <h4 className='titel-center'>
                    Giỏ hàng của bạn
                </h4>
                <div className='col-12 pd-30 flex_start'>
                    <select className='select-chane-action' onChange={changeSelect}>
                        <option>Thao tác</option>
                        <option value="0" >Chọn tất cả</option>
                        <option value="1">Bỏ tất cả</option>
                    </select>
                    <div className='mg-30 icon-btn'><i onClick={() => handleConfirmation("Bạn có muốn xóa không")} class="fa-solid fa-trash"></i></div>
                </div>
                <div className='col-9'>
                    <div className='list-cart-table'>
                        <Table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Màu/Size</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listCard.map((item, index) => {
                                    const stt = index + 1;
                                    return (
                                        <tr key={index}>
                                            <td>
                                            <input
                                                type="checkbox"
                                                className='checked-input-box'
                                                style={{marginRight: "5px"}}
                                                onChange={
                                                (e) => 
                                                changeChecked(e,item.quantity,item.price)
                                            }
                                                value={item.id}
                                            />
                                             {stt} 
                                            </td>
                                            <td>
                                                <Link className='link-name-product'>
                                                    <img className='img-product-link' src={item.img} alt={item.name} />
                                                    <span>{item.name}</span>
                                                </Link>
                                            </td>
                                            <td>{formatPrice(item.price)}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.color}/{item.size}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className='col-3'>
                    <div>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Mô tả</th>
                                    <th>Nội dung</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Số Sản phẩm :</td>
                                    <td>{numberProduct} </td>
                                </tr>
                                <tr>
                                    <td>tổng số lượng :</td>
                                    <td>{quantityAll}</td>
                                </tr>
                                <tr>
                                    <td>Thành tiền :</td>
                                    <td>{formatPrice(money)}</td>
                                </tr>
                                <tr>
                                    <td>Phí ship :</td>
                                    <td>{formatPrice(moneyShip)}</td>
                                </tr>
                                <tr>
                                    <td>Tổng tiền :</td>
                                    <td>{formatPrice(money+moneyShip)}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <button className='paying-btn flex_center' onClick={payying}>
                            <i className="fa-solid fa-cart-shopping"></i>
                            <p>Thanh toán</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListCart;
