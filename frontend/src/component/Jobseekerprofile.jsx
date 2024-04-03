import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Jobseekerprofile() {
    const [user, setUser] = useState({});
    const { jobseekerusername } = useParams();

    useEffect(() => {
        fetchUserProfile();
    }, [jobseekerusername]);

    async function fetchUserProfile() {
        try {
            const response = await axios.get(`http://localhost:3000/api/profile/jobseeker/${jobseekerusername}`, {
                withCredentials: true,
            });
            const userData = response.data;
            setUser(userData);
        } catch (error) {
            setUser(null);
        }
    }

    return (
        <>
            <div className='container mx-auto text-center'>
                <div className="flex justify-center">
                    <img className="rounded-full border border-gray-500" src="https://cdn3.iconfinder.com/data/icons/feather-5/24/user-512.png" alt="User icon" width={200} />
                </div>
                <div className="py-2">
                    <h1>Name</h1>
                    <input
                        type="text"
                        id="Name"
                        value = {user.Name || ""}
                        readOnly
                        className="m-3 py-1 px-3 bg-gray-50 border border-gray-200 rounded-3xl "
                    />
                </div>
                    <h1>Email</h1>
                    <input
                        type="text"
                        id="Email"
                        value = {user.Email || ""}
                        readOnly
                        className="m-3 py-1 px-3 bg-gray-50 border border-gray-200 rounded-3xl "
                    />
                <div className="py-2">
                    <h1>Level of education</h1>
                    <input
                        type="text"
                        id="EducationLevel"
                        value = {user.EducationLevel || ""}
                        readOnly
                        className="m-3 py-1 px-3 bg-gray-50 border border-gray-200 rounded-3xl "
                    />
                </div>
                <div className="py-2">
                    <h1>Job</h1>
                    <input
                        type="text"
                        id="Job"
                        value = {user.Job || ""}
                        readOnly
                        className="m-3 py-1 px-3 bg-gray-50 border border-gray-200 rounded-3xl "
                    />
                </div>
            </div>
        </>
    );
}
export default Jobseekerprofile;
