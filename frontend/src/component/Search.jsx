import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [location, setLocation] = useState("");
    const [postedJobs, setPostedJobs] = useState([]);
    const { companyusername } = useParams();

    useEffect(() => {
        fetchPostedJobs();
    }, [companyusername]);

    const fetchPostedJobs = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/getPostedJob/${companyusername}`);
            setPostedJobs(response.data.data);
        } catch (error) {
            console.error("Error fetching posted jobs:", error);
        }
    };

    const renderPostedJobs = () => {
        return postedJobs.map((job) => (
            <tr key={job._id}>
                <td>{job.JobName}</td>
                <td>{job.Location}</td>
                <td>{job.Position}</td>
                <td>{job.Salary}</td>
            </tr>
        ));
    };

    return (
        <div className="py-16 flex">
            <div className="bg-white border-orange-500 m-12 p-4 px-6 text-base border-2 rounded-3xl text-center">
                <h1>SEARCH FOR</h1>
                <input
                    type="text"
                    id="SEARCH"
                    className="py-1 px-3 bg-gray-50 border border-gray-200"
                    placeholder="Type to search.."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="py-8 text-center">
                    <h1>LOCATION</h1>
                    <select
                        id="location"
                        className="m-3  px-3 bg-gray-50 border border-gray-200"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    >
                        <option value="">----------------</option>
                        <option value="location1">Location 1</option>
                        <option value="location2">Location 2</option>
                        <option value="location3">Location 3</option>
                    </select>
                </div>
            </div>
            <div className="border-2 rounded-3xl bg-white m-12 p-4 px-6 text-2xl">
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Job Name</th>
                            <th className="px-4 py-2">Location</th>
                            <th className="px-4 py-2">Position</th>
                            <th className="px-4 py-2">Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postedJobs.length > 0 ? renderPostedJobs() : <tr><td colSpan="5">No posted jobs</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Search;
