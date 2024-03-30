import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navprofile from "./NavProfile";

function Jobseekerprofile() {
    const [user, setUser] = useState(null);
    const { username } = useParams();

    useEffect(() => {
        fetchUserProfile();
    }, [username]);

    async function fetchUserProfile() {
        try {
            const response = await fetch(`/api/profile/${username}`);
            if (!response.ok) {
                throw new Error("Failed to fetch user profile");
            }
            const userData = await response.json();
            setUser(userData);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <div className='container mx-auto text-center'>
                <div className="flex justify-center">
                    <img className="rounded-full border border-gray-500" src="https://cdn3.iconfinder.com/data/icons/feather-5/24/user-512.png" alt="User icon" width={200} />
                </div>
                <div className="py-2">
                    <h1>{user && user.username}</h1>
                    <input
                        type="text"
                        id="Name"
                        placeholder="Enter Name"
                        className="m-3 py-1 px-3 bg-gray-50 border border-gray-200 rounded-3xl "
                    />
                </div>
                    <h1>Email</h1>
                    <input
                        type="text"
                        id="Email"
                        placeholder="Enter Email"
                        className="m-3 py-1 px-3 bg-gray-50 border border-gray-200 rounded-3xl "
                    />
                <div className="py-3">
                    <h1>Status</h1>
                    <input
                        type="text"
                        id="Statusongoing"
                        placeholder="Enter Status"
                        className="m-3 py-1 px-3 bg-gray-50 border border-gray-200 rounded-3xl "
                    />
                </div>
                <div className="py-2">
                    <h1>Level of education</h1>
                    <input
                        type="text"
                        id="educationLevel"
                        placeholder="Enter Education Level"
                        className="m-3 py-1 px-3 bg-gray-50 border border-gray-200 rounded-3xl "
                    />
                </div>
                <div className="py-2">
                    <h1>Job</h1>
                    <input
                        type="text"
                        id="job"
                        placeholder="Enter Job"
                        className="m-3 py-1 px-3 bg-gray-50 border border-gray-200 rounded-3xl "
                    />
                </div>
            </div>
        </>
    );
}
export default Jobseekerprofile;
