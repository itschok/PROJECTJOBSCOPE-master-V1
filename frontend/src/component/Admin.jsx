import { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [User, setUser] = useState([]);

  const handleViewJobseeker = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/profile/jobseeker"
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching jobseekers:", error);
    }
  };

  useEffect(() => {
    handleViewJobseeker();
  }, []);

  const handleViewCompanyUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/profile/companies"
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching jobseekers:", error);
    }
  };

  return (
    <div className="py-16 ">
      <div className="border border-gray-300 rounded-lg p-6 max-w-md mx-auto mt-10">
        <h1 className="text-center text-2xl font-bold mb-6">Admin Page</h1>
        <div className="flex justify-center space-x-5">
          <button
            onClick={handleViewJobseeker}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View Jobseeker
          </button>
          <button
            onClick={handleViewCompanyUser}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View Company User
          </button>
        </div>
      </div>
      <div className="border border-gray-300 rounded-lg p-6 max-w-7xl mx-auto mt-10">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                {User.length > 0 &&
                  Object.keys(User[0]).map((key) => (
                    <th key={key} className="px-4 py-2 text-center">
                      {key}
                    </th>
                  ))}
              </tr>
            </thead>

            <tbody>
              {User.map((jobseeker) => (
                <tr key={jobseeker._id}>
                  {Object.keys(jobseeker).map((key) => (
                    <td key={key} className="px-4 py-2 text-center">
                      {jobseeker[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
