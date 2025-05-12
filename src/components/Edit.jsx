import React, { use, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import serverURL from '../service/serverURL';
import { editPetAPI } from '../service/allAPI';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';




const Edit = ({pet, refreshPets}) => {

  const [toastShow, setToastShow] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('dark'); 
  

    const [show, setShow] = useState(false);
    const [preview,setPreview] = useState("")
    const [imageFileStatus,setImageFileStatus] = useState(false)
    const [projectDetails,setProjectDetails] = useState({
        id:pet._id,
        name:pet.name,
        age:pet.age,
        breed:pet.breed,
        category:pet.category,
        petImg:pet.petImg,
        sex:pet.sex
    }) 
    // console.log(projectDetails);


    useEffect(() => {
      if (projectDetails.petImg instanceof File) {
          setImageFileStatus(true);
          setPreview(URL.createObjectURL(projectDetails.petImg));
      } else {
          setImageFileStatus(false);
          setPreview(`${serverURL}/uploads/${pet.petImg}`);
      }
  }, [projectDetails.petImg]);

       
  const handleClose = () => {
    setShow(false)
    setProjectDetails({
        id:pet._id,
        name:pet.name,
        age:pet.age,
        breed:pet.breed,
        category:pet.category,
        petImg:pet.petImg,
        sex:pet.sex
      })

  }

  const handleShow = () => {
    setShow(true)
    setProjectDetails({
        id:pet._id,
        name:pet.name,
        age:pet.age,
        breed:pet.breed,
        category:pet.category,
        petImg:pet.petImg,
        sex:pet.sex
      })
  }


  const editPet = async()=>{
    const {id,name,age,breed,category,petImg,sex} = projectDetails
    if(name && age && breed && category && sex){
        const reqBody = new FormData()
        reqBody.append("name",name)
        reqBody.append("age",age)
        reqBody.append("breed",breed)
        reqBody.append("category",category)
        reqBody.append("sex",sex)
        // reqBody.append("petImg",petImg)
        // preview? reqBody.append("petImg",petImg) : reqBody.append("petImg",pet.petImg)  

        // Append image only if a new image is selected
        if (imageFileStatus) {
          reqBody.append("petImg", petImg);
        }
        const reqHeaders = {
                "Content-Type":"multipart/form-data"   
        }
            try{
                const result = await editPetAPI(id,reqBody,reqHeaders)
                if(result.status==200){
                    // alert("Pet Updated Seccessfully")
                    setToastMessage("Pet updated successfully!");
                    setToastVariant("success"); 
                    setToastShow(true);
                    handleClose()
                    refreshPets();
                }

            }catch(err){
                console.log(err);
                setToastMessage("Something went wrong. Please try again.");
                setToastVariant("danger");
                setToastShow(true);
                
            }

    }else{
        alert("Please fill the form completely!!")
    }
  }

  return (
    <>
    <ToastContainer className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
  <Toast bg={toastVariant} show={toastShow} onClose={() => setToastShow(false)} delay={3000} autohide>
    <Toast.Header closeButton>
      <strong className="me-auto">AdoptPaw Admin</strong>
    </Toast.Header>
    <Toast.Body className="text-white">{toastMessage}</Toast.Body>
  </Toast>
</ToastContainer>
    
    <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <div className='row align-items-center'>
                <div className='d-flex justify-content-center'>
                    <label>
                        <input style={{display:'none'}} onChange={e => setProjectDetails({ ...projectDetails, petImg: e.target.files[0]})} type="file" />
                        <img style={{ width: '13rem' }} className='img-fluid' src={preview?preview:`${serverURL}/uploads/${pet.petImg}`} alt="" />
                    </label>
                </div>
                    <div className='mt-2 mb-2'>
                    <input value={projectDetails.name} onChange={e => setProjectDetails({ ...projectDetails, name: e.target.value })} type="text" className='form-control' placeholder='Name' />
                    </div>
                    <div className='mb-2'>
                    <input value={projectDetails.age} onChange={e => setProjectDetails({ ...projectDetails, age: e.target.value })} type="text" className='form-control' placeholder='Age' />
                    </div>
                    <div className='mb-2'>
                    <input value={projectDetails.breed} onChange={e => setProjectDetails({ ...projectDetails, breed: e.target.value })} type="text" className='form-control' placeholder='Breed' />
                    </div>
                    <div className='mb-2'>
                    {/* <input value={projectDetails.sex} onChange={e => setProjectDetails({ ...projectDetails, sex: e.target.value })} type="text" className='form-control' placeholder='Sex' /> */}
                    <select  value={projectDetails.sex} onChange={e => setProjectDetails({ ...projectDetails, sex: e.target.value })} class="form-select" aria-label="Default select example">
                      <option value="" hidden disabled>Select Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    </div>
                    <div className='mb-2'>
                    {/* <input value={projectDetails.category} onChange={e => setProjectDetails({ ...projectDetails, category: e.target.value })} type="text" className='form-control' placeholder='Category' /> */}
                    <select  value={projectDetails.category} onChange={e => setProjectDetails({ ...projectDetails, category: e.target.value })} class="form-select" aria-label="Default select example">
                      <option value="" hidden disabled>Category</option>
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
          <Button variant="primary" onClick={editPet}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Edit