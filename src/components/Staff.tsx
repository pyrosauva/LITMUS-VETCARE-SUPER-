import React, { useState } from 'react';
import { Search, Plus, Phone, Mail } from 'lucide-react';

interface StaffMember {
  id: number;
  name: string;
  role: string;
  specialty: string;
  email: string;
  phone: string;
  image: string;
}

const initialStaff: StaffMember[] = [
  {
    id: 1,
    name: 'Dr. Sarah Wilson',
    role: 'Veterinarian',
    specialty: 'Surgery',
    email: 'sarah.wilson@vetcare.com',
    phone: '(555) 123-4567',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    role: 'Veterinarian',
    specialty: 'Internal Medicine',
    email: 'michael.chen@vetcare.com',
    phone: '(555) 234-5678',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
  },
];

const Staff = () => {
  const [staff] = useState<StaffMember[]>(initialStaff);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search staff..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Plus className="h-5 w-5 mr-2" />
          Add Staff Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
              <p className="mt-1 text-sm text-blue-600">{member.specialty}</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="h-4 w-4 mr-2" />
                  {member.email}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="h-4 w-4 mr-2" />
                  {member.phone}
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t flex justify-end">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  View Schedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Staff;