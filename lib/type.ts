export interface User {
  id: string; // Add this line if the user object includes an id
  name: string;
  nidNumber: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  bloodGroup: string;
  city: string;
  region: string;
  village: string;
  // Add any other fields that might exist on a User
}