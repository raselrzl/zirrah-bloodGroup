import Image from "next/image";
import React from "react";

const Success = async () => {
  return (
    <div className="flex flex-col items-center justify-between px-4 py-6 max-h-screen md:px-6 md:py-8 lg:px-8 lg:py-10">
      <Image
        src="/assets/images/success.gif"
        height={300}
        width={280}
        alt="success"
      />
      <h2 className="header mb-[100%] px-10 max-w-[600px] text-center">
        Your <span className="text-green-500">Blood Group</span> has been
        successfully registered, Thank You being a part.
      </h2>
    </div>
  );
};

export default Success;
