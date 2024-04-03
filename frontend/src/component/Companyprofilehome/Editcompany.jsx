import { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import axios from "axios";

function EditPostjob() {
    const [formData, setFormData] = useState({
        JobName : "" ,
        Location : "" ,
        Position : "" ,
        Salary : 0.0 ,
        Description : "" ,
    });

    const { companyusername , jobid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                
                const response = await axios.get(`http://localhost:3000/api/getPostedJob/${companyusername}`);
                const job = response.data.data.find(job => job._id === jobid);
                if (job) {
                    setFormData({
                        JobName: job.JobName,
                        Location: job.Location,
                        Position: job.Position,
                        Salary: parseFloat(job.Salary),
                        Description: job.Description
                    });
                }
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };
        fetchJobDetails();
    }, [companyusername, jobid]);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`http://localhost:3000/api/editpostjob/${jobid}`, { 
                ...formData , 
                Salary : parseFloat(formData.Salary)
            } , 
            {
                withCredentials: true,
            });
            navigate(`/Mypostpage/${companyusername}`);
        } catch (error) {
            console.error("Error editing job:", error);
        }
    };

    return (
        <div className="container mx-auto text-center py-5 ">
            <form onSubmit={handleSubmit}>
                <div className="font-semibold py-4">Edit CompanyProfile</div>
                <div className="mt-5 py-5 text-sm font-semibold ">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">ID</label>
                    <input
                        type="text"
                        id="Idjob"
                        value={jobid}
                        readOnly
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mt-5 py-5 text-sm font-semibold ">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
                    <input
                        type="text"
                        id="JobName"
                        value={formData.JobName}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mt-5 py-5 text-sm font-semibold">
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="Location"
                        value={formData.Location}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mt-5 py-5 text-sm font-semibold">
                    <label htmlFor="position">Position:</label>
                    <input
                        type="text"
                        id="Position"
                        value={formData.Position}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mt-5 py-5 text-sm font-semibold">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="Description"
                        value={formData.Description}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mt-5 py-5 text-sm font-semibold">
                    <label htmlFor="salary">Salary:</label>
                    <input
                        type="number"
                        id="Salary"
                        value={formData.Salary}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full"
                >
                    SAVE
                </button>
            </form>
        </div>
    );
}

export default EditPostjob;