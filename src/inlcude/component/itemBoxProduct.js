import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ItemBoxProduct(props) {
    const { product_id, name, link, price } = props;
    const [ListCart, setListCart] = useState([]);
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
                <Button className='bg-red-blink btn-add-card button-non's>
                    <i className="fa-solid fa-cart-shopping"></i> Mua hàng
                </Button>
                <Link to={`/detail/${product_id}`}>
                    <Button className='bg-yellow-og btn-add-card button-non mg-5'>
                        <i className="fa-solid fa-eye"></i> Xem chi tiết
                    </Button>
                </Link>
            </Card.Body>
            <div className='heart'>
                <div className='heart-icon' >
                    <i className="fa-solid fa-heart"></i>
                </div>
            </div>
        </Card>
    );
}

export default ItemBoxProduct;
