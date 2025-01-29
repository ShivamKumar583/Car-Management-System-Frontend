import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCars, fetchCars, removeCar, searchCars } from '../slices/carSlice';
import CarCard from '../components/CarCard';

const HomePage = () => {
  const dispatch = useDispatch();
  const { token, id } = useSelector((state) => state.user);
  const { cars } = useSelector((state) => state.cars);
  const [allCars, setAllCars] = useState([]);
  
  const [searchData , setSearchData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // Handle search submission
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        const response = await dispatch(searchCars({ query: searchQuery.trim(), token })).unwrap();
        setSearchData(response); // Ensure the data is properly set
      } catch (error) {
        console.error("Search failed:", error);
      }
    }
  };
  
  useEffect(() => {
    
      const fetchData = async () => {
        try {
          const response = await dispatch(fetchAllCars()).unwrap(); // Extract payload
          setAllCars(response || []); // Ensure allCars is always an array
        } catch (error) {
          console.error('Error fetching cars:', error);
        }
      };

      fetchData();
      if(token){
        dispatch(fetchCars({ userId: id, token })); // Fetch user-specific cars
      }

  
  }, [token, id,removeCar]); // Added `id` in dependencies

  return (
    <div className="container mx-auto p-4">
      {/* Search Bar (Desktop) */}
      <form onSubmit={handleSearch} className="flex items-center bg-white rounded-lg w-fit ">
        <input
          type="text"
          placeholder="Search Cars..."
          className="p-2 w-64 text-black outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 rounded-r-lg text-white px-4 py-2">Search</button>
      </form>

      {
        searchData.length > 0 && (
          <div>
        <h2 className="font-bold text-white text-xl p-3">Searched results...</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchData.length > 0 ? (
            searchData.slice(0, 4).map((car) => <CarCard key={car.id} car={car} />)
          ) : (
            <p className="text-white">No cars available</p>
          )}
        </div>
      </div>
        )
      }

      <div>
        <h2 className="font-bold text-white text-xl p-3">All Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allCars.length > 0 ? (
            allCars.slice(0, 4).map((car) => <CarCard key={car.id} car={car} />)
          ) : (
            <p className="text-white">No cars available</p>
          )}
        </div>
      </div>

      {/* Display cars in grid layout */}
      <div>
        <h2 className="font-bold text-white text-xl p-3">My Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cars?.length > 0 ? (
            cars.slice(0, 4).map((car) => <CarCard key={car.id} car={car} />)
          ) : (
            <p className="text-white">No cars added yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
