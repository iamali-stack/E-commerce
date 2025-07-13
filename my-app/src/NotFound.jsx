import React from 'react';
import notfound from "./assets/images/error.svg"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
     <img src={notfound} alt="Page Not Found" className=" max-w-full mb-6" />
    <h1 className="text-3xl font-bold mb-2 text-gray-800">Page Not Found</h1>
    <p className="text-gray-500 text-lg">Sorry, the page you are looking for does not exist</p>
    </div>
  );
} 