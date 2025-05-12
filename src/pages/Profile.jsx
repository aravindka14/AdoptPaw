import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import '../App.css';
import Footer from '../components/Footer'
import { Button, Card } from 'react-bootstrap';
import { getProfilePetAPI, removeProfilePetAPI } from '../service/allAPI';
import serverURL from '../service/serverURL';
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'




const Profile = () => {

    // const [searchKey,setSearchKey] = useState("")
    const [profileRequest,setProfileRequest] = useState([])

   const userData = sessionStorage.getItem("user")
   let user = JSON.parse(userData);

       useEffect(() => {
           getUserRequest();         
       },[]);

    const getUserRequest =async()=>{
        const token = sessionStorage.getItem("token");
                if (token) {
                    const reqHeaders = {
                        "Authorization": `Bearer ${token}`
                    };
                    try { 
                        const result = await getProfilePetAPI(user.email,reqHeaders);
                        setProfileRequest(result.data);
                    } catch (err) {
                        console.log(err);
                    }
                }
    }

    const deletePetRequest = async(id)=>{
    const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader ={
            "Authorization": `Bearer ${token}`
            }
            try{
            await removeProfilePetAPI(id,reqHeader)
            getUserRequest()
    
            }catch(err){
            console.log(err);
            
            }
        }
    }

    const generatePDF = (pet)=>{
        const doc = new jsPDF()
        const margin = 10
        const pageWidth = doc.internal.pageSize.getWidth()
        const pageHeight = doc.internal.pageSize.getHeight()
      
        // Border
        doc.setDrawColor(0)
        doc.setLineWidth(0.5)
        doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin)
      
        // Title
        doc.setFontSize(18)
        doc.setTextColor("black")
        doc.text('AdoptPaw - Pet Adoption Application', margin + 10, 25)
      
        // Pet Info Table
        autoTable(doc, {
          startY: 35,
          head: [['Pet Details', 'Information']],
          body: [
            ['Name', pet.name],
            ['Age', pet.age],
            ['Breed', pet.breed],
            ['Sex', pet.sex],
            ['Category', pet.category],
            ['Status', pet.status],
            ['Date of Request', new Date().toLocaleDateString()],
            ['Date of store visit', pet.date]
          ],
          styles: { fontSize: 12 },
          margin: { left: margin + 10 }
        })
      
        // User Info Table
        autoTable(doc, {
          startY: doc.lastAutoTable.finalY + 10,
          head: [['Adopter Details', 'Information']],
          body: [
            ['Full Name', user.username],
            ['Email', user.email],
          ],
          styles: { fontSize: 12 },
          margin: { left: margin + 10 }
        })

        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [['Visit Location', 'Details']],
            body: [
              ['Pet Adoption Center', 'AdoptPaw Pet Center'],
              ['Address', '123 Paw Street, Kochi, Kerala, India'],
              ['Contact', '+91 98765 43210']
            ],
            styles: { fontSize: 12 },
            margin: { left: margin + 10 }
          })
      
        // Declaration section
        const declarationY = doc.lastAutoTable.finalY + 60
        doc.setFontSize(12)
        doc.text(
          "Declaration:",
          margin + 10,
          declarationY
        )
        doc.setFontSize(11)
        doc.text(
          "I hereby declare that the information provided is true and I will take full responsibility for the adopted pets welfare.",
          margin + 10,
          declarationY + 7,
          { maxWidth: pageWidth - 4 * margin }
        )
      
        const signatureY = declarationY + 30
        doc.line(margin + 10, signatureY, margin + 80, signatureY) 
        doc.text("Signature", margin + 10, signatureY + 5)

      
        doc.line(margin + 110, signatureY, margin + 170, signatureY) 
        doc.text("Date", margin + 110, signatureY + 5)

        const blob = doc.output('blob');
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    // Save the PDF with pet name
    // doc.save(`${pet.name}-Adoption-Application.pdf`)
    }

  return (
    <>
    <Header/>
    <div className="d-flex flex-column align-items-center bg-light pb-5">
  <div className="card mt-5 shadow-lg p-4 text-center" style={{ width: "900px" }}>
    <h1 className="mt-3 fw-bold text-dark">Welcome, {user.username}</h1>
    <p className="text-muted">We're thrilled to have you at AdoptPaw.</p>

    <div className="bg-light p-3 rounded border">
      <p className="fw-semibold mb-1">Your Details:</p>
      <p className="text-muted mb-0">{user.email}</p>
    </div>
  </div>

  <div className="container mb-5 mt-5 pt-3">
  {profileRequest?.length > 0 ? (
    <div className="row g-4 justify-content-center">
      {profileRequest.map((pet, index) => (
        <div key={index} className="col-md-4 d-flex justify-content-center">
          <Card style={{ width: '20rem', borderRadius: '20px' }} className="shadow-lg border-0 card-hover">
          <Card.Img variant="top" src={`${serverURL}/uploads/${pet?.petImg}`} style={{height: '220px',objectFit: 'cover',borderTopLeftRadius: '20px',borderTopRightRadius: '20px',}}/>
          <Card.Body className="text-center">
              <Card.Title className="fw-bold fs-4 mb-3 text-primary">{pet?.name}</Card.Title>
              <div className="text-start">
                <p className="mb-1"><strong>Age:</strong> {pet?.age}</p>
                <p className="mb-1"><strong>Breed:</strong> {pet?.breed}</p>
                <p className="mb-1"><strong>Sex:</strong> {pet?.sex}</p>
                <p className="mb-3"><strong>Category:</strong> {pet?.category}</p>

                <div className="mb-3">
                  
                  {pet.status === "pending" && (
                 <>
                      <div className='d-flex'>
                        <strong>Status:</strong>
                        <span className="text-warning fw-semibold">  Pending</span>
                      </div>
                      <Button onClick={() => deletePetRequest(pet._id)}className="btn btn-danger rounded-pill px-4 py-2 fw-semibold mt-3">
                    Cancel Request
                  </Button>
                 </>
                  )}
                  {pet.status === "Approved" && (
                    <>
                      <strong>Status:</strong>
                      <span className="text-success fw-semibold">  Approved</span>
                      <div className="mt-2">
                        <Button onClick={() => generatePDF(pet)} className="btn btn-primary rounded-pill px-4 py-2 fw-semibold mt-3">
                          Download Application
                        </Button>
                      </div>
                      <Button onClick={() => deletePetRequest(pet._id)}className="btn btn-danger rounded-pill px-4 py-2 fw-semibold mt-2">
                    Cancel Approval
                  </Button>
                    </>
                  )}
                  {pet.status === "Rejected" && (
                <>
                      <strong>Status:</strong>
                      <span className="text-danger fw-semibold">Rejected</span>
                      <br />
                      <Button onClick={() => deletePetRequest(pet._id)}className="btn btn-danger rounded-pill px-4 py-2 fw-semibold mt-3">
                    Delete Request
                  </Button>
                </>
                  )}
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-center">
                 
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center mt-5">
      <h4 className="text-muted">You haven't adopted any pets yet </h4>
      <p className="text-secondary">Explore our available pets and request your perfect companion!</p>
    </div>
  )}
</div>

</div>
  
    <Footer/>
  </>
  )
}

export default Profile