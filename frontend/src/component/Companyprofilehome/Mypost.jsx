import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Mypost() {
    const [postedJobs, setPostedJobs] = useState([]);
    const { companyusername } = useParams();

    useEffect(() => {
        fetchPostedJobs();
    }, []);

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
                <td className="py-3 text-center align-middle">{job.JobName}</td>
                <td className="py-3 text-center align-middle">{job.Location}</td>
                <td className="py-3 text-center align-middle">{job.Position}</td>
                <td className="py-3 text-center align-middle">{job.Salary}</td>
                <td className="py-3 text-center align-middle">
                    <Link to={`/${companyusername}/editjob/${job._id}`} className="text-blue-500 hover:text-blue-800 font-semibold">
                        Edit
                    </Link>
                </td>
            </tr>
        ));
    };

    return (
        <div className="container mx-auto py-8">
            <div className="text-center text-2xl">MY POST LIST</div>
            <div className="border-2 rounded-2xl">
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Job Name</th>
                            <th className="px-4 py-2">Location</th>
                            <th className="px-4 py-2">Position</th>
                            <th className="px-4 py-2">Salary</th>
                            <th className="px-4 py-2">Actions</th>
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

export default Mypost;
