import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addCar, fetchCarById, updateCar } from '../slices/carSlice';

const UpdateCarPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.user);
  
    const [formData, setFormData] = useState({
      title: "",
      company: "",
      car_type: "",
      description: "",
      images: [], 
      tags: "",
      dealer: "",
      userId: "",
    });

  
    // 🟢 Handle input changes
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    // 🟢 Handle Image Upload (Now stores actual files)
    const handleImageUpload = (e) => {
      const files = Array.from(e.target.files);
      
      // 🔹 Ensure max 10 images
      if (files.length + formData.images.length > 10) {
        alert("You can only upload up to 10 images.");
        return;
      }
  
      setFormData({ ...formData, images: [...formData.images, ...files] });
    };
  
    // 🟢 Remove Image
    const removeImage = (index) => {
      setFormData({
        ...formData,
        images: formData.images.filter((_, i) => i !== index),
      });
    };
  
    // 🟢 Handle Form Submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const updatedData = new FormData();
      updatedData.append("title", formData.title);
      updatedData.append("company", formData.company);
      updatedData.append("car_type", formData.car_type);
      updatedData.append("dealer", formData.dealer);
      updatedData.append("description", formData.description);
      updatedData.append("userId", formData.userId);
      updatedData.append("tags", formData.tags);
  
      // 🔹 Append images
      formData.images.forEach((image) => {
        if (typeof image === "string") {
          // Already existing image (URL from backend)
          updatedData.append("existingImages", image);
        } else {
          // New image file
          updatedData.append("images", image);
        }
      });
  
      try {
        await dispatch(addCar({ formData:updatedData, token }));
        navigate("/"); // Redirect after update
      } catch (error) {
        console.error("Error updating car:", error);
      }
    }
  return (
    <div className="  p-6 bg-white ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Car Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title: <sup className=' text-red-500'>*</sup> </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border-1 text-black border-black p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Company:<sup className=' text-red-500'>*</sup></label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full border-1 text-black border-black p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Car Type:<sup className=' text-red-500'>*</sup></label>
          <input
            type="text"
            name="car_type"
            value={formData.car_type}
            onChange={handleChange}
            className="w-full border-1 text-black border-black p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Tags:<sup className=' text-red-500'>*</sup></label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border-1 text-black border-black p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Description:<sup className=' text-red-500'>*</sup></label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border-1 text-black border-black p-2 rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700">Dealer:<sup className=' text-red-500'>*</sup></label>
          <textarea
            name="dealer"
            value={formData.dealer}
            onChange={handleChange}
            className="w-full border-1 text-black border-black p-2 rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700">Upload Images (Max 10):<sup className=' text-red-500'>*</sup></label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full border-1 text-black border-black p-2 rounded"
          />
        </div>

        {/* Image Preview Section */}
        {formData.images.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-3">
            {formData.images.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt={`car-${index}`} className="w-24 h-24 object-cover rounded-md" />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full px-2"
                  onClick={() => removeImage(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Car
        </button>
      </form>
    </div>
  );
};

export default UpdateCarPage;
