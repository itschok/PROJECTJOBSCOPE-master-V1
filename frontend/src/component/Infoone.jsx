import React, { useEffect, useState } from "react";

function InfoOne() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1683009427666-340595e57e43?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    // Add more image URLs as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1));
    }, 5000); // Change slide every 5 seconds (5000 milliseconds)

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="container mx-auto flex text-center py-16">
      <div className="w-1/2">
        <img src={images[currentImage]} alt="" className="w-full h-auto" />
      </div>
      <div className="w-1/2 px-6">
        <h2 className="text-3xl font-semibold">Welcome to Our Website</h2>
        <p className="text-gray-600 mt-4">

          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui error voluptate, animi totam, optio ex consequuntur impedit culpa harum autem quaerat, quibusdam asperiores dolore sint facilis ut doloribus pariatur eum.
        </p>
      </div>
    </div>
  );
}

export default InfoOne;