import React from "react";
import { Link } from "react-router-dom";

function LeftMenu() {
    return (
        <div className="text-black">
            <div className="py-4 px-6">
                <ul>
                    <li className="py-2 text-xl">
                        <Link to="/Profile" className="block border border-gray-300 rounded-lg hover:bg-orange-500 hover:text-white py-2 px-4 transition duration-300 ease-in-out">Profile</Link>
                    </li>
                    <li className="py-2 text-xl">
                        <Link to="/Editprofile" className="block border border-gray-300 rounded-lg hover:bg-orange-500 hover:text-white py-2 px-4 transition duration-300 ease-in-out">Edit Profile</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default LeftMenu;
