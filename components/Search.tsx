"use client";

import React, { useEffect, useState } from "react";
import { User } from "@/lib/type";
import { FaUser, FaPhoneAlt, FaHome, FaHeartbeat, FaCity, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

interface SearchProps {
  users: User[];
}

const Search: React.FC<SearchProps> = ({ users }) => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState({
    name: "",
    nidNumber: "",
    village: "",
    phoneNumber: "",
    bloodGroup: "",
    city: "",
    region: "",
  });
  const [regions, setRegions] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    const uniqueRegions = Array.from(new Set(users.map((user) => user.region)));
    setRegions(uniqueRegions);
  }, [users]);

  useEffect(() => {
    const getCities = (region: string) => {
      switch (region) {
        case "Dhaka":
          return ["Dhaka", "Narayanganj", "Gazipur"];
        // Add other regions and cities as needed
        default:
          return [];
      }
    };
    setCities(getCities(search.region));
  }, [search.region]);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        (search.name ? user.name.toLowerCase().includes(search.name.toLowerCase()) : true) &&
        (search.nidNumber ? user.nidNumber === search.nidNumber : true) &&
        (search.village ? user.village === search.village : true) &&
        (search.phoneNumber ? user.phoneNumber.includes(search.phoneNumber) : true) &&
        (search.bloodGroup ? user.bloodGroup === search.bloodGroup : true) &&
        (search.city ? user.city === search.city : true) &&
        (search.region ? user.region === search.region : true)
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  return (
    <div className="mb-6 px-10">
      <div className="flex flex-col justify-center md:flex-row md:space-x-2 space-y-4 md:space-y-0">
        <input
          type="text"
          value={search.name}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
          placeholder="Search by Name"
          className="bg-gray-800 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
        />
        <input
          type="text"
          value={search.nidNumber}
          onChange={(e) => setSearch({ ...search, nidNumber: e.target.value })}
          placeholder="Search by NID Number"
          className="bg-gray-800 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
        />
        <input
          type="text"
          value={search.phoneNumber}
          onChange={(e) => setSearch({ ...search, phoneNumber: e.target.value })}
          placeholder="Search by Phone Number"
          className="bg-gray-800 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
        />
      </div>
      <div className="flex flex-col justify-center mt-2 md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <select
          value={search.bloodGroup}
          onChange={(e) => setSearch({ ...search, bloodGroup: e.target.value })}
          className="bg-gray-800 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
        >
          <option value="">Search by Blood Group</option>
          {bloodGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
        <select
          value={search.region}
          onChange={(e) => setSearch({ ...search, region: e.target.value, city: "" })}
          className="bg-gray-800 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
        >
          <option value="">Select Region</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        <select
          value={search.city}
          onChange={(e) => setSearch({ ...search, city: e.target.value })}
          className="bg-gray-800 text-white border border-gray-700 px-4 py-2 w-full md:w-1/3"
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <button
  onClick={() => {
    const filtered = users.filter((user) => {
      return (
        (search.name ? user.name.toLowerCase().includes(search.name.toLowerCase()) : true) &&
        (search.nidNumber ? user.nidNumber === search.nidNumber : true) &&
        (search.village ? user.village === search.village : true) &&
        (search.phoneNumber ? user.phoneNumber.includes(search.phoneNumber) : true) &&
        (search.bloodGroup ? user.bloodGroup === search.bloodGroup : true) &&
        (search.city ? user.city === search.city : true) &&
        (search.region ? user.region === search.region : true)
      );
    });
    setFilteredUsers(filtered);
  }}
  className="relative px-20 py-2.5 font-bold text-white bg-transparent border-2 border-transparent overflow-hidden group"
>
  <span className="absolute inset-0 border-2 border-gradient opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
  <span className="relative z-10">Search</span>
</button>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-6 shadow-lg border border-gray-700 transition-transform transform hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold flex items-center">
                <FaUser className="mr-2 text-green-300" />
                {user.name}
              </h2>
              <a
                href={`tel:${user.phoneNumber}`}
                className="text-green-500 hover:text-green-200"
              >
                <FaPhoneAlt className="text-2xl" />
              </a>
            </div>
            <div className="mb-2">
              <p className="flex items-center text-sm">
                <FaPhone className="mr-2 text-green-500" />
                {user.phoneNumber}
              </p>
            </div>
            <div className="mb-2">
              <p className="flex items-center text-sm">
                <FaHome className="mr-2 text-green-500" />
                Village/Area: {user.village}
              </p>
            </div>
            <div className="mb-2">
              <p className="flex items-center text-sm">
                <FaHeartbeat className="mr-2 text-green-500" />
                Blood Group: {user.bloodGroup}
              </p>
            </div>
            <div className="mb-2">
              <p className="flex items-center text-sm">
                <FaCity className="mr-2 text-green-500" />
                City: {user.city}
              </p>
            </div>
            <div>
              <p className="flex items-center text-sm">
                <FaMapMarkerAlt className="mr-2 text-green-500" />
                Region: {user.region}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
