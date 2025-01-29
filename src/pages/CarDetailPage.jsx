import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchCarById } from '../slices/carSlice';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import DeleteCarModal from '../components/DeleteCarModal';

const CarDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [car, setCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state


  useEffect(() => {
    const fetchCarDetails = async () => {
      if (id && token) {
        try {
          const res = await dispatch(fetchCarById({ id, token }));
          setCar(res.payload);  
        } catch (error) {
          console.error('Failed to fetch car details:', error);
        }
      }
    };

    fetchCarDetails();  
  }, [id, token, dispatch]);  

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className="my-[4rem] rounded-md bg-white container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Slideshow for images */}
        {car.images.length > 0 ? (
          <AwesomeSlider className="w-full md:w-1/2 h-80">
            {car.images.map((image, index) => (
              <div key={index} data-src={image} />
            ))}
          </AwesomeSlider>
        ) : (
          <p>No images available</p>
        )}

        <div className="flex flex-col justify-center p-4">
          <h2 className="text-2xl font-semibold text-gray-800">{car.title}</h2>
          <p className="text-lg text-gray-600">Company: {car.company}</p>
          <p className="text-lg text-gray-600">Type: {car.car_type}</p>
          <p className="mt-4 text-lg text-gray-700">Description: {car.description}</p>
          <p className="text-lg text-gray-700">Dealer: {car.dealer}</p>

          {/* Tags Section */}
          {car.tags?.length > 0 && (
            <div className='flex gap-x-2 text-black mt-4'>
              <p>Tags:</p>
              <div className='flex gap-x-2'>
                {car.tags.map((tag, index) => (
                  <p className='text-blue-500 hover:underline cursor-pointer' key={index}>#{tag} </p>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          {
            car.user == id && (
              <div className='text-white flex gap-x-3'>
            <Link to={`/update-car/${car._id}`} className='bg-blue-500 w-fit p-2 rounded-md hover:bg-blue-800 mt-5'>
              Update
            </Link>
            <Link onClick={() => setIsModalOpen(true)} className='bg-red-500 w-fit p-2 rounded-md hover:bg-red-800 mt-5'>
              Delete
            </Link>
          </div>
            )
          }
          
        </div>
      </div>
      
      {/* Delete Modal */}
      <DeleteCarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        carId={car._id}
        token={token}
      />
    </div>
  );
};

export default CarDetail;
