import { useNavigate } from "react-router-dom";

function Admin() {
  const handleViewJobseeker = async () => {
    // โค้ดสำหรับการดูข้อมูล Jobseeker
  };

  const handleViewCompanyUser = async () => {
    // โค้ดสำหรับการดูข้อมูลผู้ใช้บริษัท
  };

  return (
    <div className="py-16 ">
      <div className="border border-gray-300 rounded-lg p-6 max-w-md mx-auto mt-10">
        <h1 className="text-center text-2xl font-bold mb-6">Admin Page</h1>
        <div className="flex justify-center space-x-5">
          <button onClick={handleViewJobseeker} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View Jobseeker
          </button>
          <button onClick={handleViewCompanyUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View Company User
          </button>
        </div>
      </div>
      <div className="border border-gray-300 rounded-lg p-6 max-w-md mx-auto mt-10">
        <h2 className="text-center text-xl font-bold mb-4">Box2</h2>
        <p className="text-center">What?</p>
      </div>
    </div>
  );
}

export default Admin;
