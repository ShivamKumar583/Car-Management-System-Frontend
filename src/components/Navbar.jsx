import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/userSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { token, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          Car Management
        </Link>


        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-white">
          <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
          <li><Link to="/cars" className="hover:text-gray-200">All Cars</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link to="/add-car" className="hover:text-gray-200">Add Car</Link></li>
              <li>
                <button onClick={() => dispatch(logout())} className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/register" className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600">Register</Link></li>
              <li><Link to="/login" className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600">Login</Link></li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-blue-700 text-white py-4 space-y-3">
          <Link to="/" className="px-4 py-2 hover:bg-blue-800">Home</Link>
          <Link to="/cars" className="px-4 py-2 hover:bg-blue-800">All Cars</Link>

          {isAuthenticated ? (
            <>
              <Link to="/add-car" className="px-4 py-2 hover:bg-blue-800">Add Car</Link>
              <button onClick={() => dispatch(logout())} className="bg-red-500 px-4 py-2 mx-4 rounded-md hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="bg-green-500 px-4 py-2 mx-4 rounded-md hover:bg-green-600">Register</Link>
              <Link to="/login" className="bg-green-500 px-4 py-2 mx-4 rounded-md hover:bg-green-600">Login</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
