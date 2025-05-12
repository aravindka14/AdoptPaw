import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer'
import AdminHeader from '../components/AdminHeader'
import { getDashboardPetAPI, removePetAPI } from '../service/allAPI';
import { Button, Card, Form } from 'react-bootstrap';
import serverURL from '../service/serverURL';
import Edit from '../components/Edit';

import { Pagination } from '@mui/material';





const AdminDashboard = () => {



    const [searchKey,setSearchKey] = useState("")
    const [homePet, setHomePet] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(homePet.length / itemsPerPage);
    const paginatedPets = homePet.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    useEffect(() => {
      setCurrentPage(1);
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

    const deletePet = async(id)=>{
    const token = sessionStorage.getItem("token")
    if(token){
        const reqHeader ={
        "Authorization": `Bearer ${token}`
        }
        try{
        await removePetAPI(id,reqHeader)
        getAllPet()

        }catch(err){
        console.log(err);
        
        }
    }
    }
    
    const refreshPets = () => {
        getAllPet(); 
    };



   
  return (
    <>
<AdminHeader/>


<section style={{ minHeight: "100vh" }} className="bg-light">

  <div className="container py-5">
    
    <div className="row mb-6 align-items-center">

    <div className="row mb-4 align-items-center justify-content-start">
  <div className="col-md-6 col-lg-4">
    <Form.Select onChange={e => setSearchKey(e.target.value)} className="form-select p-3 rounded-4 shadow-sm w-100" aria-label="Search by Category">
      <option value="" disabled selected hidden>Search by Category</option>
      <option value="">All</option>
      <option value="dog">Dog</option>
      <option value="cat">Cat</option>
    </Form.Select>
  </div>
</div>

</div>

    {/* Pet Cards Section */}
    <div className="container mt-2 pt-3">
      <div className="row g-4 justify-content-center">
        {paginatedPets?.map((pet, index) => (
          <div key={index} className="col-md-3 d-flex justify-content-center">
            <Card style={{ width: '20rem', borderRadius: '20px' }} className="shadow-lg border-0 card-hover">
            <Card.Img variant="top" src={`${serverURL}/uploads/${pet?.petImg}`} style={{height: '220px',objectFit: 'cover',borderTopLeftRadius: '20px',borderTopRightRadius: '20px',}}/>
              <Card.Body className="text-center">
                <Card.Title className="fw-bold fs-4 text-primary">{pet?.name}</Card.Title>
                <div className="text-start">
                  <p className="mb-1"><strong>Age:</strong> {pet.age}</p>
                  <p className="mb-1"><strong>Breed:</strong> {pet.breed}</p>
                  <p className="mb-1"><strong>Sex:</strong> {pet.sex}</p>
                  <p className="mb-3"><strong>Category:</strong> {pet.category}</p>

                  <div className="d-grid gap-2 d-md-flex justify-content-center mt-3">
                    <div className="btn p-0 me-2">
                      <Edit pet={pet} refreshPets={refreshPets}/>
                    </div>
                    
                    <Button onClick={() => deletePet(pet._id)}className="btn btn-danger rounded-pill px-4 fw-semibold">
                      Delete
                    </Button>
                    
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}

        <div className="d-flex justify-content-center my-5">
          <Pagination count={totalPages} page={currentPage} onChange={(event, value) => setCurrentPage(value)} color="primary"variant="outlined" shape="rounded" />
        </div>

      </div>
    </div>
  </div>

</section>

<Footer />

    </>
  )
}

export default AdminDashboard