"use client";
import { User } from '@/lib/type';
import React, { useEffect, useState } from 'react';

const Search: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState({
    name: '',
    nidNumber: '',
    village:'',
    phoneNumber: '',
    bloodGroup: '',
    city: '',
    region: ''
  });
  const [regions, setRegions] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/userdata'); // Your API route
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: User[] = await response.json();
        setUsers(data);
        const uniqueRegions = Array.from(new Set(data.map(user => user.region)));
        setRegions(uniqueRegions);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    const getCities = (region: string) => {
      switch (region) {
        case 'Dhaka':
          return ['Dhaka', 'Narayanganj', 'Gazipur', 'Manikgonj', 'Munshigonj', 'Narsingdi', 'Tangail', 'Kishorgonj', 'Netrokona', 'Faridpur', 'Gopalgonj', 'Madaripur', 'Rajbari', 'Shariatpur'];
        case 'Sylhet':
          return ['Habiganj', 'Moulvibazar', 'Sunamganj', 'Sylhet'];
        case 'Barishal':
          return ['Barishal', 'Patuakhali', 'Bhola', 'Pirojpur', 'Barguna', 'Jhalokati'];
        case 'Chattogram':
          return ['Chittagong', 'Cox\'s Bazar', 'Rangamati', 'Bandarban', 'Khagrachhari', 'Feni', 'Lakshmipur', 'Comilla', 'Noakhali', 'Brahmanbaria', 'Chandpur'];
        case 'Khulna':
          return ['Khulna', 'Bagherhat', 'Sathkhira', 'Jessore', 'Magura', 'Jhenaidah', 'Narail', 'Kushtia', 'Chaudanga', 'Meherpur'];
        case 'Rajshahi':
          return ['Rajshai', 'Chapainawabganj', 'Natore', 'Naogaon', 'Pabna', 'Sirajganj', 'Bogra', 'Joypurhat'];
        case 'Rangpur':
          return ['Rangpur', 'Nilphamari', 'Saidpur', 'Dinajpur'];
        case 'Mymensingh':
          return ['Tangail', 'Jamalpur', 'Kishoreganj', 'Sherpur', 'Netrokona', 'Mymensingh'];
        default:
          return [];
      }
    };

    setCities(getCities(search.region));
  }, [search.region]);

  useEffect(() => {
    const filtered = users.filter(user =>
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
    <div className="px-6 md:px-10 lg:px-20 xl:px-24">
      <h1 className="text-3xl font-bold text-center mb-6">Here is our all Super Human</h1>
      
      <div className="mb-6 px-10">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="text"
            value={search.name}
            onChange={(e) => setSearch({ ...search, name: e.target.value })}
            placeholder="Search by Name"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded w-full md:w-1/4"
          />
          <input
            type="text"
            value={search.nidNumber}
            onChange={(e) => setSearch({ ...search, nidNumber: e.target.value })}
            placeholder="Search by NID Number"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded w-full md:w-1/4"
          />
          <input
            type="text"
            value={search.phoneNumber}
            onChange={(e) => setSearch({ ...search, phoneNumber: e.target.value })}
            placeholder="Search by Phone Number"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded w-full md:w-1/4"
          />
          <select
            value={search.bloodGroup}
            onChange={(e) => setSearch({ ...search, bloodGroup: e.target.value })}
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded w-full md:w-1/4"
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
          <select
            value={search.region}
            onChange={(e) => setSearch({ ...search, region: e.target.value, city: '' })}
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded w-full md:w-1/4"
          >
            <option value="">Select Region</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          <select
            value={search.city}
            onChange={(e) => setSearch({ ...search, city: e.target.value })}
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded w-full md:w-1/4"
          >
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <div className="flex justify-center items-center m-4">
          <button onClick={() => setFilteredUsers(users.filter(user =>
              (search.name ? user.name.toLowerCase().includes(search.name.toLowerCase()) : true) &&
              (search.nidNumber ? user.nidNumber === search.nidNumber : true) &&
              (search.village ? user.village === search.village : true) &&
              (search.phoneNumber ? user.phoneNumber.includes(search.phoneNumber) : true) &&
              (search.bloodGroup ? user.bloodGroup === search.bloodGroup : true) &&
              (search.city ? user.city === search.city : true) &&
              (search.region ? user.region === search.region : true)
            ))} className="relative px-20 py-2.5 font-bold text-white bg-transparent border-2 border-transparent rounded-lg overflow-hidden group">
            <span className="absolute inset-0 border-2 border-gradient rounded-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">Search</span>
          </button>
        </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-6 rounded-lg shadow-lg border border-gray-700"
          >
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="mt-2">{user.email}</p>
            <p className="mt-2">NID: {user.nidNumber}</p>
            <p className="mt-2">Phone Number: {user.phoneNumber}</p>
            <p className="mt-2">Blood Group: {user.bloodGroup}</p>
            <p className="mt-2">City: {user.city}</p>
            <p className="mt-2">Region: {user.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
