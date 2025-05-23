import { FC, useEffect, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Appointment } from '@/interfaces';
import { appointmentService } from '@/services/appointmentService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const AdminAppointments: FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<Appointment['status']>('pending');
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await appointmentService.getAllAppointments();
      const sortedData = data.sort((a, b) => {
        const dateComparison = b.date.localeCompare(a.date);
        if (dateComparison !== 0) return dateComparison;
        return b.time.localeCompare(a.time);
      });
      setAppointments(sortedData);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
      setError('Failed to load appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedAppointment) return;
    
    try {
      setIsSubmitting(true);
      const updatedAppointment = await appointmentService.updateAppointmentStatus(
        selectedAppointment.id, 
        newStatus
      );
      
      if (updatedAppointment) {
        setAppointments(appointments.map(appointment => 
          appointment.id === updatedAppointment.id ? updatedAppointment : appointment
        ));
        
        toast({
          title: 'Status Updated',
          description: `Appointment status updated to ${newStatus}.`,
        });
        
        setIsStatusDialogOpen(false);
      }
    } catch (err) {
      console.error('Error updating appointment status:', err);
      toast({
        title: 'Error',
        description: 'Failed to update appointment status. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelAppointment = async () => {
    if (!selectedAppointment) return;
    
    try {
      setIsSubmitting(true);
      const updatedAppointment = await appointmentService.cancelAppointment(selectedAppointment.id);
      
      if (updatedAppointment) {
        setAppointments(appointments.map(appointment => 
          appointment.id === updatedAppointment.id ? updatedAppointment : appointment
        ));
        
        toast({
          title: 'Appointment Cancelled',
          description: 'The appointment has been cancelled successfully.',
        });
        
        setIsCancelDialogOpen(false);
      }
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      toast({
        title: 'Error',
        description: 'Failed to cancel appointment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openStatusDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setNewStatus(appointment.status);
    setIsStatusDialogOpen(true);
  };

  const openDetailDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailDialogOpen(true);
  };

  const openCancelDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsCancelDialogOpen(true);
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.customerPhone.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'confirmed': return 'text-green-600 bg-green-100 border-green-200';
      case 'completed': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'cancelled': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 px-4 sm:px-6">
        <div>
          <h1 className="text-2xl font-bold text-jewelry-black">Appointments</h1>
          <p className="text-gray-600">Manage customer appointments</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="w-full sm:w-[180px]">
            <Select 
              value={statusFilter} 
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mobile View */}
        <div className="space-y-4 sm:hidden">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-jewelry-lightgold border-t-jewelry-gold rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={fetchAppointments} variant="outline">
                Try Again
              </Button>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border">
              <p className="text-gray-500">No appointments found</p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-4 space-y-3 bg-white">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="font-medium">{appointment.customerName}</p>
                    <p className="text-sm text-gray-500">{appointment.customerPhone}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Date:</span> {formatDate(appointment.date)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Time:</span> {appointment.time}
                  </p>
                  <p className="text-sm capitalize">
                    <span className="font-medium">Reason:</span> {appointment.reason}
                  </p>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => openDetailDialog(appointment)}
                  >
                    Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => openStatusDialog(appointment)}
                    disabled={appointment.status === 'cancelled'}
                  >
                    Status
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => openCancelDialog(appointment)}
                    disabled={appointment.status === 'cancelled' || appointment.status === 'completed'}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View */}
        {!loading && !error && filteredAppointments.length > 0 && (
          <div className="hidden sm:block border rounded-md overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{appointment.customerName}</p>
                        <p className="text-sm text-gray-500">{appointment.customerEmail}</p>
                        <p className="text-sm text-gray-500">{appointment.customerPhone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{formatDate(appointment.date)}</p>
                        <p className="text-sm text-gray-500">{appointment.time}</p>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{appointment.reason}</TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDetailDialog(appointment)}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openStatusDialog(appointment)}
                          disabled={appointment.status === 'cancelled'}
                        >
                          Update Status
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => openCancelDialog(appointment)}
                          disabled={appointment.status === 'cancelled' || appointment.status === 'completed'}
                        >
                          Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Status Update Dialog */}
        <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
          <DialogContent className="w-[95vw] max-w-[100%] sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Update Appointment Status</DialogTitle>
              <DialogDescription>
                Change the status of this appointment.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <Label htmlFor="status" className="mb-2 block">Status</Label>
              <Select
                value={newStatus}
                onValueChange={(value) => setNewStatus(value as Appointment['status'])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsStatusDialogOpen(false)}
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateStatus}
                className="w-full sm:w-auto bg-jewelry-gold hover:bg-jewelry-darkgold text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Status'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Appointment Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="w-[95vw] max-w-[100%] sm:max-w-md h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg">Appointment Details</DialogTitle>
            </DialogHeader>
            
            {selectedAppointment && (
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Customer Information</h3>
                  <div className="space-y-1">
                    <p className="font-medium">{selectedAppointment.customerName}</p>
                    <p>{selectedAppointment.customerEmail}</p>
                    <p>{selectedAppointment.customerPhone}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Appointment Details</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2 sm:col-span-1">
                      <p className="font-medium">Date:</p>
                      <p>{formatDate(selectedAppointment.date)}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <p className="font-medium">Time:</p>
                      <p>{selectedAppointment.time}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-medium">Reason:</p>
                      <p className="capitalize">{selectedAppointment.reason}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-medium">Status:</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-sm font-medium capitalize ${
                        getStatusColor(selectedAppointment.status)
                      }`}>
                        {selectedAppointment.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                {selectedAppointment.notes && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                    <p className="text-gray-700 whitespace-pre-line">{selectedAppointment.notes}</p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Booking Information</h3>
                  <p>Booked on: {new Date(selectedAppointment.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button
                onClick={() => setIsDetailDialogOpen(false)}
                className="w-full sm:w-auto"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cancel Appointment Dialog */}
        <AlertDialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel this appointment? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isSubmitting}>
                No, Keep Appointment
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleCancelAppointment}
                className="bg-red-500 hover:bg-red-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Cancelling...' : 'Yes, Cancel Appointment'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default AdminAppointments;