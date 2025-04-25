import { FC, useEffect, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { productService } from '@/services/productService';
import { appointmentService } from '@/services/appointmentService';
import { Product, Appointment } from '@/interfaces';

const AdminDashboard: FC = () => {
  // ... existing state and logic remains the same ...

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
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header Section */}
        <div className="animate-fade-in-down">
          <h1 className="text-2xl sm:text-3xl font-bold text-jewelry-black">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Welcome back! Here's your store summary</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-jewelry-lightgold border-t-jewelry-gold rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 animate-staggered-fade">
              {[
                { 
                  title: 'Total Products', 
                  value: stats.totalProducts, 
                  subtitle: `${stats.featuredProducts} featured`,
                  bg: 'from-blue-50/80 to-white'
                },
                { 
                  title: 'Total Appointments', 
                  value: stats.totalAppointments, 
                  subtitle: `${stats.pendingAppointments} pending`,
                  bg: 'from-purple-50/80 to-white'
                },
                { 
                  title: 'Featured', 
                  value: stats.featuredProducts, 
                  subtitle: 'Homepage highlights',
                  bg: 'from-amber-50/80 to-white'
                },
                { 
                  title: 'Pending', 
                  value: stats.pendingAppointments, 
                  subtitle: 'Needs approval',
                  bg: 'from-rose-50/80 to-white'
                },
              ].map((stat, index) => (
                <Card 
                  key={index}
                  className={`group bg-gradient-to-br ${stat.bg} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 shadow-sm`}
                >
                  <CardHeader className="pb-2">
                    <CardDescription className="text-gray-500 text-sm">{stat.title}</CardDescription>
                    <CardTitle className="text-3xl text-jewelry-gold font-bold">{stat.value}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                      {stat.subtitle}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Appointments Table */}
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Recent Appointments</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Last 5 customer bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase">Customer</th>
                        <th className="py-3 px-4 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase hidden sm:table-cell">Date/Time</th>
                        <th className="py-3 px-4 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase">Status</th>
                        <th className="py-3 px-4 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase">Booked</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {stats.recentAppointments.map((appointment) => (
                        <tr 
                          key={appointment.id}
                          className="hover:bg-gray-50/50 transition-colors duration-150"
                        >
                          <td className="py-3 px-4 max-w-[160px] sm:max-w-none">
                            <div className="space-y-0.5">
                              <p className="text-sm sm:text-base font-medium truncate">{appointment.customerName}</p>
                              <p className="text-xs sm:text-sm text-gray-500 truncate">{appointment.customerEmail}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm sm:text-base text-gray-800 hidden sm:table-cell">
                            {appointment.date} <span className="text-gray-400">at</span> {appointment.time}
                          </td>
                          <td className="py-3 px-4">
                            <span 
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                                getStatusColor(appointment.status)
                              }`}
                            >
                              {appointment.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                            {formatDate(appointment.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up">
              {[
                { 
                  title: 'Product Management',
                  desc: 'Manage your jewelry collection',
                  link: '/admin/products',
                  icon: '💎'
                },
                {
                  title: 'Appointments',
                  desc: 'Handle customer bookings',
                  link: '/admin/appointments',
                  icon: '📅'
                },
                {
                  title: 'Store Preview',
                  desc: 'View customer-facing store',
                  link: '/',
                  icon: '👀',
                  external: true
                }
              ].map((card, index) => (
                <Card 
                  key={index}
                  className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 border border-gray-100/50 bg-gradient-to-br from-white to-gray-50/50"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-4">
                      <span className="text-2xl sm:text-3xl">{card.icon}</span>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-jewelry-black mb-1.5">
                          {card.title}
                        </h3>
                        <p className="text-gray-500 text-sm sm:text-base mb-3">
                          {card.desc}
                        </p>
                        <a 
                          href={card.link}
                          className="inline-flex items-center gap-2 text-jewelry-gold hover:text-jewelry-darkgold font-medium text-sm sm:text-base transition-colors"
                          target={card.external ? "_blank" : undefined}
                          rel={card.external ? "noopener noreferrer" : undefined}
                        >
                          Access Now
                          <svg 
                            className="w-4 h-4 mt-0.5 transition-transform duration-200 group-hover:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;