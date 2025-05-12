import React, { use, useEffect } from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import imgPreview from '../assets/preview.png'
import { addPetAPI } from '../service/allAPI';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import '../App.css';


const Addadmin = ({ addNewPet }) => {

  const [toastShow, setToastShow] = useState(false);

  const [imageFileStatus,setImageFileStatus] = useState(false)
  // add pet image preview
  const [preview,setPreview] = useState("")

    const [projectDetails,setProjectDetails] = useState({
        name:"",
        age:"",
        breed:"",
        category:"",
        petImg:"",
        sex:"",
      })
      console.log(projectDetails);
      
      

    const [show, setShow] = useState(false);

    useEffect(()=>{
      if(projectDetails.petImg.type=='image/png'  || projectDetails.petImg.type=='image/jpg'  || projectDetails.petImg.type=='image/jpeg'){
        setImageFileStatus(true)
        setPreview(URL.createObjectURL(projectDetails.petImg))
      }else{
        setImageFileStatus(false)
        setPreview("")
        setProjectDetails({...projectDetails,petImg:""})
      }
    },[projectDetails.petImg])

    const handleClose = () =>{
       setShow(false);
       setPreview('')
       setImageFileStatus(false)
       setProjectDetails({
        name:"",
        age:"",
        breed:"",
        category:"",
        petImg:"",
        sex:"",
       })
      }
    const handleShow = () => setShow(true);

    const handleAddProject = async()=>{
        const {name,age,breed,category,petImg,sex} = projectDetails
        console.log("inside handleAddProject");
        console.log(projectDetails);
        
        
        if(name && age && breed && category && petImg && sex){
            const reqBody = new FormData()
            reqBody.append("name",name)
            reqBody.append("age",age)
            reqBody.append("breed",breed)
            reqBody.append("category",category)
            reqBody.append("petImg",petImg)
            reqBody.append("sex",sex)

            const token = sessionStorage.getItem("token")
            if(token){
              const reqHeaders = {
                "Content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token}`
              }
              try{

                const result = await addPetAPI(reqBody,reqHeaders)
                if(result.status==200){
                  // alert("Pet Added successfully")
                  setToastShow(true)
                  handleClose()
                  addNewPet();
                }else{
                  alert(result.response.data)
                }

              }catch(err){
                console.log(err);
                
              }
              
            }

            handleClose()
        }else{
            alert("Please fill the form")
        }

    }

  return (
    <>

    {/* Toast Container */}
    <ToastContainer className="position-fixed end-0 top-0 p-3" style={{ zIndex: 2 }}>
        <Toast show={toastShow} onClose={() => setToastShow(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">AdoptPaw</strong>
          </Toast.Header>
          <Toast.Body className="text-black bg-success">Pet Added successfully</Toast.Body>
        </Toast>
    </ToastContainer>


      <button onClick={handleShow} className='btnn mt-auto'>Add Pet</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        <div className='row align-items-center'>
          <div className='d-flex justify-content-center'>
                <label>
                        <input style={{display:'none'}} onChange={e => setProjectDetails({ ...projectDetails, petImg: e.target.files[0]})} type="file" />
                        <img style={{ width: '13rem' }} className='img-fluid' src={preview?preview:imgPreview} alt="" />
                </label>
          </div>
              <div className='mt-2 mb-2'>
                <input onChange={e => setProjectDetails({ ...projectDetails, name: e.target.value })} type="text" className='form-control' placeholder='Name' />
              </div>
              <div className='mb-2'>
                <input onChange={e => setProjectDetails({ ...projectDetails, age: e.target.value })} type="text" className='form-control' placeholder='Age' />
              </div>
              <div className='mb-2'>
              {/* <input onChange={e => setProjectDetails({ ...projectDetails, sex: e.target.value })} type="text" className='form-control' placeholder='Sex'/>        */}
              <select onChange={e => setProjectDetails({ ...projectDetails, sex: e.target.value })} class="form-select" aria-label="Default select example">
                  <option value="" disabled hidden selected>Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className='mb-2'>
                <input onChange={e => setProjectDetails({ ...projectDetails, breed: e.target.value })} type="text" className='form-control' placeholder='Breed' />
              </div>
              <div className='mb-2'>
                {/* <input onChange={e => setProjectDetails({ ...projectDetails, category: e.target.value })} type="text" className='form-control' placeholder='Category' /> */}
                <select onChange={e => setProjectDetails({ ...projectDetails, category: e.target.value })} class="form-select" aria-label="Default select example">
                  <option value="" disabled hidden selected>Category</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                </select>
              </div>
        </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProject}>
            Upload 
          </Button>
        </Modal.Footer>
      </Modal>
    
    </>
  )
}

export default Addadmin