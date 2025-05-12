import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import img from '../assets/login img.jpg';
import logo from '../assets/paw.png';
import { Link, useNavigate,  } from 'react-router-dom';
import { loginAPI, registerAPI } from '../service/allAPI';






const Login = ({ insideRegister }) => {

  const navigate = useNavigate()

  const [isLogined,setIsLogined] = useState(false)
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("inside handleregister");
    if (inputData.username && inputData.email && inputData.password) {
      try {
        const result = await registerAPI(inputData);
        console.log(result);
        if (result.status == 200) {
          alert(`Welcome ${result.data?.username}, Please login to continue`);
          navigate('/login');
          setInputData({ username: '', email: '', password: '' });
        } else {
          if (result.response.status == 406) {
            alert(result.response.data);
            setInputData({ username: '', email: '', password: '' });
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please fill the form ");
    }
  };



  const handelLogin=async(e)=>{
    e.preventDefault()
    if(inputData.email && inputData.password){
      try{
        const result = await loginAPI(inputData)
        if(result.status==200){

          const role = result.data.user.role;

          sessionStorage.setItem("user",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
          setIsLogined(true)
          // setIsAuthorized(true)
          setTimeout(() => {
            setInputData({username:'',email:'',password:''})
            if(role == 'User'){
              navigate('/')
              setIsLogined(false)
            }else{
              navigate('/adminhome')
              setIsLogined(false)
            }
            
            
          }, 2000);
          
          

        }else{
          if(result.response.status==404){
            alert(result.response.data)
          }
        }

      }catch(err){
        console.log(err);
        
      }

    }else{
      alert("Please fill the form completely!!")
    }
  }




  return (
    <>
      <div style={{ minHeight: '100vh', width: '100%' }} className='d-flex justify-content-center align-items-center bg-warning'>
        <div className='container w-75'>
          <div className='shadow-lg border card p-2'>
            <div className='row align-items-center'>

              <div className='col-lg-6'>
                <div className='d-flex justify-content-center align-items-center'>
                  <img width={120} src={logo} alt="logo" />
                  <h1 style={{ fontFamily: "Flavors" }} className='ps-3'>AdoptPaw</h1>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                  <p><strong>"Welcome back! <br />Your furry friend is just a click away"</strong></p>
                </div>
                <div className='d-flex justify-content-center'>
                  <img src={img} alt="login illustration" />
                </div>
              </div>

              <div className='text-center col-lg-6 p-5'>
                {
                  insideRegister ?
                    <h1 className='mb-4'>Register to Continue</h1>
                    :
                    <h1 className='mb-4'>Login to Continue</h1>
                }

                <hr />

                {insideRegister &&
                  <FloatingLabel className='mb-3' controlId="floatingUsername" label="Username">
                    <Form.Control 
                      value={inputData?.username}
                      onChange={e => setInputData({ ...inputData, username: e.target.value })} 
                      className='bg-light' 
                      type="text" 
                      placeholder="Username" 
                    />
                  </FloatingLabel>
                }

                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                  <Form.Control 
                  value={inputData?.email}
                    onChange={e => setInputData({ ...inputData, email: e.target.value })} 
                    className='bg-light' 
                    type="email" 
                    placeholder="name@example.com" 
                  />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                  value={inputData?.password} 
                    onChange={e => setInputData({ ...inputData, password: e.target.value })} 
                    className='bg-light' 
                    type="password" 
                    placeholder="Password" 
                  />
                </FloatingLabel>

                {
                  insideRegister ?
                    <div>
                      <p className='m-3 text-start'>Already A User? <Link style={{ textDecoration: 'none' }} to={'/login'}>Click Here to Login</Link></p>
                      <div className="d-grid gap-2 col-6 mx-auto">
                        <button onClick={handleRegister} className='btn btn-primary mt-3'>Register</button>
                      </div>
                    </div>
                    :
                    <div>
                      <p className='m-3 text-start'>Don’t have an account with us? <Link style={{ textDecoration: 'none' }} to={'/register'}>Click here to Register</Link></p>
                      <div className="d-grid gap-2 col-6 mx-auto">


                        {/* login spinner */}
                        {isLogined ? 
                        
                        <Button variant="primary" disabled>
                          <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>Loading...
                        </Button>
                        :

                        <button onClick={handelLogin} className='btn btn-primary mt-3'>Login</button>

                        }
                      </div>
                    </div>
                }
              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export default Login;
