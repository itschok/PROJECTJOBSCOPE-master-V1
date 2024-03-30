import { Link } from "react-router-dom";
function NavLogin(){
    return(
    <nav className="p-4 bg-orange-200 ">
        <div className="flex space-x-10 justify-center ">
                <div className="text-3xl font-black text-orange-500 "><Link to="/">JobScope</Link>
                </div>
                <ul className='hidden md:flex space-x-9 items-end'>
                <Link to ="/" className="text-gray-900  hover:text-orange-500 text-base">HOME</Link>
                <Link to ="/CompanyLogin" className="text-gray-900 hover:text-orange-500 text-base">FOR COMPANY</Link>
                </ul>
        </div>
    </nav> 
    )
}
export default NavLogin