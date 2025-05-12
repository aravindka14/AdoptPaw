import React from 'react'
import { Link } from 'react-router-dom'
import paw from '../assets/paw.png'
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useState } from 'react'
import '../App.css';





const Footer = () => {

  const [toastShow, setToastShow] = useState(false);
  const navigate = useNavigate();

  const handleProject = () => {
    if (sessionStorage.getItem('token')) {
      navigate('/dashboard');
    } else {
        setToastShow(true)
    //   alert("Please Login To View More..");
    }
  };

  return (
    <>

    {/* Toast Container */}
    <ToastContainer className="position-fixed end-0 top-0 p-3" style={{ zIndex: 2 }}>
        <Toast show={toastShow} onClose={() => setToastShow(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">AdoptPaw</strong>
          </Toast.Header>
          <Toast.Body style={{backgroundColor: '#dee2e6'}} className="text-black">Please Login To View More..</Toast.Body>
        </Toast>
      </ToastContainer>


    <div style={{ height: 'auto',background: "url('https://i.pinimg.com/1200x/53/ab/fb/53abfb434ba41a06e3e934cdc93059ce.jpg') center/cover no-repeat" }} className='rounded pt-4 w-100'>
  <div className='container'>
    <div className='d-flex flex-wrap justify-content-around align-items-start'>

      {/* Intro */}
      <div style={{ maxWidth: '400px' }} className='mb-4'>
        <h4>
          <img className='me-3 text-black' src={paw} width={50} alt="" />
          <span className='text-black fs-4'>AdoptPaw</span>
        </h4>
        <p>Connecting paws with people. AdoptPaw is your trusted platform to give loving homes to pets in need.</p>
        <p className=" small">© {new Date().getFullYear()} AdoptPaw. All rights reserved.</p>
        <p className=" small">Code licensed MIT, docs CC BY 3.0.</p>
        <p className=" small">Currently v5.3.3.</p>
      </div>

      {/* Links */}
      <div className='d-flex flex-column mb-4'>
        <h5>Links</h5>
        <Link to={'/'} className='text-decoration-none text-muted footer-link'>Home</Link>
        <Link to={'/login'} className='text-decoration-none text-muted footer-link'>Login</Link>
        <button className='text-decoration-none text-muted footer-link' onClick={handleProject} style={{textDecoration:'none', background:'none', border:'none'}}>Available Pets</button>
        <Link to={'/contact'} className='text-decoration-none text-muted footer-link'>Contact Us</Link>
      </div>

      {/* Contact */}
      <div className='mb-4'>
        <h5 className='mb-1 text-black'>Get in touch with us</h5>
        <div className='d-flex'>
          {/* <input type="text" placeholder='Enter Your Email' className='form-control me-2' /> */}
          {/* <button style={{color: 'white', backgroundColor:'#FCB454'}} className='btn shadow-lg'>Contact Us</button> */}
          <Link to={'/contact'} className='text-decoration-none btn shadow-lg footer-link'>Email Us</Link>
        </div>

        <div className='mt-2'> 
          <i className="fa-solid fa-phone text-black fa-lg"></i>
          <span className='ms-2 text-muted'>+91 9896213256</span>
        </div>  

        <h5 className='mt-3 text-black'>Follow Us On</h5>
        <div className='d-flex gap-3'>
          <a href="#" className=' fs-4'><i className="fa-brands fa-twitter text-muted footer-link fa-lg"></i></a>
          <a href="#" className=' fs-4'><i className="fa-brands fa-instagram text-muted footer-link fa-lg"></i></a>
          <a href="#" className=' fs-4'><i className="fa-brands fa-facebook text-muted footer-link fa-lg"></i></a>
        </div>
      </div>
      
    </div>
  </div>
</div>

    </>
  )
}

export default Footer