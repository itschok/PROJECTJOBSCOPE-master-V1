import { useState } from "react";
import axios from 'axios';
import { Link , useNavigate } from "react-router-dom";

function LoginCompany() {
    const [companyIdentifier, setCompanyIdentifier] = useState("");
    const [companypassword, setcompanypassword] = useState("");
    const [errorMessage , setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/companylogin", {
                loginIdentifier: companyIdentifier,
                companyPassword: companypassword,
            } , {
                withCredentials : true
            });
            console.log(response.data.message);
            if (response.data.success) {
                const companyusername = response.data.companyusername;
                navigate(`/Companyhome/${companyusername}`);
            } else {
                setErrorMessage("Invalid username or password");
            }
        } catch (error) {
            console.error("Login error:", error.response.data.message);
            setErrorMessage(error.response.data.message);
        }
    };
    return (
        <>
    
    <div className="container mx-auto py-8">
        <div className="w-full max-w-sm mx-auto bg-white rounded-lg border border-gray-200">
            <h2 className="text-xl text-center text-gray-800 font-semibold py-4">Login</h2>
            <form onSubmit={handleSubmit} className="px-8 py-6">
                <div className="mb-4">
                    <label htmlFor="companyIdentifier" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                    <input type="text" id="companyemail" value={companyIdentifier} onChange={(e) => setCompanyIdentifier(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" autoComplete="username" />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                    <input type="password" id="companypassword" value={companypassword} onChange={(e) => setcompanypassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" autoComplete="current-password" />
                </div>
                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Sign In
                    </button>
                    <Link to="/CompanyRegister" className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800 font-semibold">
                        Register
                    </Link>
                </div>
            </form>
        </div>
    </div>
        </>
    );   
}

export default LoginCompany;