import React, { useEffect, useState } from 'react'
import paw from '../assets/paw.png'
import Dropdown from 'react-bootstrap/Dropdown';
import Footer from '../components/Footer'
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Addadmin from '../components/Addadmin';
import { getRequestPetAPI, getMessageAPI, getDashboardPetAPI } from '../service/allAPI';


const AdminHome = () => {
  const navigate = useNavigate();
  const [requestPet, setRequestPet] = useState([]);
  const [userMessage, setUserMessage] = useState([]);
  const [homePet, setHomePet] = useState([]);
  

  const logout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    getrequest();
    getAllMessage();
    getAllPet()
  }, []);

  const getrequest = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const result = await getRequestPetAPI("Pending", { "Authorization": `Bearer ${token}` });
        setRequestPet(result.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getAllMessage = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const result = await getMessageAPI("Pending", { "Authorization": `Bearer ${token}` });
        setUserMessage(result.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getAllPet = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const reqHeaders = {
            "Authorization": `Bearer ${token}`
        };
        try {
            const result = await getDashboardPetAPI("",reqHeaders);
            setHomePet(result.data);
        } catch (err) {
            console.log(err);
        }
    }
      };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar bg-warning p-2 shadow-lg">
        <div className="container-fluid">
          <Link className="d-flex navbar-brand align-items-center fs-2">
            <img className='me-4' src={paw} width={70} alt="logo" />
            <h2 style={{ fontFamily: "Flavors" }}>AdoptPaw</h2>
          </Link>
          <div className="text-center">
          <h2 className="font-monospace fw-semibold">ADMIN DASHBOARD</h2>
        </div>
          <ul className="nav justify-content-end">
            <Dropdown>
              <Dropdown.Toggle variant="white" className='shadow-lg'>
                <i className="fa-solid fa-user"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
        </div>
      </nav>

     <div className='bgadmin'>
       
        
  
       
        <div style={{paddingBottom:'200px', paddingTop:'200px'}} className=" cards d-flex flex-wrap justify-content-center gap-4 px-4 ">
  
         
          <div className="card cardsadmin shadow p-3">
            <h3><i className="fa-solid fa-plus me-2 text-success"></i>Add New Pet</h3>
            <p>Add pets to the adoption system with image, age, and breed.</p>
            <Addadmin addNewPet={getAllPet} />
          </div>
  
          
          <div className="card cardsadmin shadow p-3">
            <h3><i className="fa-solid fa-paw me-2 text-primary"></i>All Pets</h3>
            <p>View, edit, or remove pets from the database.</p>
            {homePet?.length > 0 ? (
                <span className="badge text-dark fs-6">Pets in system: {homePet.length}</span>
              ) : (
                <span className="text-muted">No new requests</span>
              )}
            <Link className="btnn mt-auto" to={"/admindash"}>Manage</Link>
          </div>
  
          <div className="card cardsadmin shadow p-3">
            <h3><i className="fa-solid fa-envelope-open-text me-2 text-warning"></i>View Requests</h3>
            <p>Check and manage user adoption requests and details.</p>
            <div className="mb-2">
              {requestPet?.length > 0 ? (
                <span className="badge bg-danger fs-6">New Requests: {requestPet.length}</span>
              ) : (
                <span className="text-muted">No new requests</span>
              )}
            </div>
            <Link className="btnn mt-auto" to={"/request"}>View Requests</Link>
          </div>
  
        
          <div className="card cardsadmin shadow p-3">
            <h3><i className="fa-solid fa-message me-2 text-info"></i>Messages</h3>
            <p>Check inquiries or messages submitted by users.</p>
            <div className="mb-2">
              {userMessage?.length > 0 ? (
                <span className="badge bg-danger fs-6">New Messages: {userMessage.length}</span>
              ) : (
                <span className="text-muted">No new messages</span>
              )}
            </div>
            <Link className="btnn mt-auto" to={"/messages"}>View</Link>
          </div>
  
        </div>
     </div>

      <Footer />
    </>
  );
};

export default AdminHome;
