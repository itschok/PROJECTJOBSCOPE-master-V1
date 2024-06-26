import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
    const [jobseekerUsername, setJobSeekerUsername] = useState("");
    const [jobseekerEmail, setJobSeekerEmail] = useState("");
    const [jobseekerPassword, setJobSeekerPassword] = useState("");
    const [jobseekerconfirmPassword, setJobSeekerConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (jobseekerPassword !== jobseekerconfirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/jobseekerregister", {
                jobseekerUsername,
                jobseekerEmail,
                jobseekerPassword,
            });
            console.log(response.data.message);
            if (response.data.success) {
                navigate("/Login");
            } else {
                setErrorMessage("Login failed");
            }
        } catch (error) {
            console.error("Registration error:", error.response.data.message);
            setErrorMessage("Registration error: " + error.response.data.message);
        }
    };

return (
        <div className="container mx-auto py-8">
            <div className="w-full max-w-md mx-auto bg-white rounded-lg border border-gray-200">
                <h2 className="text-xl text-center text-gray-800 font-semibold py-4">Jobseeker Register</h2>
                <form onSubmit={handleSubmit} className="px-8 py-6">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
                        <input type="text" id="username" value={jobseekerUsername} onChange={(e) => setJobSeekerUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" autoComplete="username" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                        <input type="email" id="email" value={jobseekerEmail} onChange={(e) => setJobSeekerEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                        <input type="password" id="password" value={jobseekerPassword} onChange={(e) => setJobSeekerPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" autoComplete="new-password" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password</label>
                        <input type="password" id="confirmPassword" value={jobseekerconfirmPassword} onChange={(e) => setJobSeekerConfirmPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" autoComplete="new-password" />
                    </div>
                    {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Register
                        </button>
                        <Link to="/Login" className="inline-block align-baseline text-sm text-orange-500 hover:text-orange-800 font-semibold">
                            Back
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;