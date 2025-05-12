import React, { useState } from 'react'
import '../App.css';
import paw from '../assets/paw.png'
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';




const Header = () => {

    const navigate = useNavigate();

    const [toastShow, setToastShow] = useState(false);

    const handleProject = () => {
        if (sessionStorage.getItem('token')) {
          navigate('/dashboard');
        } else {
            setToastShow(true)
        //   alert("Please Login To View More..");
        }
      };

    const logout=()=>{
        navigate('/login')
        sessionStorage.clear()
    }

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
  
    <nav className="navbar bg-warning p-2 shadow-lg">
        <div className="container-fluid ms-5">
            
            <a className="d-flex navbar-brand fs-2" href="/">
            <a href="/"><img  className='me-4' src={paw} width={70}  alt="" /></a>
            <h2 style={{fontFamily:"Flavors"}}>AdoptPaw</h2>
            </a>

            <ul className="nav justify-content-end">
                <li className="nav-item rounded clk border border-warning">
                    <Link className='btn rounded' style={{textDecoration:'none',color:'black'}} to={'/'}>HOME</Link>      
                </li>
            
                <li className="nav-item rounded clk">
                    {/* <Link className='btn rounded' onClick={handleProject} style={{textDecoration:'none',color:'black'}}>GALLERY</Link> */}
                    <button className='btn rounded' onClick={handleProject} style={{textDecoration:'none',color:'black', background:'none', border:'none'}}>GALLERY</button>
                </li>

                <li className="nav-item rounded clk">
                    <Link className='btn rounded' style={{textDecoration:'none',color:'black'}} to={'/contact'}>CONTACT US</Link>
                </li>

                {/* <li className="nav-item rounded clk">
                    <Link className='btn rounded' style={{textDecoration:'none',color:'black'}} to={'/admindash'}>ADMIN CONTROL</Link>
                </li> */}

                <Dropdown className='ms-5'>
                    <Dropdown.Toggle variant="white" id="dropdown-basic" className='shadow-lg clk bg-white'>
                        <i className="fa-solid fa-user"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>

                        {
                            sessionStorage.getItem("token")?
                            (
                                <>
                                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                                    
                                </>
                            )
                            :
                            (
                                <>
                            <Dropdown.Item href="/login">login</Dropdown.Item>
                            <Dropdown.Item href="/register">register</Dropdown.Item>
                            </>
                            )
                        }
                        
                    </Dropdown.Menu>
                </Dropdown>

                
            </ul>
        </div>
    </nav>
 
    </>
  )
}

export default Header