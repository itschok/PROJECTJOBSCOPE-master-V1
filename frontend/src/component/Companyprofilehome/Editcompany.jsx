import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditPostjob() {
    const [formData , setFormData] = useState({
        ActionCommand : "update" ,
        JobName : "" ,
        Location : "" ,
        Position : "" ,
        Salary : "" , 
        Description : "" ,
    });

    const { companyusername, jobid } = useParams();

    useEffect(() => {
        const fetchJobData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/getjob/${companyusername}`, {
                    withCredentials: true,
                });
                const { job } = response.data;
                setFormData({
                    ...formData,
                    JobName: job.JobName,
                    Location: job.Location,
                    Position: job.Position,
                    Salary: job.Salary,
                    Description: job.Description,
                });
            } catch (error) {
                console.error("Error fetching job data:", error);
            }
        };
        
        fetchJobData();
    }, [companyusername, jobid, formData]);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleEdit = async (event) => {
        event.preventDefault();
        try {
            await axios.pull(`http://localhost:3000/api/editjob/${companyusername}`, formData, {
                withCredentials: true,
            });
            alert("Edit Complete");
        } catch(error) {
            console.error("Error editing job:", error);
        }
    };

    return (
        <div className='container mx-auto text-center py-5 '>
            <form>
                <div className="font-semibold py-4">Edit CompanyProfile</div>
                <div className="mt-5 py-5 text-sm font-semibold ">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">ID</label>
                    <input 
                        type="text" 
                        id="Idjob" 
                        value={""} 
                        onChange={""} 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mt-5 py-5 text-sm font-semibold ">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
                    <input 
                        type="text" 
                        id="JobName" 
                        value={formData.JobName} 
                        onChange={handleChange} 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mt-5 py-5 text-sm font-semibold">
                    <label htmlFor="location">Location:</label>
                    <input 
                        type="text" 
                        id="Location" 
                        value={formData.Location} 
                        onChange={handleChange} 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mt-5 py-5 text-sm font-semibold">
                    <label htmlFor="position">Position:</label>
                    <input 
                        type="text" 
                        id="Position" 
                        value={formData.Position} 
                        onChange={handleChange} 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mt-5 py-5 text-sm font-semibold">
                    <label htmlFor="description">Description:</label>
                    <textarea 
                        id="Description" 
                        value={formData.Description} 
                        onChange={handleChange} 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mt-5 py-5 text-sm font-semibold">
                    <label htmlFor="salary">Salary:</label>
                    <input 
                        type="number"
                        id="Salary" 
                        value={formData.Salary} 
                        onChange={handleChange} 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
                    Edit
                </button>
            </form>
        </div>
    );
}

export default EditPostjob;