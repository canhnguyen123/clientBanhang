import React, { useState, useEffect } from 'react';
import ItemBoxProduct from '../../component/itemBoxProduct';
import axios from 'axios';

import { useParams } from 'react-router-dom';  
function CaseProduct() {
  const { theloai_id } = useParams();
  const [ProductList, setProductList]=useState([]);
  const [titelName, settitelName]=useState('');
  useEffect(() => {
    const apiUrl = `http://localhost:4000/product/case/${theloai_id}`;
    axios
      .get(apiUrl)
      .then(response => {
        if (response.data.results) {
          setProductList(response.data.results);  
          settitelName(response.data.theloai_name);  
         }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);
  console.log(ProductList);
  return (
    <div className="case-product main-95">
        <h4 className='titel-center'>{titelName}</h4>
        <div className="list-case-product">
            {ProductList.map((item,index)=>{
              return(
                 <div className="item-case-product">
                    <ItemBoxProduct
                     product_id={item.product_id} 
                     name={item.product_name}
                     link={item.product_img}
                     price={item.product_price}
                     />
                </div>
              )
            })}
           
        </div>
    </div>
  )
}

export default CaseProduct
