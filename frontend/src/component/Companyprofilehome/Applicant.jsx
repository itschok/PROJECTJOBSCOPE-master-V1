import React from "react";

function Applicant({ data }) {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center text-2xl">Applicant List</div>
      {data && (
        <div className="border-2 rounded-2xl">
          {/* เพิ่มปุ่ม ACCEPT และ DECLINE */}
          <button className="bg-green-500 text-white py-2 px-4 rounded-md m-2">
            ACCEPT
          </button>
          <button className="bg-red-500 text-white py-2 px-4 rounded-md m-2">
            DECLINE
          </button>
        </div>
      )}
    </div>
  );
}

export default Applicant;
