import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Navprofile(){
    const { jobseekerusername } = useParams();
    const [user, setUser] = useState({});

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

    return(
        <nav className="p-4 bg-oragne-200 ">
        <div className="flex space-x-10 justify-center">
                <div className="text-3xl font-black text-orange-500 "><Link to={`/Jobseekerhome/${jobseekerusername}`}>JobScope</Link>
                </div>
                <ul className='hidden md:flex space-x-9 items-end'>
                <Link to ={`/Jobseekerhome/${jobseekerusername}`} className="text-gray-900  hover:text-orange-500 text-base">HOME</Link>
                <Link to ={`/Profile/${jobseekerusername}`} className="text-gray-900 hover:text-orange-500 text-base">PROFILE</Link>
                <Link to ={`/Myjob/${jobseekerusername}`} className="text-gray-900 hover:text-orange-500 text-base">MYJOB</Link>
                <Link to ="/" className="text-gray-900 hover:text-orange-500 text-base">LOGOUT</Link>
                </ul>
        </div>
    </nav> 
    )
}
export default Navprofile