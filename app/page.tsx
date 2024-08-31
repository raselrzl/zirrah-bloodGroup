"use client";
import NavLogo from "@/components/NavLogo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/search');
  };

  return (
    <div className="flex flex-col items-center justify-between px-4 py-6 max-h-screen bg-gray-900 text-gray-200">
      {/* Quote Section */}
      <h2 className="text-2xl font-semibold italic text-green-300 text-center mb-8 md:text-3xl lg:text-4xl md:p-8 lg:p-10">
        "When you give blood, you give hope, strength, and a chance at life."
      </h2>

      {/* Main Content Section */}
      <div className="relative max-w-lg mx-4 mt-6 p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-2xl border border-gray-700 rounded-lg md:max-w-xl lg:max-w-2xl">
        <Image
          src="/assets/images/h11.png"
          alt="Blood Donation"
          className="absolute inset-0 object-cover w-full h-full opacity-30"
          layout="fill"
        />
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-white text-center mb-6 md:text-4xl lg:text-5xl">
            ZIRRAH-LifeLink
          </h2>
          <p className="text-gray-300 text-center mb-6 text-base opacity-80 md:text-lg lg:text-xl">
            ZIRRAH-LifeLink is an open-source web application dedicated to
            simplifying blood donation. Register your blood group, search for
            donors, and check your eligibility to donate. Join us to connect
            donors and recipients, saving lives with ease.
          </p>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="mt-8 grid text-center gap-6 md:gap-8 lg:gap-10">
        {/* Register Button */}
        <div className="flex justify-center items-center group rounded-lg border border-transparent px-6 py-4 bg-gray-800 shadow-md hover:bg-gray-700 transition-colors duration-300 md:px-8 md:py-6 lg:px-10 lg:py-8">
          <a href="/register" rel="noopener noreferrer">
            <h2 className="text-xl font-bold text-white mb-2 md:text-2xl lg:text-3xl">
              Register
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                {" "}
                -&gt;
              </span>
            </h2>
            <p className="text-sm text-gray-400 md:text-base lg:text-lg">
              Register Your Blood Group
            </p>
          </a>
        </div>

        {/* Connect with Donors Button */}
        <div className="flex justify-center items-center">
          <button
            onClick={handleClick}
            className="relative px-6 py-3 font-bold text-white bg-gradient-to-r from-red-500 to-red-600 border-2 border-transparent rounded-lg overflow-hidden group md:px-8 md:py-4 lg:px-10 lg:py-5"
          >
            <span className="absolute inset-0 border-2 border-gradient rounded-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10 text-base md:text-lg lg:text-xl px-8 hover:text-gray-300">
              Connect with Donors
            </span>
          </button>
        </div>

        {/* Eligibility Button */}
        <div className="flex justify-center items-center group rounded-lg border border-transparent px-6 py-4 bg-gray-800 shadow-md hover:bg-gray-700 transition-colors duration-300 md:px-8 md:py-6 lg:px-10 lg:py-8">
          <a href="/eligible" rel="noopener noreferrer">
            <h2 className="text-xl font-bold text-white mb-2 md:text-2xl lg:text-3xl">
              Eligibility
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                {" "}
                -&gt;
              </span>
            </h2>
            <p className="text-sm text-gray-400 md:text-base lg:text-lg">
              Check if you are eligible to donate blood or not
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
