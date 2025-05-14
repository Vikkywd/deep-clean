import Login from './pages/Login/login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Layout/Dashboard'
import ProductList from './components/productList'
import Customers from './pages/Customer/customers'
import BookingForm from './pages/Booking/BookingForm'
import LandingPage from './pages/Frontend/LandingPage'
import { ServiceBooking } from './pages/Frontend/Service/ServicesBooking'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
        <Route path='/' element={<LandingPage />} />

          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard  children={''}  heading={"Enquire List"}/>}/>
          <Route path='/add-category' element={< Dashboard children={<ProductList/>} />} /> 
          <Route path="/customers" element={<Dashboard children={<Customers/>} heading={"Customer's List"}/>} />
          <Route path="/book" element={<Dashboard children={<BookingForm/>} heading={"Booking Form"}/>} />
          <Route path='/service-booking' element={<ServiceBooking />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
