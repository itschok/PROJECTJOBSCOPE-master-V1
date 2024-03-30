import React from "react";
function Companyhome(){
    return(
        <>
        <div className="py-16 bg-blue-100">
            <div className='container mx-auto text-center '>
                <h1 className = "text-5xl font-bold text-blue-500">Welcome to Our Website</h1>
                <p className="text-3xl mt-4">Job Board for Developers</p>
                <p className="text-3xl mt-4">Designers and Marketers</p>
            </div>
        </div>
        <div className="container mx-auto flex text-center py-16">
            <div className="w-1/2">
                <img src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="" 
                className="w-full h-auto"/>
            </div>
            <div className="w-1/2 px-6">
                <h2 className="text-3xl font-semibold">Welcome to Our Website</h2>
                <p className="text-gray-600 mt-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui error voluptate, animi totam, optio ex consequuntur impedit culpa harum autem quaerat, quibusdam asperiores dolore sint facilis ut doloribus pariatur eum.</p>
                </div>
        </div>
        <footer className="bg-blue-500 py-4">
            <div className="container mx-auto text-center">
                <p>&copyright: 2024 Reactsite. All Right Research</p>
            </div>
        </footer>
        </>
    )
}
export default Companyhome