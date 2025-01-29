// CarCard.jsx
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DeleteCarModal from './DeleteCarModal';

const CarCard = ({ car }) => {
  // Access the first image in the car.image array
  const imageUrl = car?.images?.[0]; 
  const { id,token } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  return (
    <div className="bg-white rounded-lg p-1 shadow-md overflow-hidden cursor-pointer">
      <Link to={`/car-detail/${car._id}`}>
        <img 
          src={imageUrl} 
          alt={car.title} 
          className="w-full h-64 object-cover" 
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{car.title}</h3>
          <p className="text-sm text-gray-600">{car.company}</p>
          <p className="text-sm text-gray-600">{car.car_type}</p>
          <div className=' flex gap-x-4'>
            {car.user == id && (
              <>
                <Link to={`/update-car/${car._id}`}>
                <FaEdit color='blue' size={20} className='my-2' />
              </Link>
              <Link onClick={() => setIsModalOpen(true)}>
                <MdDelete color='red' size={20} className='my-2' />
              </Link>
            </>
            )}

          </div>
        </div>
      </Link>

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

export default CarCard;
