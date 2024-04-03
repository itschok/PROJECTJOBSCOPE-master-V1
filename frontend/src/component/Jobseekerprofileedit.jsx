import { useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import axios from "axios";

function Jobseekerprofileedit() {
    const [formData, setFormData] = useState({
        Name: "",
        Email: "",
        EducationLevel: "",
        Job: "" ,
    });
    
    const navigate = useNavigate();
    const { jobseekerusername } = useParams();

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/profile/jobseeker/${jobseekerusername}/update`, formData , {
                withCredentials: true ,
            });

            if (response.data.success) {
                navigate(`/Profile/${jobseekerusername}`);
            } else {
                throw new Error("Failed to update profile");
            }
        } catch (error) {
            alert("Failed to update profile. Please try again later.");
        }
    };

    return (
        <>
            <div className='container mx-auto text-center'>
                <div className="flex justify-center">
                    <img className="rounded-full border border-gray-500" src="https://cdn3.iconfinder.com/data/icons/feather-5/24/user-512.png" alt="User icon" width={200} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="py-2">
                        <h1>Name</h1>
                        <input
                            type="text"
                            id="Name"
                            value={formData.Name}
                            onChange={handleChange}
                            className="m-3 py-1 px-3 bg-gray-50 border border-gray-200 rounded-3xl "
                        />
                    </div>
                    <div className="py-2">
                        <h1>Email</h1>
                        <input
                            type="text"
                            id="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            className="m-3 py-1 px-3 bg-gray-50 border border-gray-200 rounded-3xl "
                        />
                    </div>
                    <div className="py-3">
                        <h1>Job</h1>
                        <input
                            type="text"
                            id="Job"
                            value={formData.Job}
                            onChange={handleChange}
                            className="m-3 py-1 px-3 bg-gray-50 border border-gray-200 rounded-3xl">
                        </input>
                    </div>
                    <div className="py-2">
                        <h1>Level of education</h1>
                        <select
                            id="EducationLevel"
                            value={formData.EducationLevel}
                            onChange={handleChange}
                            className="m-3 py-1 px-3 bg-gray-50 border border-gray-200 rounded-3xl">
                            <option value="-">-</option>
                            <option value="High School">High School</option>
                            <option value="Bachelor’s Degree">Bachelor’s Degree</option>
                            <option value="Master’s Degree">Master’s Degree</option>
                            <option value="Doctorate Degree">Doctorate Degree</option>
                        </select>
                    </div>
                    {/* SAVE button */}
                    <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full">
                        SAVE
                    </button>
                </form>
            </div>
        </>
    );
}

export default Jobseekerprofileedit;
