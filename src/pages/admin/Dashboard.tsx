import { FC, useEffect, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { productService } from '@/services/productService';
import { appointmentService } from '@/services/appointmentService';
import { Product, Appointment } from '@/interfaces';

const AdminDashboard: FC = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    featuredProducts: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    recentAppointments: [] as Appointment[],
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch products
        const products = await productService.getAllProducts();
        
        // Fetch appointments
        const appointments = await appointmentService.getAllAppointments();
        
        // Calculate stats
        const featuredProducts = products.filter(product => product.featured).length;
        const pendingAppointments = appointments.filter(
          appointment => appointment.status === 'pending'
        ).length;
        
        // Sort appointments by date (most recent first) and take the first 5
        const recentAppointments = [...appointments]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
        
        setStats({
          totalProducts: products.length,
          featuredProducts,
          totalAppointments: appointments.length,
          pendingAppointments,
          recentAppointments,
        });
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'confirmed':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'completed':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'cancelled':
        return 'text-red-600 bg-red-100 border-red-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-jewelry-black">Dashboard</h1>
          <p className="text-gray-600">Welcome to your Redstone Jewelry admin dashboard</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-jewelry-lightgold border-t-jewelry-gold rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Products</CardDescription>
                  <CardTitle className="text-3xl">{stats.totalProducts}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    {stats.featuredProducts} featured products
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Appointments</CardDescription>
                  <CardTitle className="text-3xl">{stats.totalAppointments}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    {stats.pendingAppointments} pending approval
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Featured Products</CardDescription>
                  <CardTitle className="text-3xl">{stats.featuredProducts}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Showcased on homepage
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Pending Appointments</CardDescription>
                  <CardTitle className="text-3xl">{stats.pendingAppointments}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Awaiting confirmation
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Appointments</CardTitle>
                <CardDescription>
                  Latest appointment bookings from customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                {stats.recentAppointments.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No recent appointments found</p>
                ) : (
                  <div className="overflow-x-auto rounded-md border border-gray-200">
                    <table className="min-w-[650px] w-full text-sm table-auto">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium whitespace-nowrap">Customer</th>
                          <th className="text-left py-3 px-4 font-medium whitespace-nowrap">Date & Time</th>
                          <th className="text-left py-3 px-4 font-medium whitespace-nowrap">Reason</th>
                          <th className="text-left py-3 px-4 font-medium whitespace-nowrap">Status</th>
                          <th className="text-left py-3 px-4 font-medium whitespace-nowrap">Booked On</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.recentAppointments.map((appointment) => (
                          <tr key={appointment.id} className="border-b">
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium">{appointment.customerName}</p>
                                <p className="text-gray-500 text-xs break-all">{appointment.customerEmail}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              {appointment.date} <span className="block md:inline">at</span> {appointment.time}
                            </td>
                            <td className="py-3 px-4 capitalize">{appointment.reason}</td>
                            <td className="py-3 px-4">
                              <span 
                                className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${
                                  getStatusColor(appointment.status)
                                }`}
                              >
                                {appointment.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                              {formatDate(appointment.createdAt)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Manage Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-sm mb-4">
                    Add, edit, or remove products from your collection.
                  </p>
                  <a 
                    href="/admin/products" 
                    className="text-jewelry-gold hover:underline text-sm font-medium"
                  >
                    Go to Product Management →
                  </a>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Manage Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-sm mb-4">
                    View and update status of customer appointments.
                  </p>
                  <a 
                    href="/admin/appointments" 
                    className="text-jewelry-gold hover:underline text-sm font-medium"
                  >
                    Go to Appointment Management →
                  </a>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">View Store</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-sm mb-4">
                    Preview your storefront as customers see it.
                  </p>
                  <a 
                    href="/" 
                    className="text-jewelry-gold hover:underline text-sm font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Storefront →
                  </a>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
