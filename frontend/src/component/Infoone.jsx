import React, { useEffect, useState } from "react";

function InfoOne() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    {
      url: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ante euismod, vulputate odio non, scelerisque ipsum."
    },
    {
      url: "https://images.unsplash.com/photo-1683009427666-340595e57e43?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Fusce id justo in lectus tincidunt eleifend. Nam ut arcu ut lacus consequat feugiat sed ac nisi."
    },
    {
      url: "https://images.unsplash.com/photo-1683009427042-e094996f9780?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    }
    // Add more image URLs as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1));
    }, 5000); // Change slide every 5 seconds (5000 milliseconds)

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="container mx-auto py-16">
      <div className="px-6  ">
        <h2 className="text-3xl font-semibold">TOPCOMPANY</h2>
        <div className="w-full flex justify-between">
          <div className="w-1/3 p-4">
            <img src={images[currentImage].url} alt={`Image ${currentImage}`} className="w-full" />
          </div>
          <div className="w-2/3 p-4">
            <p className="text-gray-600">รายละเอียดรูปภาพที่ {currentImage + 1}</p>
            <p className="text-gray-600">{images[currentImage].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoOne;
