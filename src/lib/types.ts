// Previous interfaces remain the same...

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: 'medication' | 'vaccine' | 'supply' | 'equipment';
  quantity: number;
  unit: string;
  minStock: number;
  price: number;
  supplier: string;
  expiryDate?: string;
  location: string;
  notes?: string;
}

export interface LabResult {
  id: string;
  patientId: string;
  patientName: string;
  testType: string;
  requestDate: string;
  requestedBy: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  completedDate?: string;
  results: Array<{
    id: string;
    parameter: string;
    value: string | number;
    unit: string;
    referenceRange: string;
    flag?: 'normal' | 'low' | 'high' | 'critical';
  }>;
  notes?: string;
  attachments?: string[];
}

export interface Staff {
  id: string;
  name: string;
  role: 'veterinarian' | 'technician' | 'assistant' | 'receptionist' | 'admin';
  specialties?: string[];
  schedule: {
    [key: string]: {
      start: string;
      end: string;
    };
  };
  contact: {
    email: string;
    phone: string;
    emergency: string;
  };
  qualifications: {
    degree: string;
    institution: string;
    year: number;
    certifications: string[];
  }[];
  startDate: string;
  status: 'active' | 'on-leave' | 'inactive';
  profileImage?: string;
}