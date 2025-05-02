import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { FaGem, FaPencilAlt, FaBalanceScale, FaPenFancy, FaCoins } from "react-icons/fa";

const services = [
  {
    icon: <FaGem className="text-jewelry-gold text-4xl mb-4" />,
    title: "Jewelry Sales",
    description:
      "Explore our exquisite collection of fine jewelry, including rings, necklaces, bracelets, and more. Each piece is crafted with precision and elegance.",
  },
  {
    icon: <FaPencilAlt className="text-jewelry-gold text-4xl mb-4" />,
    title: "Custom Jewelry Design",
    description:
      "Bring your vision to life with our custom jewelry design services. Work with our expert designers to create a one-of-a-kind masterpiece.",
  },
  {
    icon: <FaBalanceScale className="text-jewelry-gold text-4xl mb-4" />,
    title: "Appraisals",
    description:
      "Get accurate and professional appraisals for your jewelry. Our experts ensure you know the true value of your precious pieces.",
  },
  {
    icon: <FaPenFancy className="text-jewelry-gold text-4xl mb-4" />,
    title: "Engraving",
    description:
      "Personalize your jewelry with our engraving services. Add a special message, date, or initials to make your piece truly unique.",
  },
  {
    icon: <FaCoins className="text-jewelry-gold text-4xl mb-4" />,
    title: "Gold Buying & Trade-ins",
    description:
      "Trade in your old gold or sell it for cash. We offer competitive rates and a seamless process for your convenience.",
  },
];

const Services = () => {
  return (
    <MainLayout>
      <main className="min-h-screen bg-white text-jewelry-black py-16 px-6 md:px-12 lg:px-24">
        <section className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-center text-jewelry-gold">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12 max-w-3xl mx-auto text-center">
            At Redstone Jewelry, we offer a range of services to meet all your jewelry needs. From
            sales to custom designs, appraisals, and more, we are here to provide exceptional
            service and expertise.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="text-center p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {service.icon}
                <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
                <p className="text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default Services;