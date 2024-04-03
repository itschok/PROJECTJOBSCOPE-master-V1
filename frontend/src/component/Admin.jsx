import { useNavigate } from "react-router-dom";

function Admin() {
  const handleViewJobseeker = async () => {
    
  };

  const handleViewCompanyUser = async () => {

  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 max-w-md mx-auto mt-10">
      <h1 className="text-center text-2xl font-bold mb-6">Admin Page</h1>
      <div className="flex justify-center space-x-5">
        <button onClick={handleViewJobseeker} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Jobseeker
        </button>
        <button onClick={handleViewCompanyUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Company User
        </button>
      </div><div className="border border-gray-300 rounded-lg p-6 mt-6">
        {/* Add content for the big box here */}
        <p>This is the big box outside the upper box.</p>
      </div>
    </div>
    
    
  );
}

export default Admin;
