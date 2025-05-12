import React from 'react'
import '../App.css';
import paw from '../assets/paw.png'
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import '../App.css';
import { useNavigate } from 'react-router-dom';



const AdminHeader = () => {

    const navigate = useNavigate();

    const logout =()=>{
        sessionStorage.clear()
        navigate('/login')
    }


  return (
    <>

        <nav className="navbar bg-warning p-2 shadow-lg">
            <div className="container-fluid">
                <a className="d-flex navbar-brand fs-2">
                <a><img className='me-4' src={paw} width={70}  alt=""/></a>
                <h2 style={{fontFamily:"Flavors"}}>AdoptPaw</h2>
                </a>
    
                <ul className=" nav justify-content-end">

                    <li className="nav-item rounded clk me-5">
                        <Link className="nav-link active" style={{textDecoration:'none'}} to={'/adminhome'}>Dashboard</Link>

                    </li>

                    <Dropdown>
                        <Dropdown.Toggle variant="white" id="dropdown-basic" className='shadow-lg'>
                            <i class="fa-solid fa-user"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                                
                        </Dropdown.Menu>
                    </Dropdown>

                    
                </ul>
            </div>
        </nav>

    </>
  )
}

export default AdminHeader