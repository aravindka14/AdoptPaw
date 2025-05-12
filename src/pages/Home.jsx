import React, { useEffect } from 'react'
import '../App.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from '../components/Header'
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import one from '../assets/one.jpg'
import two from '../assets/two.jpg'
import three from '../assets/three.jpg'
import bg3 from '../assets/bg3.png'
import pawback from '../assets/pawback.png'
import Footer from '../components/Footer';
import Cardview from '../components/Cardview';
import Review from '../components/Review';
import Aboutus from '../components/Aboutus';
import bg4 from '../assets/bg-4.png'
import bg5 from '../assets/bg-5.png'
import bg6 from '../assets/bg-6.png'
import vid1 from '../assets/vid1.mp4'
import vid2 from '../assets/vid2.mp4'
import vid3 from '../assets/vid3.mp4'





const Home = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, 
      mirror: true 
    });
  
    const handleScroll = () => AOS.refresh();
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  


  return (
  <>

<div style={{backgroundColor:'#f2f2f2'}}>
        <Header />

{/* Section 1*/}
<div style={{ minHeight: '100vh' }} className='d-flex justify-content-center align-items-center w-100 rounded'>
  <div className='container'>
    <div className='row align-items-center'>
      {/* Left - Text Section */}
      <div className='col-lg-6'>
        <h1 data-aos="fade-down" className='mb-4 ms-3'>Find Your <span><strong>IDEAL PET</strong></span></h1>
        <p data-aos="fade-up" className='text-justify'>
          Welcome to AdoptPaw, where loving pets are waiting for their forever homes. 
          Whether you're looking for a playful puppy, a cuddly kitten, or a loyal companion, 
          we help connect you with the perfect pet. Start your adoption journey today 
          and give a pet a second chance at happiness!
        </p>

        {
          sessionStorage.getItem("token")?
              <Link to={'/dashboard'} className='btn btn-warning mt-3 btn-animate'>GET STARTED</Link> 
              :
              <Link to={'/login'} className='btn btn-warning mt-3 btn-animate'>GET STARTED</Link> 

        }

      </div>

      {/* Right -Carousel Section */}
      <div className='col-lg-6 ps-5 d-flex justify-content-center'>
        <Carousel indicators={false} controls={false} interval={4000} className="w-100">
          <Carousel.Item>
            <img 
              className="d-block w-100 rounded" 
              src={bg4} 
              alt="Pet Image 1"
              style={{ height: '500px', objectFit: 'cover' }} 
            />
          </Carousel.Item>
          <Carousel.Item>
            <img 
              className="d-block w-100 rounded" 
              src={bg3} 
              alt="Pet Image 2"
              style={{ height: '500px', objectFit: 'cover' }} 
            />
          </Carousel.Item>
          <Carousel.Item>
            <img 
              className="d-block w-100 rounded" 
              src={bg6} 
              alt="Pet Image 2"
              style={{ height: '500px', objectFit: 'cover' }} 
            />
          </Carousel.Item>
          <Carousel.Item>
            <img 
              className="d-block w-100 rounded" 
              src={bg5} 
              alt="Pet Image 2"
              style={{ height: '500px', objectFit: 'cover' }} 
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  </div>
</div>




{/* Section 2 - Adoption Process */}
<div className='d-flex flex-column min-vh-100 mt-5'>
  <div className='position-relative w-100'>
    <div className='w-100 rounded shadow-sm' style={{ position: 'absolute', top: '0', left: '0', minHeight: '1100px', overflow: 'hidden', background: `url(${pawback}) center/cover no-repeat`}}></div>
    
    <div className='container position-relative bg-white shadow rounded p-5' style={{ zIndex: 1, marginTop: '40px' }}>
      <h1 className='text-center fw-bold mb-5'>ADOPTION PROCESS</h1>
      
      <Container>
       
        <Row className='mt-5 align-items-center'>
          <Col xs={12} md={4} className='text-center'>
            {/* <div data-aos="fade-right"><img className='rounded adoption-img' src={img1} alt="Choose Pet" /></div> */}
            <div data-aos="fade-right"> <video className='rounded adoption-img' src={vid2} autoPlay loop muted></video></div>

          </Col>
          <Col xs={12} md={6}>
            <h5><img className='pe-2' width={40} src={one} alt="Step 1" /><strong className='fs-5'>Choose Pet</strong></h5>
            <p className='fs-5'>Choose the pet you want to adopt and check the details such as age, status and ask all those questions you have to ensure a successful and wonderful experience.</p>
          </Col>
        </Row>

        <Row className='mt-5 align-items-center flex-md-row-reverse'>
          <Col xs={12} md={4} className='text-center'>
            <div data-aos="fade-left"> <video className='rounded adoption-img' src={vid3} autoPlay loop muted></video></div>
          </Col>
          <Col xs={12} md={6} className='text-md-end'>
            <h5><img className='pe-2' width={40} src={two} alt="Step 2" /><strong className='fs-5'>Adoption Form</strong></h5>
            <p className='fs-5'>Fill out the adoption form to provide details about your home, lifestyle, and experience with pets to ensure a perfect match.</p>
          </Col>
        </Row>

     
        <Row className='mt-5 align-items-center'>
          <Col xs={12} md={4} className='text-center'>
            {/* <div data-aos="fade-right"><img className='rounded adoption-img' src={img3} alt="Pet Adoption" /></div>        */}
            <div data-aos="fade-right"> <video className='rounded adoption-img' src={vid1} autoPlay loop muted></video></div>

          </Col>
          <Col xs={12} md={6}>
            <h5><img className='pe-2' width={40} src={three} alt="Step 3" /><strong className='fs-5'>Pet Adoption</strong></h5>
            <p className='fs-5'>Once approved, bring your new companion home! Enjoy your pet and provide them with the love and care they deserve.</p>
          </Col>
        </Row>
      </Container>
    </div>
  </div>
</div>





{/* Section 3 - Card View */}
<div style={{ marginTop: '150px', minHeight: '300px' }}>
  <Cardview />
</div>



  <div>
    <Aboutus />
  </div>




  {/* Team Section */}
  <div className="container pt-5 my-5">
  <h2 className="text-center mb-5 team-title">Meet Our Team</h2>
  <div className="row justify-content-center">
    {[
      { name: "John Doe", role: "Founder & CEO", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKknbKQumk9ULzcoCZCNlGvWWUwwcR381LUw&s" },
      { name: "Jane Smith", role: "Rescue Manager", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKknbKQumk9ULzcoCZCNlGvWWUwwcR381LUw&s" },
      { name: "Mike Brown", role: "Lead Volunteer", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKknbKQumk9ULzcoCZCNlGvWWUwwcR381LUw&s" }
    ].map((member, index) => (
      <div className="col-md-4 mb-4" key={index}>
        <div data-aos="zoom-in" className="team-member-card text-center">
          <img src={member.img} className="team-img" alt={member.name}/>
          <h5 className="team-name">{member.name}</h5>
          <p className="team-role">{member.role}</p>
        </div>
      </div>
    ))}
  </div>
</div>



{/* Section 4 - Reviews */}
<div>
  <Review />
</div>

{/* Footer */}
<div>
  <Footer />
</div>

</div>


     
  </>
  )
}

export default Home