import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function FormExample() {

    const [validated, setValidated] = useState(false);
    const [toogle, settoogle] = useState(false);
    const tooglePass = () => {
        settoogle(!toogle);  // Toggles the 'toogle' state between true and false
    }
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            return;
        }

        event.preventDefault();

        const formData = new FormData(form);
        const fullName = formData.get('fullName')
        const username = formData.get('username')
        const password = formData.get('password')
        const confirmPassword = formData.get('confirmPassword')
        if (password !== confirmPassword) {

        }

        const userData = {
            fullName: fullName,
            username: username,
            password: password,
        };

        try {
            const response = await axios.post('http://localhost:4000/user/dangki', userData);

            if (response.data.status === 'success') {
                toast.success(response.data.mess, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",

                });

            } else {
                toast.error(response.data.mess, {
                    position: "top-right",
                    autoClose: 5000,
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
            alert('An error occurred while registering. Please try again later.');
        }
    };

    return (
        <div className='item-acount active'>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">

                    <Form.Group className='form-input pd-30-0' as={Col} md="6" >

                        <Form.Group className='form-input' as={Col} md="12" >
                            <i class="fa-solid fa-signature item-icon-input-form"></i>
                            <Form.Control
                                type='text'
                                name='fullName'
                                className='form-input-data'
                                required
                            />
                            <Form.Label className='lable-form'>Họ tên</Form.Label>

                        </Form.Group>
                        <div className='err-text'><span className='err-span'>Lỗi đây nè</span></div>
                    </Form.Group>
                    <Form.Group className='form-input pd-30-0' as={Col} md="6" >

                        <Form.Group className='form-input' as={Col} md="12" >
                            <i class="fa-solid fa-signature item-icon-input-form"></i>
                            <Form.Control
                                type='text'
                                name='username'
                                className='form-input-data'
                                required
                            />
                            <Form.Label className='lable-form'>Số điện thoại</Form.Label>

                        </Form.Group>
                        <div className='err-text'><span className='err-span'></span></div>
                    </Form.Group>
                    <Form.Group className='form-input pd-30-0' as={Col} md="6" >
                        <Form.Group className='form-input' as={Col} md="12" >
                            <i class="fa-solid fa-lock item-icon-input-form"></i>
                            <Form.Control
                                type={toogle ? "text" : "password"}  // Use a ternary operator here
                                name='password'
                                required
                            />
                            <Form.Label className='lable-form' >Mật khẩu</Form.Label>
                            <i className={`fa-regular ${toogle ? 'fa-eye' : 'fa-eye-slash'} check-password eye-open`} onClick={tooglePass}></i>

                        </Form.Group>
                        <div className='err-text'><span className='err-span'></span></div>
                    </Form.Group>
                    <Form.Group className='form-input pd-30-0' as={Col} md="6" >
                        <Form.Group className='form-input' as={Col} md="12" >
                            <i class="fa-solid fa-lock item-icon-input-form"></i>
                            <Form.Control
                                type={toogle ? "text" : "password"}  // Use a ternary operator here
                                name='confirmPassword'
                                required
                            />
                            <Form.Label className='lable-form' >Mật khẩu</Form.Label>
                            <i className={`fa-regular ${toogle ? 'fa-eye' : 'fa-eye-slash'} check-password eye-open`} onClick={tooglePass}></i>

                        </Form.Group>
                        <div className='err-text'><span className='err-span'></span></div>
                    </Form.Group>
                </Row>

                <Button type="submit" className='bg-red-blink btn-login'>Đăng kí</Button>
            </Form>
        </div>
    );
}

export default FormExample;
