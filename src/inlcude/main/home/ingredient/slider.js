import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';

function Slider() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:4000/banner/';

    axios
      .get(apiUrl)
      .then(response => {
        if (response.data.results) {
          setImages(response.data.results);
        }
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  return (
    <Carousel data-bs-theme="dark" className='list-banner'>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={image.linkImg}  // Thay đổi src thành linkImg từ API
            alt={`Ảnh thứ ${index + 1}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;
