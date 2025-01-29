import { Route, Router, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/Home'
import CarDetail from './pages/CarDetailPage'
import UserRegisterPage from './pages/userRegister'
import UserLoginPage from './pages/UserLoginPage'
import UpdateCarPage from './pages/UpdateCarPage'
import AddCar from './pages/AddCarPags'
import ProtectedRoute from './components/ProtectedRoute'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/car-detail/:id" element={<CarDetail />} />
         {/* Protected Routes for CRUD Operations */}
         <Route element={<ProtectedRoute />}>
          <Route path="/update-car/:id" element={<UpdateCarPage />} />
          <Route path="/add-car" element={<AddCar />} />
        </Route>

        <Route path="/register" element={<UserRegisterPage />} />
        <Route path="/login" element={<UserLoginPage />} />

        {/* 404 Page for Invalid Routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

    </>
  )
}

export default App
