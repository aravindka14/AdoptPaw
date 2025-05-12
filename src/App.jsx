import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ContactUs from './pages/ContactUs'
import AdminDashboard from './pages/AdminDashboard'
import AdminRequest from './pages/AdminRequest'
import Profile from './pages/Profile'
import AdminMessages from './pages/AdminMessages'
import AdminHome from './pages/AdminHome'






function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Login insideRegister={true}/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/admindash' element={<AdminDashboard/>}/>
        <Route path='/request' element={<AdminRequest/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/messages' element={<AdminMessages/>}/>
        <Route path='/adminhome' element={<AdminHome/>}/>

      </Routes>
    </>
  )
}

export default App
