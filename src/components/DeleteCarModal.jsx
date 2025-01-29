import React from "react";
import { useDispatch } from "react-redux";
import { removeCar } from "../slices/carSlice";
import { useNavigate } from "react-router-dom";

const DeleteCarModal = ({ isOpen, onClose, carId, token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isOpen) return null; // Hide modal when not open

  const handleDelete = async () => {
    try {
      await dispatch(removeCar({ id: carId, token })); // Dispatch delete action
      onClose(); // Close modal
      navigate("/"); // Redirect after deletion
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-gray-800">Confirm Deletion</h2>
        <p className="text-gray-600 mt-2">
          Are you sure you want to delete this car? This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCarModal;
