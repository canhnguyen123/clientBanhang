import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemTheLoai from '../../component/itemTheLoai'
import { Link } from 'react-router-dom';

function MenuCategory() {
    const [listTheloai, setListTheLoai] = useState([]);
    const [listCategory, setlistCategory] = useState([]);
    const [listPhanLoai, setlistPhanLoai] = useState([]);
    const [category_id, setcategory_id] = useState(0);
    const [phanloai_id, setphanloai_id] = useState(0);
    const [defaultCategoryId, setdefaultCategoryId] = useState(false);
    const [defaultPhanLoaiId, setdefaultPhanLoaiId] = useState(false);

    const chanCategory_id = (category_id) => {
        setcategory_id(category_id);
    }
    const chanPhanLoai_id = (phanloai_id) => {
        setphanloai_id(phanloai_id);
    }

    useEffect(() => {
        const apiUrlCategory = `http://localhost:4000/theloai/get-category`;
        axios
            .get(apiUrlCategory)
            .then(response => {
                if (response.data.results) {
                    setlistCategory(response.data.results);
                    if (!defaultCategoryId && response.data.results.length > 0) {
                        setcategory_id(response.data.results[0].id);
                        setdefaultCategoryId(true);
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
            const apiUrlPhanLai = `http://localhost:4000/theloai/get-phanloai`;
            axios
                .get(apiUrlPhanLai)
                .then(response => {
                    if (response.data.results) {
                        setlistPhanLoai(response.data.results);
                        if (!defaultPhanLoaiId && response.data.results.length > 0) {
                            setphanloai_id(response.data.results[0].id);
                            setdefaultPhanLoaiId(true);
                        }
                    }
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
    },[]); 
  
   
    useEffect(() => {
        filterTheLoai(category_id, phanloai_id);
    }, [category_id, phanloai_id]);
    
    const filterTheLoai = (category_id, phanloai_id) => {
        const theloaiData = {
            category_id: category_id,
            phanloai_id: phanloai_id
        };
        const apiUrlTheloai = `http://localhost:4000/theloai/fitter-theloai`;
        axios
            .post(apiUrlTheloai, theloaiData)
            .then(response => {
                if (response.data.results) {
                    setListTheLoai(response.data.results);
                }
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };
    console.log(listTheloai)
    return (
        <div className='list-case'>
            <div className='list-category flex_start'>
                {listCategory.map((item, index) => {
                    return (
                        <div onClick={() => chanCategory_id(item.id)} className={`item-category flex_center ${item.id === category_id ? 'active' : ''}`}>
                            <span>{item.name}</span>
                        </div>
                    )
                })}

            </div>
            <div className='list-main-menu'>
                <div className='list-phanloai'>
                    {listPhanLoai.map((item, index) => {
                        return (
                            <div onClick={() => chanPhanLoai_id(item.id)} className={`item-phanloai ${item.id === phanloai_id ? 'active' : ''}`}>
                                <span>{item.name}</span>
                            </div>
                        )
                    })
                    }
                </div>
                <div className='list-theloai'>
                    {listTheloai.map((item,index)=>{
                        return(
                            <Link to={`/case/${item.id}`}>
                               <div className='item-theloai'>
                                    <ItemTheLoai id={item.id} name={item.name} link={item.link} />
                                </div>
                            </Link>
 
                           
                        )
                    })}
                    
                </div>
            </div>
        </div>
    );
}

export default MenuCategory;
