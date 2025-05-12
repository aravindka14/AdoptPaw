import React, { useEffect, useState } from 'react';
import '../App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { getHomePetAPI } from '../service/allAPI';
import serverURL from '../service/serverURL';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { requestPetAPI } from '../service/allAPI';
import Modal from 'react-bootstrap/Modal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
dayjs.extend(advancedFormat);


function MyVerticallyCenteredModal(props) {

  const { pet, requestpet, onHide } = props;
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [toastmsg,setToastmsg] = useState("")
  const [toastShow, setToastShow] = useState(false);



  const handleRequest = () => {
    if (sessionStorage.getItem('token')) {
      const formattedDate = selectedDate.format('dddd, MMMM D, YYYY');
      requestpet(pet._id,formattedDate);
      onHide(); 
      
    } else {
      setToastmsg("Please Login To Continue")
      setToastShow(true)
    }
  };


  return (

    <>

     {/* Toast Container */}
     <ToastContainer className="position-fixed end-0 top-0 p-3" style={{ zIndex: 1060 }}>
        <Toast show={toastShow} onClose={() => {setToastShow(false); setToastmsg("")}} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">AdoptPaw</strong>
          </Toast.Header>
          <Toast.Body style={{backgroundColor: '#dee2e6'}} className="text-black">{toastmsg}</Toast.Body>
        </Toast>
      </ToastContainer>


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
    
    </>

    
  );

}


const Cardview = () => {

  const [selectedPet, setSelectedPet] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);

  const [homePet, setHomePet] = useState([]);

  const [toastmsg,setToastmsg] = useState("")
  const [toastShow, setToastShow] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    getAllPet();
  }, []);

  const getAllPet = async () => {
    try {
      const result = await getHomePetAPI();
      setHomePet(result.data);
    } catch (err) {
      console.log(err);
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
              setToastmsg("Request Send Successfully")
              setToastShow(true)
              
          
          }catch(err){
              console.log(err);
          
          }
      }   
  }


  const handleProject = () => {
    if (sessionStorage.getItem('token')) {
      navigate('/dashboard');
    } else {
      setToastmsg("Please Login To View More..")
      setToastShow(true)
      
    }
  };

  return (
    <>

        {/* Toast Container */}
        <ToastContainer className="position-fixed end-0 top-0 p-3" style={{ zIndex: 2 }}>
        <Toast show={toastShow} onClose={() => {setToastShow(false); setToastmsg("")}} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">AdoptPaw</strong>
          </Toast.Header>
          <Toast.Body style={{backgroundColor: '#dee2e6'}} className="text-black">{toastmsg}</Toast.Body>
        </Toast>
      </ToastContainer>

      <div className="container mt-5 pt-5">
  <div className="row g-4 justify-content-center">
    {homePet?.map((pet, index) => (
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

            <Button variant="outline-primary" onClick={() => { setSelectedPet(pet);setModalShow(true);}} className="rounded-pill px-4">Request</Button>

          </Card.Body>
        </Card>
      </div>
    ))}

<MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} pet={selectedPet} requestpet={requestpet}/>

  </div>
</div>

<div className="row p-5 text-center">
  <div className="col">
    <Button className="btn-animate shadow" onClick={handleProject} variant="warning">Click Here to View More</Button>
  </div>
</div>

    </>
  );
};

export default Cardview;
