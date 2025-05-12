import React, { useEffect, useState } from 'react'
import {  getUserMessageAPI } from '../service/allAPI';



const Review = () => {

    const [userMessage,setUserMessage] = useState([])

    useEffect(()=>{
        getUserMessage()
    },[])

    const getUserMessage =async()=>{
        try{ 
            const result = await getUserMessageAPI();
            setUserMessage(result.data);
        } catch (err){
            console.log(err);
        }      
    }
    
  return (
<>
      
<div class="container testimonial-section mb-5">
    <h2 class="text-black mb-4">Testimonials</h2>
    <div id="testimonialCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div class="carousel-inner">
            {
             userMessage?.map((pet,index)=>(
                <div key={index}  className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="testimonial-card">
                            <div class="testimonial-img-container">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT58-VVT8Wch6ligqL9BVGs4hHtZ2ChZeURvA&s" class="testimonial-img" alt="User"></img>
                            </div>
                            <p class="mt-5 fst-italic">
                                "{pet.message}"
                            </p>
                            <h6 className="mt-3 fw-bold">{pet.name}</h6>
                        </div>
                    </div>
                </div>
            </div>
                ))
            }
            
            
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
    </div>
</div>

</>
  )
}

export default Review