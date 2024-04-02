import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Navcompanyprofile(){
    const { companyusername } = useParams();
    const [user, setUser] = useState({});

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
    return(
        <nav className="p-4 bg-oragne-200 border-b-4 border-blue-500 ">
        <div className="flex space-x-10 justify-center">
        <div className="text-3xl font-black text-blue-500 "><Link to="/">JobScope</Link>
                </div>
            <ul className='hidden md:flex space-x-9 items-end'>
            <Link to ={`/Companyhome/${companyusername}`} className="text-gray-900  hover:text-orange-500 text-base">HOME</Link>
                <Link to ={`/Companyprofile/${companyusername}`} className="text-gray-900  hover:text-blue-500 text-base">MYCOMPANY</Link>
                <Link to = "/CompanyLogin" className="text-gray-900  hover:text-blue-500 text-base">LIST</Link>
                <Link to="/Company" className="text-gray-900 hover:text-blue-500 text-base">LOGOUT</Link>
                </ul>
            </div>
     </nav> 
    )

}
export default Navcompanyprofile