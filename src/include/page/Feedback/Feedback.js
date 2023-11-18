import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
    <div className='pg-85-t flex_center'>
      <div className='container-main row'>
        <div className='col-xl-6 col-sm-12'>
          <form >
            <div className='row'>
                <div className='col-xl-6 col-sm-12 pd-20-10'>
                    <div className='form-input '>
                      <input type='text' required/>
                      <label> Họ tên</label>
                      <div className='icon-item flex_center'><i class="fa-solid fa-user"></i></div>
                  </div>
                </div>
                <div className='col-xl-6 col-sm-12 pd-20-10'>
                    <div className='form-input '>
                      <input type='text' required/>
                      <label>Email</label>
                      <div className='icon-item flex_center'><i class="fa-solid fa-envelope"></i></div>
                  </div>
                </div>
                <div className='col-xl-12 col-sm-12 pd-20-10'>
                    <div className='form-input '>
                      <input type='text' required/>
                      <label>Tiêu đề</label>
                      <div className='icon-item flex_center'><i class="fa-solid fa-heading"></i></div>
                  </div>
                </div>
                <div className='col-12 pd-20-10'>
                  <label className='mg-bt-10'>Nội dung</label><br/>
                <CKEditor
                    editor={ClassicEditor}
                    data="<p></p>"
                    onReady={ editor => {
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                </div>
            </div>
          </form>
        </div>
        <div className='col-xl-6 col-sm-12'>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d251637.95196238213!2d105.6189045!3d9.779349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1699341847736!5m2!1svi!2s"
            width="600"
            height="450"
            style={{
              border: '0',
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>


      </div>

    </div>

  );
}

export default FormExample;