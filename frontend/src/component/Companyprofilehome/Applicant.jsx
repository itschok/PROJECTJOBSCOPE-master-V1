import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Applicant() {
  const [applicants, setApplicants] = useState([]);
  const { companyusername } = useParams();

  useEffect(() => {
    fetchApplicant();
  }, []);

  const fetchApplicant = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/getApplicant/${companyusername}`);
      setApplicants(response.data.data);
    } catch (error) {
      console.error("Error fetching applicant:", error);
    }
  };

  const renderApplicants = () => {
    return applicants.map((applicant) => (
      <tr key={applicant._id}>
        <td className="py-3 text-center align-middle">{applicant.Name}</td>
        <td className="py-3 text-center align-middle">{applicant.Position}</td>
        <td className="py-3 text-center align-middle">{applicant.Location}</td>
        <td className="py-3 text-center align-middle">{applicant.EducationLevel}</td>
        <td className="py-3 text-center align-middle">{applicant.Email}</td>
        <td className="py-3 text-center align-middle">
          <Link to={`/Mypostpage/${companyusername}/Editpost/${applicant._id}`} className="text-blue-500 hover:text-blue-800 font-semibold">
            Edit
          </Link>
        </td>
      </tr>
    ));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center text-2xl">MY APPLICANTS</div>
      <div className="border-2 rounded-2xl">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Education Level</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants.length > 0 ? renderApplicants() : <tr><td colSpan="6">No applicants</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Applicant;
