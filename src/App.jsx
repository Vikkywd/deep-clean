import Login from './pages/Login/login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Layout/Dashboard'
import ProductList from './components/productList'
import Customers from './pages/Admin/Customer/Customers'
import BookingForm from './pages/Admin/Booking/BookingForm'
import LandingPage from './pages/Frontend/LandingPage'
import ServiceBooking  from './pages/Frontend/Service/ServicesBooking'
import Enquire from './pages/Admin/Enquire/Enquire'
import TaskList from './pages/Admin/TaskAssign/TaskList'

function App() {

  return (
    <>
      <Router>
        <Routes>
        <Route path='/' element={<LandingPage />} />

          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard  children={<Enquire/>}  heading={"Enquire List"}/>}/>
          <Route path='/add-category' element={< Dashboard children={<ProductList/>} />} /> 
          <Route path="/customers" element={<Dashboard children={<Customers/>} heading={"Customer's List"}/>} />
          <Route path="/book" element={<Dashboard children={<BookingForm/>} heading={"Booking Form"}/>} />
          <Route path='/service-booking' element={<ServiceBooking />} />
          <Route path='/tasks' element={<Dashboard children={<TaskList/>} heading={"Assigned Jobs"}/>}  />

        </Routes>
      </Router>
    </>
  )
}

export default App
