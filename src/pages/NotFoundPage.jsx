import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg my-4">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
