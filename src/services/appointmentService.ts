
import { Appointment } from '@/interfaces';

// Mock appointment data
const mockAppointments: Appointment[] = [
  {
    id: '1',
    customerName: 'Emma Johnson',
    customerEmail: 'emma.johnson@example.com',
    customerPhone: '+254712345678',
    date: '2023-05-10',
    time: '14:00',
    reason: 'consultation',
    notes: 'Looking for an engagement ring',
    status: 'completed',
    createdAt: '2023-05-01T10:30:00.000Z'
  },
  {
    id: '2',
    customerName: 'Michael Chen',
    customerEmail: 'michael.chen@example.com',
    customerPhone: '+254723456789',
    date: '2023-05-15',
    time: '11:30',
    reason: 'purchase',
    notes: 'Interested in diamond necklaces',
    status: 'completed',
    createdAt: '2023-05-05T14:20:00.000Z'
  },
  {
    id: '3',
    customerName: 'Sophia Williams',
    customerEmail: 'sophia.w@example.com',
    customerPhone: '+254734567890',
    date: '2023-06-20',
    time: '10:00',
    reason: 'fitting',
    notes: 'Wedding band sizing',
    status: 'confirmed',
    createdAt: '2023-05-10T09:45:00.000Z'
  },
  {
    id: '4',
    customerName: 'David Omondi',
    customerEmail: 'david.o@example.com',
    customerPhone: '+254745678901',
    date: '2023-06-22',
    time: '16:30',
    reason: 'repair',
    notes: 'Watch repair and maintenance',
    status: 'pending',
    createdAt: '2023-05-12T11:20:00.000Z'
  },
  {
    id: '5',
    customerName: 'Aisha Kimani',
    customerEmail: 'aisha.k@example.com',
    customerPhone: '+254756789012',
    date: '2023-06-25',
    time: '13:15',
    reason: 'consultation',
    notes: 'Anniversary gift ideas',
    status: 'pending',
    createdAt: '2023-05-15T16:10:00.000Z'
  }
];

const API_URL = import.meta.env.VITE_API_BASE_URL + '/appointments';


export const appointmentService = {
  // Get all appointments (Admin only)
  getAllAppointments: async (): Promise<Appointment[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }
    return await response.json();
  },

  // Get appointment by ID (Admin only or customer with verification)
  getAppointmentById: async (id: string): Promise<Appointment | null> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch appointment by ID');
    }
    return await response.json();
  },

  // Get appointments by status (Admin only)
  getAppointmentsByStatus: async (status: Appointment['status']): Promise<Appointment[]> => {
    const response = await fetch(`${API_URL}?status=${status}`);
    if (!response.ok) {
      throw new Error('Failed to fetch appointments by status');
    }
    return await response.json();
  },

  // Get appointments by date range (Admin only)
  getAppointmentsByDateRange: async (startDate: string, endDate: string): Promise<Appointment[]> => {
    const response = await fetch(`${API_URL}?date_gte=${startDate}&date_lte=${endDate}`);
    if (!response.ok) {
      throw new Error('Failed to fetch appointments by date range');
    }
    return await response.json();
  },

  // Create new appointment (Customer)
  createAppointment: async (appointmentData: Omit<Appointment, 'id' | 'status' | 'createdAt'>): Promise<Appointment> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...appointmentData,
        status: 'pending',
        createdAt: new Date().toISOString()
      })
    });
    if (!response.ok) {
      throw new Error('Failed to create appointment');
    }
    return await response.json();
  },

  // Update appointment status (Admin only)
  updateAppointmentStatus: async (id: string, status: Appointment['status']): Promise<Appointment | null> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to update appointment status');
    }
    return await response.json();
  },

  // Cancel appointment (Admin or customer with verification)
  cancelAppointment: async (id: string): Promise<Appointment | null> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'cancelled' })
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to cancel appointment');
    }
    return await response.json();
  },

  // Get available time slots for a specific date
  getAvailableTimeSlots: async (date: string): Promise<string[]> => {
    const response = await fetch(`${API_URL}?date=${date}`);
    if (!response.ok) {
      throw new Error('Failed to fetch available time slots');
    }

    const appointments = await response.json();
    const allTimeSlots = [
      '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
    ];

    const bookedTimes = appointments
      .filter((appointment: Appointment) => appointment.status !== 'cancelled')
      .map((appointment: Appointment) => appointment.time);

    return allTimeSlots.filter(time => !bookedTimes.includes(time));
  }
};
