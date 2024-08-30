"use client"
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
    <div className="flex max-h-screen lg:min-h-screen flex-col items-center justify-between px-2 lg:p-20">
      <h2 className="text-2xl mx-6 mt-8 text-green-300 italic text-center p-6 border border-gray-700">
        "When you give blood, you give hope, strength, and a chance at life."
      </h2>
      <div
        className="max-w-sm mx-6 mt-2 p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-xl border border-gray-700 
                sm:max-w-lg 
                md:max-w-6xl "
      >
        <h2 className="text-2xl font-semibold text-white text-center mb-4">
          ZIRRAH-LifeLink
        </h2>
        <p className="text-gray-300 text-center mb-6 text-sm opacity-50">
          ZIRRAH-LifeLink is an open-source web application dedicated to
          simplifying blood donation. Register your blood group, search for
          donors, and check your eligibility to donate. Join us to connect
          donors and recipients, saving lives with ease.
        </p>
      </div>

      <div className="mb-32 mt-10 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left">
        <div className="flex justify-center items-center group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <a href="/register" rel="noopener noreferrer">
            <h2 className="mb-3 text-2xl font-bold">
              Register{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Register Your Blood Group
            </p>
          </a>
        </div>

        <div className="flex justify-center items-center m-4">
          <button onClick={handleClick} className="relative px-20 py-3 font-bold text-white bg-transparent border-2 border-transparent rounded-lg overflow-hidden group">
            <span className="absolute inset-0 border-2 border-gradient rounded-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">Find Donar</span>
          </button>
        </div>

        <div className="flex justify-center items-center group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <a href="/eligible" rel="noopener noreferrer">
            <h2 className="mb-3 text-2xl font-bold">
              Eligibility{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Check if you are eligible to donate blood or not
            </p>
          </a>
        </div>
      </div>

    </div>
  );
}
