import React, { useState }  from "react";
import { Link } from "react-router-dom";
function NavLoginC(){
    return(
    <nav className="p-4 bg-blue-200 ">
        <div className="flex space-x-10 justify-center">
                <div className="text-3xl font-black text-blue-500 "><Link to="/">JobScope</Link>
                </div>
                <ul className='hidden md:flex space-x-9 items-end'>
                <Link to ="/Company" className="text-gray-900  hover:text-blue-500 text-base">HOME</Link>
                <Link to ="/Login" className="text-gray-900 hover:text-blue-500 text-base">FOR JOBSEEKER</Link>
                </ul>
        </div>
     </nav> 
    )
}
export default NavLoginC