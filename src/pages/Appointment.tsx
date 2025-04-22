
import { FC } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AppointmentForm from '@/components/shared/AppointmentForm';

const Appointment: FC = () => {
  return (
    <MainLayout>
      {/* Page Header */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-serif font-bold text-jewelry-black">
            Book an Appointment
          </h1>
          <div className="w-24 h-1 bg-jewelry-gold mx-auto mt-4 mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Schedule a private consultation with our jewelry specialists to experience our collection in person or discuss custom designs.
          </p>
        </div>
      </section>

      {/* Appointment Content */}
      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Benefits Column */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-jewelry-black mb-6">
                The Redstone Experience
              </h2>
              
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-jewelry-lightgold text-jewelry-darkgold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-jewelry-black">Personalized Experience</h3>
                    <p className="mt-2 text-gray-600">
                      Our jewelry specialists provide one-on-one attention to understand your preferences and help you find the perfect piece.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-jewelry-lightgold text-jewelry-darkgold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-jewelry-black">Exclusive Preview</h3>
                    <p className="mt-2 text-gray-600">
                      View our full collection including limited edition pieces not available online. Try on multiple items to find your perfect match.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-jewelry-lightgold text-jewelry-darkgold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-jewelry-black">Expert Guidance</h3>
                    <p className="mt-2 text-gray-600">
                      Receive professional advice on gemstone quality, metal options, and jewelry care from our certified experts.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-jewelry-lightgold text-jewelry-darkgold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-jewelry-black">Custom Design Service</h3>
                    <p className="mt-2 text-gray-600">
                      Discuss custom design options for creating a unique piece tailored to your vision and preferences.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 p-6 bg-jewelry-black text-white rounded-lg">
                <h3 className="text-xl font-medium mb-4">Visit Our Showroom</h3>
                <address className="not-italic">
                  <p className="mb-2">
                    <strong>Address:</strong><br />
                    123 Luxury Avenue<br />
                    Nairobi, Kenya
                  </p>
                  <p className="mb-2">
                    <strong>Opening Hours:</strong><br />
                    Monday - Saturday: 10:00 AM - 7:00 PM<br />
                    Sunday: Closed
                  </p>
                  <p>
                    <strong>Contact:</strong><br />
                    Phone: +254 712 345 678<br />
                    Email: appointments@redstonejewelry.com
                  </p>
                </address>
              </div>
            </div>
            
            {/* Form Column */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-serif font-bold text-jewelry-black mb-6">
                Schedule Your Visit
              </h2>
              <AppointmentForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-12 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-2xl font-serif font-bold text-jewelry-black mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-jewelry-black mb-2">
                What happens after I book an appointment?
              </h3>
              <p className="text-gray-600">
                Our team will contact you to confirm your appointment and discuss any specific items you're interested in viewing during your visit.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-jewelry-black mb-2">
                Is there a fee for booking an appointment?
              </h3>
              <p className="text-gray-600">
                No, consultations are complimentary. We believe in providing a personalized experience without obligation.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-jewelry-black mb-2">
                How long does a typical appointment last?
              </h3>
              <p className="text-gray-600">
                Appointments typically last 45-60 minutes, but we're happy to accommodate your schedule as needed.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-jewelry-black mb-2">
                Can I bring someone with me to my appointment?
              </h3>
              <p className="text-gray-600">
                Absolutely! We encourage you to bring friends or family members whose opinions you value.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-jewelry-black mb-2">
                Do I need to know exactly what I want before booking?
              </h3>
              <p className="text-gray-600">
                Not at all. Our experts are here to help you explore options and find the perfect piece that matches your style.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-jewelry-black mb-2">
                Can I discuss custom designs during my appointment?
              </h3>
              <p className="text-gray-600">
                Yes, our specialists can discuss custom design options, timeline, and pricing during your consultation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Appointment;
