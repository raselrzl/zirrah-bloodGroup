"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UserForm: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    nidNumber: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
    bloodGroup: '',
    city: '',
    region: '',
    village:'',
  });

  const [regions, setRegions] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  useEffect(() => {
    const uniqueRegions = ['Dhaka', 'Sylhet', 'Barishal', 'Chattogram', 'Khulna', 'Rajshahi', 'Rangpur', 'Mymensingh'];
    setRegions(uniqueRegions);
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

    setCities(getCities(formData.region));
  }, [formData.region]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      if (response.ok) {
        router.push(`/register/${encodeURIComponent(formData.name)}/`);
      } else {
        alert(`Failed to add user: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="px-6 md:px-10 lg:px-20 xl:px-24">
      <h1 className="text-3xl font-bold text-center mb-6">Submit User Data</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded w-full"
            required
          />
          <input
            type="text"
            value={formData.nidNumber}
            onChange={(e) => setFormData({ ...formData, nidNumber: e.target.value })}
            placeholder="NID Number"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded w-full"
            required
          />
          <input
            type="text"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            placeholder="Phone Number"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded w-full"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded w-full"
            required
          />
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded w-full"
            required
          />
          <select
            value={formData.bloodGroup}
            onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded w-full"
            required
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <select
            value={formData.region}
            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded w-full"
            required
          >
            <option value="">Select Region</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <select
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded w-full"
            required
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={formData.village}
            onChange={(e) => setFormData({ ...formData, village: e.target.value })}
            placeholder="Village"
            className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
