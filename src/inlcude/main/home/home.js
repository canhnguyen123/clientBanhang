import React, { useState, useEffect } from 'react';
import Slider from "./ingredient/slider";
import ShowProduct from "./ingredient/showProduct";
import StikSlider from "./ingredient/stikkSlider"
import axios from 'axios';

function Home() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:4000/product/';

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

  return (
    <div>
      <Slider />
      <div className='home'>
        <StikSlider />
        {productList.map(theloai=>(
         <ShowProduct id={theloai.theloai_id}  titel={theloai.name} productList={theloai.products} />
        ))}
      </div>
    </div>
  );
}

export default Home;
