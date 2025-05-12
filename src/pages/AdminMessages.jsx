import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import AdminHeader from '../components/AdminHeader'
import { editStatusMessageAPI, getMessageAPI } from '../service/allAPI';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { Pagination } from '@mui/material';



const AdminMessages = () => {

    const[searchKey,setSearchKey] = useState("")
    const [userMessage, setUserMessage] = useState([])
    const [toastShow, setToastShow] = useState(false);
    

    const [currentPage, setCurrentPage] = useState(1);
          const itemsPerPage = 5;
          const totalPages = Math.ceil(userMessage.length / itemsPerPage);
          const paginatedPets = userMessage.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          );

    useEffect(()=>{
        getAllMessage()
    },[searchKey])

    const getAllMessage = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeaders = {
                "Authorization": `Bearer ${token}`
            };
            try {
                const result = await getMessageAPI(searchKey,reqHeaders);
                setUserMessage(result.data);
            } catch (err) {
                console.log(err);
            }
        }
        };

    const updateStatus = async(id,status)=>{
        const reqBody = new FormData()
        reqBody.append("status",status)
        try{
            const result = await editStatusMessageAPI(id,reqBody)
            if(result.status==200){
                setToastShow(true)
                getAllMessage()
        
            }

        }catch(err){
            console.log(err);
            
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
          <Toast.Body style={{backgroundColor: '#dee2e6'}} className="text-black">Message Updated Seccessfully</Toast.Body>
        </Toast>
      </ToastContainer>



  <AdminHeader />

  <section className="mt-4">
  <div className="container">
      <div className="card shadow p-4 rounded-4 border-0">
        <h2 className="text-center mb-4 fw-bold text-primary">User Messages</h2>

        {/* Filter */}
        <div className="row mb-4">
        <div className="col-md-4">
        <select onChange={(e) => setSearchKey(e.target.value)} className="form-select rounded-3 shadow-sm" defaultValue="">
            <option value="" disabled hidden>Search by Status</option>
            <option value="">All</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
        </select>
        </div>
        </div>


     
        {paginatedPets?.length > 0 ? (
          <Table striped bordered hover responsive className="rounded-3 shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date of Request</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPets.map((item, index) => (
                <tr key={index}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.message}</td>
                  <td>{item.date}</td>
                  <td>
                    {item.status == "Pending" ? (
                      <>
                        <button onClick={() => updateStatus(item._id, "Approved")}className="btn btn-sm btn-outline-success me-2">
                          <i className="fa-solid fa-thumbs-up"></i>
                        </button>
                        <button onClick={() => updateStatus(item._id, "Rejected")} className="btn btn-sm btn-outline-danger">
                          <i className="fa-solid fa-thumbs-down"></i>
                        </button>
                      </>
                    ) : (
                      <span className={`fw-bold ${item.status === "Approved" ? "text-success" : "text-danger" }`}>
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
            <h5 className="text-muted">No Messages Found</h5>
          </div>
        )}

        {/* Pagination */}
        <div className="d-flex justify-content-center my-5">
          <Pagination count={totalPages} page={currentPage} onChange={(event, value) => setCurrentPage(value)}color="primary"variant="outlined" shape="rounded"/>
        </div>
      </div>
      </div>
    </section>
</>

  )
}

export default AdminMessages