import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import vid5 from '../assets/vid5.mp4';
import paw from '../assets/paw.png'


const Aboutus = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <>
   
      <section className="text-center text-white pt-4" style={{backgroundColor: 'white',backgroundSize: 'cover',backgroundPosition: 'center',}}>


        <div className="d-flex flex-column justify-content-center align-items-center text-center my-3">
          <div className="d-flex align-items-center">
            <img src={paw} alt="paw" width={100} className="me-3" />
            <h1 className="text-black m-0">About AdoptPaw</h1>
          </div>
          <p className="text-black mt-3">Connecting loving families with rescued pets</p>
        </div>


       
      
      <div className="position-relative" style={{ height: '650px', overflow: 'hidden'}}>
        
        <video className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover" src={vid5} autoPlay loop muted playsInline/>

        
        <div className="position-relative d-flex justify-content-center align-items-center text-white h-100 px-3">
          <div className="text-center" style={{ maxWidth: '700px' }} data-aos="fade-up">

          <h2 style={{ fontSize: '50px' }}>Our Mission</h2>
            <p style={{ fontSize: '25px' }}>
              At AdoptPaw, we believe every pet deserves a loving home. Our mission is to rescue, rehabilitate,
              and rehome abandoned pets while promoting responsible pet ownership.
            </p>
          <p style={{ fontSize: '25px' }}>
              We work closely with shelters, rescue groups, and volunteers to ensure every pet finds a safe and
              loving family.
            </p>

          </div>
         </div>
      </div>
    </section>
    </>
  );
};

export default Aboutus;
