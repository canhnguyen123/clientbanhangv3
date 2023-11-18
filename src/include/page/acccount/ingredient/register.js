import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

function FormExample() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form className='form-login' noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
      <Form.Group className='form-input mg-15' as={Col} md="12">
        <div className='icon-item flex_center'><i class="fa-solid fa-signature"></i></div>
          <Form.Control
            required
            type="text"
          />
           <Form.Label>Họ tên</Form.Label>
        </Form.Group>
        <Form.Group className='form-input mg-15' as={Col} md="12">
        <div className='icon-item flex_center'><i class="fa-solid fa-user"></i></div>
          <Form.Control
            required
            type="text"
          />
           <Form.Label>Tên đăng nhập</Form.Label>
        </Form.Group>
        <Form.Group className='form-input mg-15' as={Col} md="12">
        <div className='icon-item flex_center'><i class="fa-solid fa-lock"></i></div>
          <Form.Control
            required
            type="text"
          />
           <Form.Label>Mật khẩu</Form.Label>
           <i class="fa-solid fa-eye eye-icon"></i>
           <i class="fa-regular fa-eye-slash eye-icon"></i>
        </Form.Group>
        <Form.Group className='form-input mg-15' as={Col} md="12">
        <div className='icon-item flex_center'><i class="fa-solid fa-lock"></i></div>
          <Form.Control
            required
            type="text"
          />
           <Form.Label>Xác nhận khẩu</Form.Label>
           <i class="fa-solid fa-eye eye-icon"></i>
           <i class="fa-regular fa-eye-slash eye-icon"></i>
        </Form.Group>
       </Row>
            <button className='btn-login flex_center'>
              <p>  Đăng kí</p>
             </button>
            
    </Form>
      
  );
}

export default FormExample;