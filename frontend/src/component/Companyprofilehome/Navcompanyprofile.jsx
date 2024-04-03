import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
function Navcompanyprofile(){
    const { companyusername } = useParams();

    return(
        <nav className="p-4 bg-oragne-200 border-b-4 border-blue-500 ">
        <div className="flex space-x-10 justify-center">
        <div className="text-3xl font-black text-blue-500 "><Link to="/">JobScope</Link>
                </div>
            <ul className='hidden md:flex space-x-9 items-end'>
                <Link to ={`/Companyhome/${companyusername}`} className="text-gray-900 hover:text-blue-500 text-base">HOME</Link>
                <Link to ={`/Companyprofile/${companyusername}`} className="text-gray-900  hover:text-blue-500 text-base">MYCOMPANY</Link>
                <Link to={`/Applicant/${companyusername}`} className="text-gray-900 hover:text-blue-500 text-base">List</Link>
                <Link to = "/Company" className="text-gray-900  hover:text-blue-500 text-base">LOGOUT</Link>
                <Link to={`/Postjobpage/${companyusername}`} className="text-gray-900 hover:text-blue-500 text-base">Postjob</Link>
                </ul>
            </div>
     </nav> 
    )

}
export default Navcompanyprofile