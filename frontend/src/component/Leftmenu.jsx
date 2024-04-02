import { useEffect , useState } from "react";
import { useNavigate , useParams} from "react-router-dom";
import axios from "axios";

function LeftMenu() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
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


    const handleEditProfileClick = () => {
        navigate(`/Editprofile/${jobseekerusername}`);
    };

    return (
        <div className="text-black-100">
            <div className="py-4 px-6">
                <ul>
                    <li className="py-2 text-xl">
                        <button onClick={handleEditProfileClick} className="border-2 hover:bg-orange-500 px-4">Edit Profile</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default LeftMenu;
