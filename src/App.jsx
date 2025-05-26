import Login from './pages/Login/login'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Layout/Dashboard'
import BookingForm from './pages/Admin/Booking/BookingForm'
import LandingPage from './pages/Frontend/LandingPage'
import ServiceBooking  from './pages/Frontend/Service/ServicesBooking'
import Enquire from './pages/Admin/Enquire/Enquire'
import TaskList from './pages/Admin/TaskAssign/TaskList'
import TaskDetails from './pages/Admin/TaskAssign/TaskDetails'
import DashboardPage from './pages/Admin/DashboardPage'
import BookingsPage from './pages/Admin/Booking/Booking'
import WorkersPage from './pages/Admin/Workers/Worker';
import Invoice from './pages/Admin/Invoices/Invoice'
import ReportsPage from './pages/Admin/Reports/Reports'
import SettingsPage from './pages/Admin/Settings/Setting'
import PrivateRoute from './components/PrivateRoutes'
import Payment from './components/payment'

function App() {
  const token = localStorage.getItem('token');
  return (
    <>
      <Router>
        <Routes>
        <Route path='/' element={<LandingPage />} />

          <Route path='/login' element={token ? <Navigate to='/dashboard' replace/>: <Login />} />
          <Route path='/payment/:orderId' element={<Payment/>} />
          
          <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard children={<DashboardPage/>}/>}/>
          <Route path='/dashboard/bookings' element={<Dashboard children={<BookingsPage/>} />}/>
          <Route path='/dashboard/workers' element={<Dashboard children={<WorkersPage/>} />}/>
          <Route path='/dashboard/tasks' element={<Dashboard children={<TaskList/>} />}/>
          <Route path='/dashboard/invoices' element={<Dashboard children={<Invoice/>} />}/>
          <Route path='/dashboard/reports' element={<Dashboard children={<ReportsPage/>} />}/>
          <Route path='/dashboard/settings' element={<Dashboard children={<SettingsPage/>} />}/>
          <Route path='/dashboard/enquire' element={<Dashboard children={<Enquire/>} />}/>
          </Route>
          <Route path='/service-booking' element={<ServiceBooking />} />

          {/*  
          <Route path="/book" element={<Dashboard children={<BookingForm/>} heading={"Booking Form"}/>} />
          <Route path='/tasks' element={<Dashboard children={<TaskList/>} heading={"Assigned Jobs"}/>}  />
          <Route path="/task/:id" element={<Dashboard children={<TaskDetails />}  heading={"Assigned Job"}/>} /> */}


        </Routes>
      </Router>
    </>
  )
}

export default App
