import React from "react";
import { Link } from "react-router-dom";
function LeftMenu() {
    return (
        <div className=" text-black-100">
            <div className="py-4 px-6">
                <ul>
                    <li className="py-2 text-xl ">
                        <a href="/Profile" className="border-2  hover:bg-orange-500 px-4">Profile</a>
                    </li>
                    <li className="py-2 text-xl">
                        <a href="/Editprofile" className="border-2  hover:bg-orange-500 px-4">Edit Profile</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default LeftMenu;