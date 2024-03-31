import React, { useState } from "react";

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [location, setLocation] = useState("");
    
    // Function to handle search
    const handleSearch = () => {
        // Perform search based on searchTerm and location
        // Update UI with search results
    }

    return (
        <div className="py-16 flex justify-between ">
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
                    <div className="py-8 ">
                        <button
                            onClick={handleSearch}
                            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="border-2 rounded-3xl bg-white m-12 p-4 px-6 text-2xl relative flex justify-between">
                <h1 className="text-5xl font-bold text-orange-500">Result</h1>
                <p className="px-6 py-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti dolor omnis tenetur excepturi totam quae nemo unde necessitatibus nobis consequuntur vero voluptas, eaque eum. Non fugit provident doloribus ipsum debitis.</p>
            
            </div>
        </div>
    );
}

export default Search;