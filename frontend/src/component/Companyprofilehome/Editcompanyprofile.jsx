import { useEffect, useState } from "react";
import { useNavigate , useParams } from "react-router-dom";
import axios from "axios";

function Editcompanyproflie() {
  const [companyData, setCompanyData] = useState({
    CompanyName: "",
    CompanyEmail: "",
    Location: "",
    Industry: ""
  });
  const { companyusername } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetchUserProfile();
  }, [companyusername]);

  async function fetchUserProfile() {
    try {
      const response = await axios.get(`http://localhost:3000/api/profile/companies/${companyusername}`, {
        withCredentials: true,
      });
      const userData = response.data;
      setCompanyData(userData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCompanyData({ ...companyData, [id]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:3000/api/profile/companies/${companyusername}/update`, companyData);
        navigate(`/Companyprofile/${companyusername}`)
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <div className='container mx-auto text-center py-5'>
        <div className="flex justify-center">
          <img className="rounded-full border border-gray-500" src="https://cdn0.iconfinder.com/data/icons/business-1390/24/20_-_Company-2-256.png" alt="Company icon" width={200} />
        </div>
        <div className="py-4">
          <h1 className="text-3xl font-bold">Edit Company Information</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h1 className="text-xl font-semibold">Company Name</h1>
            <input
              type="text"
              id="CompanyName"
              value={companyData.CompanyName}
              onChange={handleChange}
              className="m-3 py-2 px-4 bg-gray-200 border border-gray-400 rounded-lg w-full focus:outline-none focus:bg-white"
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Email</h1>
            <input
              type="text"
              id="CompanyEmail"
              value={companyData.CompanyEmail}
              onChange={handleChange}
              className="m-3 py-2 px-4 bg-gray-200 border border-gray-400 rounded-lg w-full focus:outline-none focus:bg-white"
            />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold">Location</h1>
          <select
            id="Location"
            value={companyData.Location}
            onChange={handleChange}
            className="m-3 py-2 px-4 bg-gray-200 border border-gray-400 rounded-lg w-full focus:outline-none focus:bg-white"
          >
            <option value="">Select Location</option>
            <option value="Bangkok">Bangkok</option>
            <option value="County">County</option>
            <option value="North">North</option>
            <option value="Northeast">Northeast</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="South">South</option>
          </select>
        </div>
        <div>
          <h1 className="text-xl font-semibold">Industry</h1>
          <input
            type="text"
            id="Industry"
            value={companyData.Industry}
            onChange={handleChange}
            className="m-3 py-2 px-4 bg-gray-200 border border-gray-400 rounded-lg w-full focus:outline-none focus:bg-white"
          />
        </div>
        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Save
        </button>
      </div>
    </>
  );
}

export default Editcompanyproflie;
