import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center  px-4 sm:px-0 ">
      <div className="max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl w-full p-2 sm:p-5 md:p-8 lg:p-10 bg-white border-4 border-red-500 rounded-lg shadow-2xl">
        <div className="text-lg sm:text-3xl md:text-4xl lg:text-6xl xl:text-8xl font-satoshi font-extrabold text-center text-red-600 mb-4 sm:mb-10 md:mb-15 lg:mb-20">
          ACCESS DENIED
        </div>
        <div className="bg-red-700 flex items-center justify-center h-7 sm:h-8 md:h-9 lg:h-10">
          <p className="text-xs sm:text-lg md:text-xl font-bold text-center text-white font-satoshi">
            403 Forbidden
          </p>
        </div>

        <div className="mt-5 text-xs sm:text-lg md:text-xl font-satoshi font-bold text-center text-red-900">
          Login was unsuccessful due to discrepancies in the information
          provided. Please verify your credentials or details and try again.
        </div>
      </div>
    </div>
  );
};

export default page;
