
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { addMessageAPI } from "../service/allAPI";
import paw from '../assets/paw.png'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import '../App.css';



const ContactUs = () => {

  const [toastShow, setToastShow] = useState(false);
  const [dispmsg, setDispmsg] = useState("")
  
  const [messageDetails,setMessageDetails] = useState({
    name:"",
    email:"",
    message:""
  })
  // console.log(messageDetails);

  const addMessage = async()=>{
    const {name,email,message} = messageDetails
    if(name && email && message){
      const currentDate = new Date().toLocaleDateString('en-GB');    
      
      const reqBody = new FormData()
      reqBody.append("name",name)
      reqBody.append("email",email)
      reqBody.append("message",message)
      reqBody.append("date",currentDate)
      try{
        const result = await addMessageAPI(reqBody)
        if(result.status==200){
          setDispmsg("Messsage send successfully")
          setToastShow(true)
          setMessageDetails({ name: "", email: "", message: "" });
        }else{
          alert(result.response.data)
        }

      }catch(err){
        console.log(err);
      }
    }else{
      setDispmsg("Please fill the form")
      setToastShow(true)
    }
  }
  
  return (
    <>

    {/* Toast Container */}
    <ToastContainer className="position-fixed end-0 top-0 p-3" style={{ zIndex: 2 }}>
        <Toast show={toastShow} onClose={() => {setToastShow(false); setDispmsg("")}} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">AdoptPaw</strong>
          </Toast.Header>
          <Toast.Body style={{backgroundColor: '#dee2e6'}} className="text-black">{dispmsg}</Toast.Body>
        </Toast>
      </ToastContainer>

<Header/>

<div className="py-5 d-flex justify-content-center align-items-center" style={{backgroundColor:'#f2f2f2'}}>
      <Container className="p-5 bg-warning rounded-4 shadow-lg" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-center align-items-center mb-3">
        <img src={paw} width={90} className="me-3" alt="Paw" />
        <h2 className="fw-bold text-dark m-0">Get in Touch</h2>
      </div>
        <p className="text-center text-muted">We'd love to hear from you! Fill out the form below.</p>

        <Row className="justify-content-center">
          <Col md={10}>
            <Form>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label className="fw-semibold">Your Name</Form.Label>
                <Form.Control value={messageDetails.name} onChange={e=>setMessageDetails({...messageDetails, name:e.target.value})} type="text" placeholder="Enter your name" className="p-3 rounded-3" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label className="fw-semibold">Email Address</Form.Label>
                <Form.Control value={messageDetails.email} onChange={e=>setMessageDetails({...messageDetails,email:e.target.value})} type="email" placeholder="Enter your email" className="p-3 rounded-3" />
              </Form.Group>

              <Form.Group className="mb-4" controlId="message">
                <Form.Label className="fw-semibold">Your Message</Form.Label>
                <Form.Control value={messageDetails.message} onChange={e=>setMessageDetails({...messageDetails,message:e.target.value})} as="textarea" rows={4} placeholder="Enter your message" className="p-3 rounded-3" />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button onClick={addMessage} variant="primary" className="send-btn">Send Message</Button>
              </div>
            </Form>
          </Col>
        </Row>

        {/* Embedded Google Map */}
        <Row className="justify-content-center mt-5">
          <Col md={10}>
            <h4 className="text-center text-dark fw-bold mb-3">Our Location</h4>
            <div className="rounded-4 overflow-hidden shadow-lg">
              <iframe
                title="Kochi Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25107.26773399952!2d76.26730474999999!3d9.931232199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d0b6df93a8b%3A0x94ab5096f3c00000!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1640102389211!5m2!1sen!2sin"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </div>

    <Footer/>

    </>
  )
}

export default ContactUs