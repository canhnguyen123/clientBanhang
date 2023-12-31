import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { withRoute } from 'react-router';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select"
import { useNavigate } from 'react-router-dom';

function FormExample() {
    const [validated, setValidated] = useState(false);
    const [toogle, settoogle] = useState(false);
    const tooglePass = () => {
        settoogle(!toogle);  
    }
    useEffect(() => {
        const userInfo = localStorage.getItem('user_id');
        if (userInfo) {
            toast.warn('Đã đăng nhập không thể vào trang', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } 
      }, []);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        event.preventDefault();
        const formData = new FormData(form);
        const userData = {
            username: formData.get('username'),
            password: formData.get('password'),
        };
        try {
            const response = await axios.post('http://localhost:4000/user/login', userData);

            if (response.data.status === 'success') {
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
                const user_id = response.data.user_id
                const token = response.data.token
                localStorage.setItem('user_id',user_id);
                localStorage.setItem('token',token);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                toast.error(response.data.mess, {
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
        } catch (error) {
            console.error('Error posting data to the API:', error);
        }
    };

    return (
        <div className='item-acount active'>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group className='form-input' as={Col} md="6" >
                        <i class="fa-solid fa-user item-icon-input-form"></i>
                        <Form.Control
                            type='text'
                            name='username'
                            required
                        />
                        <Form.Label className='lable-form'>Tên đăng nhập</Form.Label>
                    </Form.Group>
                    <Form.Group className='form-input' as={Col} md="6" >
                        <i class="fa-solid fa-lock item-icon-input-form"></i>
                        <Form.Control
                            type={toogle ? "text" : "password"}  // Use a ternary operator here
                            name='password'
                            required
                        />
                        <Form.Label className='lable-form' >Mật khẩu</Form.Label>
                        <i className={`fa-regular ${toogle ? 'fa-eye' : 'fa-eye-slash'} check-password eye-open`} onClick={tooglePass}></i>

                    </Form.Group>
                    {/* <div>
                         <Select options={options} />
                        </div> */}
                </Row>


                <Button type="submit" className='bg-red-blink btn-login'>Đăng nhập</Button>
            </Form>
            <div className='other-item-login flex_center'>
                <span>Hoặc</span>
                <div className='other-item-login-icon flex_center bg-face'>
                    <i class="fa-brands fa-facebook"></i>
                </div>
                <div className='other-item-login-icon bg-gg flex_center'>
                    <i class="fa-brands fa-google"></i>
                </div>
            </div>
        </div>

    );
}

export default FormExample;