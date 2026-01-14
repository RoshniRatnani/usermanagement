export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: Company;
  address: Address;
  status?: 'Active' | 'In-Active';
}

export interface Company {
  name: string;
}

export interface Address {
  city: string;
  street?: string;
  suite?: string;
  zipcode?: string;
}
