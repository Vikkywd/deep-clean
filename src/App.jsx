import Login from './pages/Login/login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Layout/Dashboard'
import ProductList from './components/productList'
import Customers from './pages/Customer/customers'
import BookingForm from './pages/Booking/BookingForm'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          {/* <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/product' element={<ProductList/>} /> */}

          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/add-category' element={< Dashboard children={<ProductList/>} />} /> 
          <Route path="/customers" element={<Dashboard children={<Customers/>} heading={"Customer's List"}/>} />
          <Route path="/book" element={<Dashboard children={<BookingForm/>} heading={"Booking Form"}/>} />

        </Routes>
      </Router>
    </>
  )
}

export default App
