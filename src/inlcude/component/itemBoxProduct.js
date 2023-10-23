import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function ItemBoxProduct(props) {
    const {product_id,name,link,price}=props;
    const [deatil, getDeaitl] = useState([]);
    const clickDeatil = () => {
        // Gọi hàm getDeatil hoặc xử lý tương ứng khi người dùng click Xem chi tiết
        // Ví dụ: getDeatil(product_id);
        alert('Đã click Xem chi tiết cho sản phẩm có ID: ' + product_id);
    };
    const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);  
    return (

        <Card className='item-product' style={{ width: '18rem' }} data-id={product_id}>
            <Card.Img variant="top" src={link} />
            <Card.Body className='infro-product'>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                {formattedPrice}
                </Card.Text>
                <Button onClick={()=> clickDeatil()} className='bg-red-blink btn-add-card button-non'><i class="fa-solid fa-cart-shopping"></i> Mua hàng</Button>
                <Button className='bg-yellow-og btn-add-card button-non mg-5'><i class="fa-solid fa-eye"></i> Xem chi tiết</Button>
            </Card.Body>
            <div className='heart'><div className='heart-icon'><i class="fa-solid fa-heart"></i></div>  </div>
        </Card>
    )
}

export default ItemBoxProduct;
