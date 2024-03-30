import React from "react";
import { Link } from "react-router-dom";
function Navprofile(){
    return(
        <nav className="p-4 bg-oragne-200  border-b-4 border-orange-500">
        <div className="flex space-x-10 justify-center">
                <div className="text-3xl font-black text-orange-500 "><Link to="/">JobScope</Link>
                </div>
                <ul className='hidden md:flex space-x-9 items-end'>
                <Link to ="/Jobseekerhome" className="text-gray-900  hover:text-orange-500 text-base">HOME</Link>
                <Link to ="/Profile" className="text-gray-900 hover:text-orange-500 text-base">PROFILE</Link>
                <Link to ="/Myjob" className="text-gray-900 hover:text-orange-500 text-base">MYJOB</Link>
                <Link to ="/" className="text-gray-900 hover:text-orange-500 text-base">LOGOUT</Link>
                </ul>
        </div>
     </nav> 
    )
}
export default Navprofile