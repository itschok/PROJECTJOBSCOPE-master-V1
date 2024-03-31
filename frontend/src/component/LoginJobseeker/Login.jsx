import { useState } from "react";
import axios from "axios";
import { Link , useNavigate } from "react-router-dom";
function Login() {
    const [jobseekerIdentifier, setJobSeekerIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/jobseekerlogin", {
                loginIdentifier: jobseekerIdentifier,
                jobseekerPassword: password,
            });
            console.log(response.data.message);
            if (response.data.success) {
                navigate(`/Profile/${jobseekerIdentifier}`);
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
return (
    <div className="container mx-auto py-8">
        <div className="w-full max-w-md mx-auto bg-white rounded-lg border border-gray-200">
            <h2 className="text-xl text-center text-gray-800 font-semibold py-4">JOBSEEKER LOGIN</h2>
            <form onSubmit={handleSubmit} className="px-8 py-6">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
                    <input type="text" id="username" value={jobseekerIdentifier} onChange={(e) => setJobSeekerUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" autoComplete="username" />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" autoComplete="current-password" />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Sign In
                    </button>
                    {/* Add links for registration or password reset */}
                    <Link to="/Register" className="inline-block align-baseline text-sm text-orange-500 hover:text-orange-800 font-semibold">
                        Register
                    </Link>
                </div>
            </form>
        </div>
    </div>
        </>
    );   
}
export default Login