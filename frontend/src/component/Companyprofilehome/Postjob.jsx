import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Postjob() {
    const [formData , setFormData] = useState({
        ActionCommand : "create" ,
        JobName = "" ,
        Location : "" ,
        Position : "" ,
        Salary : "" , 
        Description : "" ,
    })

    const handleChange = (event) => {
        const { id , value } = event.target;
        setFormData({})
    }

    const { companyusername } = useParams();

    const handlePost = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/api/postjob/${companyusername}` , {
                JobName : name ,
                Location : location ,
                Position : position ,
                Salary : salary ,
                Description : description ,
            });

            if(response.data.succuss) {
                console.log("Job Posted Success" , response.data.message);
            } else {
                console.error("Job posting failed:", response.data.message);
            }
        } catch(error) {
            console.error("Error posting job:", error);
        }
    }

    return (
        <div className='container mx-auto text-center py-5 '>
            <form>
                <div className="font-semibold py-4">CompanyProfile</div>
                <div className="flex justify-center">
                    <img className="rounded-full border border-gray-500" src="https://cdn0.iconfinder.com/data/icons/business-1390/24/20_-_Company-2-256.png" alt="Company icon" width={200} />
                </div>
                <div className="mt-5 py-5 text-sm font-semibold ">
                    <label  className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mt-5 py-5 text-sm font-semibold">
                    <label htmlFor="location">Location:</label>
                    <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mt-5 py-5 text-sm font-semibold">
                    <label htmlFor="position">Position:</label>
                    <input type="text" id="position" value={position} onChange={(e) => setPosition(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mt-5 py-5 text-sm font-semibold">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mt-5 py-5 text-sm font-semibold">
                    <label htmlFor="salary">Salary:</label>
                    <textarea id="salary" value={salary} onChange={(e) => setSalary(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <button onClick={handlePost} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
                    Post
                </button>
            </form>
        </div>
    );
}

export default Postjob;
