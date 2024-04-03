import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Companyprofile() {
    const [user, setUser] = useState({});
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
            setUser(userData);
        } catch (error) {
            setUser(null);
        }
    }

    const handlePress = async (event) => {
        event.preventDefault();
        try {
            navigate(`/Editcompanyprofile/${companyusername}`); // Fix: Use backticks and pass the actual value of companyusername
        } catch (error) {
            console.error("error");
        }
    };

    return (
        <>
            <div className='container mx-auto text-center py-5'>
                <div className="flex justify-center">
                    <img className="rounded-full border border-gray-500" src="https://cdn0.iconfinder.com/data/icons/business-1390/24/20_-_Company-2-256.png" alt="Company icon" width={200} />
                </div>
                <div className="py-4">
                    <h1 className="text-3xl font-bold">Company Information</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h1 className="text-xl font-semibold">Company Name</h1>
                        <input
                            type="text"
                            id="CompanyName"
                            value={user.CompanyName || "-"}
                            readOnly
                            className="m-3 py-2 px-4 bg-gray-200 border border-gray-400 rounded-lg w-full focus:outline-none focus:bg-white"
                        />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold">Email</h1>
                        <input
                            type="text"
                            id="Email"
                            value={user.CompanyEmail || "-"}
                            readOnly
                            className="m-3 py-2 px-4 bg-gray-200 border border-gray-400 rounded-lg w-full focus:outline-none focus:bg-white"
                        />
                    </div>
                </div>
                <div>
                    <h1 className="text-xl font-semibold">Location</h1>
                    <input
                        type="text"
                        id="Location"
                        value={user.Location || "-"}
                        readOnly
                        className="m-3 py-2 px-4 bg-gray-200 border border-gray-400 rounded-lg w-full focus:outline-none focus:bg-white"
                    />
                </div>
                <div>
                    <h1 className="text-xl font-semibold">Industry</h1>
                    <input
                        type="text"
                        id="Industry"
                        value={user.Industry || "-"}
                        readOnly
                        className="m-3 py-2 px-4 bg-gray-200 border border-gray-400 rounded-lg w-full focus:outline-none focus:bg-white"
                    />
                </div>
                <button type="submit" onClick={handlePress} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Edit Profile
                </button>
            </div>
        </>
    );
}

export default Companyprofile;
