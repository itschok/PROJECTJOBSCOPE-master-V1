import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';

function Search() {
    const [selectedJobName, setSelectedJobName] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("");
    const [selectedSalary, setSelectedSalary] = useState("");
    const [postedJobs, setPostedJobs] = useState([]);
    const { jobseekerusername , jobid } = useParams();

    useEffect(() => {
        fetchPostedJobs();
    }, [ jobseekerusername , jobid ]);

    const fetchPostedJobs = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/getAllPostedJob");
            setPostedJobs(response.data.data);
        } catch (error) {
            console.error("Error fetching posted jobs:", error);
        }
    };

    const applyForJob = async (jobid) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/AddToApplicant/${jobseekerusername}/${jobid}`);
            console.log(response.data.message);
            fetchPostedJobs();
        } catch (error) {
            console.error("Error applying for job:", error);
        }
    };

    const renderPostedJobs = () => {
        return postedJobs.filter((job) => {
            const matchesJobName = selectedJobName === '' || job.JobName.toLowerCase() === selectedJobName.toLowerCase() || selectedJobName === 'All';
            const matchesLocation = selectedLocation === '' || job.Location.toLowerCase() === selectedLocation.toLowerCase() || selectedLocation === 'All';
            const matchesPosition = selectedPosition === '' || job.Position.toLowerCase() === selectedPosition.toLowerCase() || selectedPosition === 'All';
            const matchesSalary = selectedSalary === '' || parseFloat(job.Salary) === parseFloat(selectedSalary) || selectedSalary === 'All';
            return matchesJobName && matchesLocation && matchesPosition && matchesSalary;
        }).map((job) => (
            <tr key={job._id}>
                <td className="px-4 py-3 text-center align-middle">{job.JobName}</td>
                <td className="px-4 py-3 text-center align-middle">{job.Location}</td>
                <td className="px-4 py-3 text-center align-middle">{job.Position}</td>
                <td className="px-4 py-3 text-center align-middle">{job.Salary}</td>
                <td className="px-4 py-3 text-center align-middle">{job.Description}</td>
                <td className="px-4 py-3 text-center align-middle">
                    <button className="rounded-md border border-gray-400 px-3 py-1 hover:bg-gray-700 hover:text-white transition-colors duration-300"
                    onClick={() => applyForJob(job._id)}>Apply
                    </button>
                </td>
            </tr>
        ));
    };

    const jobNames = ["All", ...new Set(postedJobs.map(job => job.JobName))];
    const locations = ["All", ...new Set(postedJobs.map(job => job.Location))];
    const positions = ["All", ...new Set(postedJobs.map(job => job.Position))];
    const salaries = ["All", ...new Set(postedJobs.map(job => job.Salary))];

    return (
        <div className="py-16 flex">
            <div className="bg-white border-orange-500 m-12 p-4 px-6 text-base border-2 rounded-3xl text-center">
                <h1>SEARCH FOR</h1>
                <Form>
                    <Form.Group controlId="jobNameSelect">
                        <Form.Label>Job Name</Form.Label>
                        <Form.Control 
                            as="select" 
                            value={selectedJobName}
                            onChange={(e) => setSelectedJobName(e.target.value)}
                        >
                            {jobNames.map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="locationSelect">
                        <Form.Label>Location</Form.Label>
                        <Form.Control 
                            as="select" 
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                        >
                            {locations.map((location, index) => (
                                <option key={index} value={location}>{location}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="positionSelect">
                        <Form.Label>Position</Form.Label>
                        <Form.Control 
                            as="select" 
                            value={selectedPosition}
                            onChange={(e) => setSelectedPosition(e.target.value)}
                        >
                            {positions.map((position, index) => (
                                <option key={index} value={position}>{position}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="salarySelect">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control 
                            as="select" 
                            value={selectedSalary}
                            onChange={(e) => setSelectedSalary(e.target.value)}
                        >
                            {salaries.map((salary, index) => (
                                <option key={index} value={salary}>{salary}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </div>
            <div className="border-2 rounded-3xl bg-white m-12 p-4 px-6 text-2xl">
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Company Name</th>
                            <th className="px-4 py-2">Location</th>
                            <th className="px-4 py-2">Position</th>
                            <th className="px-4 py-2">Salary</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Apply</th>
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
