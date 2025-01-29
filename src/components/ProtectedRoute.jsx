import { Navigate, Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { id: userId } = useSelector((state) => state.user);
  const { id: carId } = useParams(); // Get car ID from URL
  const { cars } = useSelector((state) => state.cars); // Fetch all cars

  // Find the car by ID
  const car = cars.find((car) => car.id === carId);

  // Check if the user is logged in and owns the car
  if (!userId || !car || car.user !== userId) {
    return <Navigate to="/404" replace />; // Redirect if not authorized
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
