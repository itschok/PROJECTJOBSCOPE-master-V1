import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Viewcompany() {
    const { companyusername } = useParams();
    const [companyData, setCompanyData] = useState({
        CompanyName: "",
        Email: "",
        Location: "",
        Industry: ""
    });

    useEffect(() => {
        fetchCompanyData();
    }, [companyusername]);

    const fetchCompanyData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/profile/companies/${companyusername}`);
            setCompanyData(response.data);
        } catch (error) {
            console.error("Error fetching company data:", error);
        }
    };

    return (
        <div className='container mx-auto text-center py-5'>
            <div className="flex justify-center">
                <img className="rounded-full border border-gray-500" src="https://cdn0.iconfinder.com/data/icons/business-1390/24/20_-_Company-2-256.png" alt="Company icon" width={200} />
            </div>
            <div className="py-4">
                <h1 className="text-3xl font-bold">Company Information</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h1 className="text-xl font-semibold">Name</h1>
                    <input
                        type="text"
                        id="CompanyName"
                        value={companyData.CompanyName}
                        className="m-3 py-2 px-4 bg-gray-200 border border-gray-400 rounded-lg w-full focus:outline-none focus:bg-white"
                        readOnly
                    />
                </div>
                <div>
                    <h1 className="text-xl font-semibold">Email</h1>
                    <input
                        type="text"
                        id="Email"
                        value={companyData.CompanyEmail}
                        className="m-3 py-2 px-4 bg-gray-200 border border-gray-400 rounded-lg w-full focus:outline-none focus:bg-white"
                        readOnly
                    />
                </div>
            </div>
            <div>
                <h1 className="text-xl font-semibold">Location</h1>
                <input
                    type="text"
                    id="Location"
                    value={companyData.Location}
                    className="m-3 py-2 px-4 bg-gray-200 border border-gray-400 rounded-lg w-full focus:outline-none focus:bg-white"
                    readOnly
                />
            </div>
            <div>
                <h1 className="text-xl font-semibold">Industry</h1>
                <input
                    type="text"
                    id="Industry"
                    value={companyData.Industry}
                    className="m-3 py-2 px-4 bg-gray-200 border border-gray-400 rounded-lg w-full focus:outline-none focus:bg-white"
                    readOnly
                />
            </div>
        </div>
    );
}

export default Viewcompany;
