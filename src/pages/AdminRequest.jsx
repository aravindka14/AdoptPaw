import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import AdminHeader from '../components/AdminHeader'
import { approvePetRemoveAPI, editStatusAPI, getRequestPetAPI } from '../service/allAPI';
import serverURL from '../service/serverURL';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';



import { Pagination } from '@mui/material';

import emailjs from '@emailjs/browser'







const AdminRequest = () => {
  const [searchKey, setSearchKey] = useState("")
  const [requestPet, setRequestPet] = useState([]);


  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 5;
      const totalPages = Math.ceil(requestPet.length / itemsPerPage);
      const paginatedPets = requestPet.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
  

  useEffect(() => {
    setCurrentPage(1);
    getAllPet()
  }, [searchKey])


  const getAllPet = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeaders = {
        "Authorization": `Bearer ${token}`
      };
      try {
        const result = await getRequestPetAPI(searchKey, reqHeaders);
        setRequestPet(result.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const petApprove = async(approvPet)=>{
    try{
      await approvePetRemoveAPI(approvPet)
      console.log("deleting pet");
      
    }catch(err){
      console.log(err);
      
    }
  }



  const updateStatus = async (pet, status) => {
    const reqBody = new FormData()
    reqBody.append("status", status)
    try {
      const result = await editStatusAPI(pet._id, reqBody)
      if (result.status === 200) {
        setToastMessage("Pet status updated successfully!")
        setToastVariant("success")
        setToastShow(true)
        getAllPet()

        if (status === "Approved") {

          petApprove(pet.name)
          
          // const templateParams = {
          //   to_name: pet.username,
          //   to_email: pet.email,
          //   pet_name: pet.name,
          //   adoption_date: pet.date
          // };
          // console.log(templateParams);
          
  
          // emailjs
          //   .send(
          //     "service_oexksb8",      
          //     "template_lpzp0dg",     
          //     templateParams,
          //     "DL8jWOqNUlMcAjloc"       
          //   )
          //   .then(
          //     (response) => {
          //       console.log("Email sent successfully", response.status, response.text);
          //     },
          //     (err) => {
          //       console.error("Failed to send email", err);
          //     }
          //   );
            

        }
      }
    } catch (err) {
      setToastMessage("Failed to update pet status.")
      setToastVariant("danger")
      setToastShow(true)
    }
  }



  return (
    <>
      <AdminHeader />

       {/* Toast Container */}
       <ToastContainer className="position-fixed top-0 end-0 p-3" style={{ zIndex: 2 }}>
        <Toast bg={toastVariant} show={toastShow} onClose={() => setToastShow(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">AdoptPaw Admin</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>


      <section className="mt-4">
        <div className="container">
          <div className="card shadow p-4 rounded-4 border-0">
            <h2 className="text-center mb-4 fw-bold text-primary">Adoption Requests</h2>

            {/* Filter */}
            <div className="row mb-4">
              <div className='col-md-4'>
                <select
                  onChange={e => setSearchKey(e.target.value)}
                  className="form-select rounded-3 shadow-sm"
                >
                  <option value="" disabled selected hidden>Search by Status</option>
                  <option value="">All</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Table */}
            {paginatedPets?.length > 0 ? (
              <Table striped bordered hover responsive className="rounded-3 shadow-sm">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Pet Name</th>
                    <th>Age</th>
                    <th>Breed</th>
                    <th>Sex</th>
                    <th>Requested On</th>
                    <th>Adoption Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPets.map((item, index) => (
                    <tr key={item?._id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>
                        <img
                          width="80px"
                          height="80px"
                          className="rounded-circle object-fit-cover border"
                          src={`${serverURL}/uploads/${item?.petImg}`}
                          alt="pet"
                        />
                      </td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.breed}</td>
                      <td>{item.sex}</td>
                      <td>{item.reqdate}</td>
                      <td>{item.date}</td>
                      <td>
                        {item.status === "pending" ? (
                          <>
                            <button onClick={() => updateStatus(item, "Approved")} className="btn btn-sm btn-outline-success me-2">
                              <i className="fa-solid fa-thumbs-up"></i>
                            </button>
                            <button onClick={() => updateStatus(item, "Rejected")} className="btn btn-sm btn-outline-danger">
                              <i className="fa-solid fa-thumbs-down"></i>
                            </button>
                          </>
                        ) : (
                          <span className={`fw-bold ${item.status === "Approved" ? "text-success" : "text-danger"}`}>
                            {item.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="text-center py-4">
                <h5 className="text-muted">No Requests Found</h5>
              </div>
            )}

        <div className="d-flex justify-content-center my-5">
          <Pagination count={totalPages} page={currentPage} onChange={(event, value) => setCurrentPage(value)} color="primary"variant="outlined" shape="rounded" />
        </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default AdminRequest
