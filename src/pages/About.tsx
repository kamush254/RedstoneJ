import React from "react";
import MainLayout from '@/components/layout/MainLayout';
import { motion } from "framer-motion"; // Add this import if you're using framer-motion

const About = () => {
  return (
    <MainLayout> {/* Wrap with MainLayout for consistency */}
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-jewelry-black">
        {/* Hero Section */}
        <div className="relative h-[400px] overflow-hidden">
          <img
            src="https://images.pexels.com/photos/19703087/pexels-photo-19703087/free-photo-of-close-up-of-a-ring.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt="Jewelry Workshop Banner"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white text-center px-4">
              About Redstone Jewelry
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto py-16 px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl text-gray-700 leading-relaxed mb-16 max-w-3xl mx-auto text-center"
          >
            <p className="mb-6">
              At Redstone Jewelry, we believe in the art of crafting exquisite pieces that tell a story.
              Our passionate artisans combine timeless designs with meticulous craftsmanship to bring
              you jewelry that radiates elegance and sophistication for every occasion.
            </p>
            <div className="w-24 h-1 bg-jewelry-gold mx-auto mt-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
            <motion.img
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              src="https://images.pexels.com/photos/3641059/pexels-photo-3641059.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Craftsmen working on jewelry"
              className="rounded-2xl shadow-2xl object-cover w-full h-[500px]"
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-serif font-semibold mb-6 text-jewelry-gold">Our Legacy</h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Founded with a vision to create exceptional jewelry, Redstone Jewelry has grown into a
                trusted name in luxury embellishments. Each piece is carefully designed and hand-finished
                to perfection using the finest materials.
              </p>
              <h2 className="text-3xl font-serif font-semibold mb-6 text-jewelry-gold">Our Commitment</h2>
              <p className="text-gray-700 leading-relaxed">
                We are committed to ethical sourcing, quality craftsmanship, and outstanding customer
                service. Whether you seek a classic design or a bespoke creation, your satisfaction is
                our highest priority.
              </p>
            </motion.div>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { title: "Quality", icon: "✨", description: "Only the finest materials and craftsmanship" },
              { title: "Integrity", icon: "💎", description: "Ethical sourcing and transparent practices" },
              { title: "Excellence", icon: "🏆", description: "Committed to exceeding expectations" },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-serif font-semibold mb-3 text-jewelry-gold">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default About;
