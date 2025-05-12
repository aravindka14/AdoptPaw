import * as React from 'react';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getDashboardPetAPI , requestPetAPI } from '../service/allAPI';
import { Button, Card } from 'react-bootstrap';
import serverURL from '../service/serverURL';

import Modal from 'react-bootstrap/Modal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { Pagination } from '@mui/material';
dayjs.extend(advancedFormat);


function MyVerticallyCenteredModal(props) {

    const { pet, requestpet, onHide } = props;
    const [selectedDate, setSelectedDate] = React.useState(dayjs());

    const handleRequest = () => {
        const formattedDate = selectedDate.format('dddd, MMMM D, YYYY');
        requestpet(pet._id,formattedDate);
        onHide(); 
      };


    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Set date for your visit at the store
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h5>You're requesting: {pet?.name}</h5>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            sx={{ mt: 2, width: '50%' }}
          />
        </LocalizationProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleRequest}>Send Request</Button>
        </Modal.Footer>
      </Modal>
    );

}
  


const Dashboard = () => {

    const [selectedPet, setSelectedPet] = useState("");

    const [toastShow, setToastShow] = useState(false);
  

    const [modalShow, setModalShow] = useState(false);

    const [searchKey,setSearchKey] = useState("")
    const [homePet, setHomePet] = useState([]);

    // pagination
    const [page, setPage] = useState(1);
    const itemsPerPage = 6; 

    
    const totalPages = Math.ceil(homePet?.length / itemsPerPage);

    // Get pets for the current page
    const paginatedPets = homePet?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
    );



    useEffect(() => {
        getAllPet();
        
    }, [searchKey]);

    const getAllPet = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeaders = {
                "Authorization": `Bearer ${token}`
            };
            try {
                const result = await getDashboardPetAPI(searchKey,reqHeaders);
                setHomePet(result.data);
            } catch (err) {
                console.log(err);
            }
        }
    };


    const requestpet = async(id,formattedDate)=>{
 
        const token = sessionStorage.getItem("token")
        const userData = sessionStorage.getItem("user");
        const currentDate = new Date().toLocaleDateString('en-GB')
        
        let user = JSON.parse(userData);
        const reqBody = {
            petId: id,
            username: user.username,
            email: user.email,
            date:formattedDate,
            reqdate:currentDate
        }
        if(token){
            const reqHeader = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
            }

            try{
                const result = await requestPetAPI(reqBody,reqHeader)
                if(result.status==200){
                  setToastShow(true);

                }
                if(result.status==406){
                  alert("Request already send, Need to be accepted by Admin")
                }
            
            }catch(err){
                console.log(err);
                
            
            }
        }
    }


    return (
        <>

      {/* Toast Container */}
    <ToastContainer className="position-fixed end-0 top-0 p-3" style={{ zIndex: 5000 }}>
        <Toast show={toastShow} onClose={() => setToastShow(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">AdoptPaw</strong>
          </Toast.Header>
          <Toast.Body className="text-black bg-success">Request Send Successfully</Toast.Body>
        </Toast>
    </ToastContainer>

    <Header />

<div style={{backgroundColor:'#f2f2f2'}}>
    <div className="container py-5 ">
    <div className="text-center">
      <h2 className="mb-4 fw-bold">Find Your Companion</h2>
    </div>
  
    {/* Search & Filter Section */}
    <div className="row mb-4 justify-content-center">
      <div className="col-md-4">
        <select onChange={e => setSearchKey(e.target.value)} className="form-select shadow-sm" aria-label="Filter by category">
          <option value="" disabled selected hidden>Search by Category</option>
          <option value="">All</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>
      </div>
    </div>
  
    {/* Pet Cards */}
    <div className="container mt-5 pt-3">
      <div className="row g-4 justify-content-center">
        {paginatedPets?.map((pet, index) => (
          <div key={index} className="col-md-4 d-flex justify-content-center">
            <Card style={{ width: '20rem', borderRadius: '20px' }} className="shadow-lg border-0 card-hover">
            <Card.Img variant="top" src={`${serverURL}/uploads/${pet?.petImg}`} style={{height: '220px',objectFit: 'cover',borderTopLeftRadius: '20px',borderTopRightRadius: '20px',}}/>
              <Card.Body className="text-center">
                <Card.Title className="fw-bold fs-4 mb-3 text-primary">{pet.name}</Card.Title>
                <div className="text-start">
                  <p className="mb-1"><strong>Age:</strong> {pet.age}</p>
                  <p className="mb-1"><strong>Breed:</strong> {pet.breed}</p>
                  <p className="mb-1"><strong>Sex:</strong> {pet.sex}</p>
                  <p className="mb-3"><strong>Category:</strong> {pet.category}</p>
                </div>
                <Button className="rounded-pill px-4" variant="primary"  onClick={() => { setSelectedPet(pet);setModalShow(true);}}>
                  Request
                </Button>
  
              </Card.Body>
            </Card>
          </div>
         
        ))}
  
        <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} pet={selectedPet} requestpet={requestpet}/>
  
        <div className="d-flex justify-content-center mb-5 mt-5 my-4">
          <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} color="primary" variant="outlined" shape="rounded"/>
        </div>
  
     
         
      </div>
    </div>
    </div>
</div>

<Footer/>
        
</>
);
};

export default Dashboard;
