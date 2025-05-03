import { FC } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AppointmentForm from '@/components/shared/AppointmentForm';
import Head from 'next/head';
import { motion } from 'framer-motion';

const Appointment: FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const benefits = [
    {
      title: "Personalized Experience",
      description: "Our jewelry specialists provide one-on-one attention to understand your preferences and help you find the perfect piece.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: "Exclusive Preview",
      description: "View our full collection including limited edition pieces not available online. Try on multiple items to find your perfect match.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: "Expert Guidance",
      description: "Receive professional advice on gemstone quality, metal options, and jewelry care from our certified experts.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Custom Design Service",
      description: "Discuss custom design options for creating a unique piece tailored to your vision and preferences.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    }
  ];

  const faqs = [
    {
      question: "What happens after I book an appointment?",
      answer: "Our team will contact you to confirm your appointment and discuss any specific items you're interested in viewing during your visit."
    },
    {
      question: "Is there a fee for booking an appointment?",
      answer: "No, consultations are complimentary. We believe in providing a personalized experience without obligation."
    },
    {
      question: "How long does a typical appointment last?",
      answer: "Appointments typically last 45-60 minutes, but we're happy to accommodate your schedule as needed."
    },
    {
      question: "Can I bring someone with me to my appointment?",
      answer: "Absolutely! We encourage you to bring friends or family members whose opinions you value."
    },
    {
      question: "Do I need to know exactly what I want before booking?",
      answer: "Not at all. Our experts are here to help you explore options and find the perfect piece that matches your style."
    },
    {
      question: "Can I discuss custom designs during my appointment?",
      answer: "Yes, our specialists can discuss custom design options, timeline, and pricing during your consultation."
    }
  ];

  return (
    <MainLayout>
      <Head>
        <title>Book an Appointment | Redstone Jewelry</title>
        <meta name="description" content="Schedule a private consultation with our jewelry specialists to experience our collection in person or discuss custom designs." />
      </Head>

      {/* Hero Section with Parallax Effect */}
      <section className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('/images/jewelry-showroom.jpg')] bg-cover bg-center bg-no-repeat"
          style={{ backgroundAttachment: 'fixed' }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative h-full flex flex-col justify-center text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Book an Appointment
            </h1>
            <div className="w-24 h-1 bg-jewelry-gold mx-auto mb-6"></div>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Experience luxury jewelry in an intimate setting with our personalized consultations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Appointment Content */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Benefits Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl font-serif font-bold text-jewelry-black mb-8"
              >
                The Redstone Experience
              </motion.h2>
              
              <motion.div 
                variants={stagger}
                className="space-y-8"
              >
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeInUp}
                    className="flex p-4 rounded-lg hover:bg-gray-50 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-jewelry-gold to-jewelry-darkgold text-white shadow-md">
                      {benefit.icon}
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-medium text-jewelry-black">{benefit.title}</h3>
                      <p className="mt-2 text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                className="mt-12 p-8 bg-gradient-to-r from-jewelry-black to-gray-900 text-white rounded-xl shadow-xl"
              >
                <h3 className="text-2xl font-medium mb-6">Visit Our Showroom</h3>
                <address className="not-italic space-y-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mt-1 mr-4 text-jewelry-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div>
                      <strong className="block text-jewelry-gold">Address:</strong>
                      <p>123 Luxury Avenue<br />Nairobi, Kenya</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mt-1 mr-4 text-jewelry-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <strong className="block text-jewelry-gold">Opening Hours:</strong>
                      <p>Monday - Saturday: 10:00 AM - 7:00 PM<br />Sunday: Closed</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mt-1 mr-4 text-jewelry-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <div>
                      <strong className="block text-jewelry-gold">Contact:</strong>
                      <p>Phone: +254 712 345 678<br />Email: appointments@redstonejewelry.com</p>
                    </div>
                  </div>
                </address>
              </motion.div>
            </motion.div>
            
            {/* Form Column */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 sticky top-8"
            >
              <h2 className="text-3xl font-serif font-bold text-jewelry-black mb-8">
                Schedule Your Visit
              </h2>
              <AppointmentForm />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-16 px-4 sm:px-6 bg-jewelry-lightgold bg-opacity-10">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-serif font-bold text-jewelry-black mb-12 text-center"
          >
            What Our Clients Say
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "The private appointment experience was exceptional. The specialist took time to understand my style and showed me pieces I would have never considered but ended up loving."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-jewelry-black font-bold mr-4">
                    {item === 1 ? 'A' : item === 2 ? 'M' : 'J'}
                  </div>
                  <div>
                    <h4 className="font-medium text-jewelry-black">
                      {item === 1 ? 'Amira K.' : item === 2 ? 'Michael W.' : 'James N.'}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {item === 1 ? 'Custom Engagement Ring' : item === 2 ? 'Anniversary Gift' : 'Wedding Bands'}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-serif font-bold text-jewelry-black mb-12 text-center"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-lg font-medium text-jewelry-black mb-3 flex items-center">
                  <svg className="w-5 h-5 text-jewelry-gold mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {faq.question}
                </h3>
                <p className="text-gray-600 pl-8">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Appointment;