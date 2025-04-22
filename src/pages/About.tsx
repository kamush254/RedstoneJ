
import React from "react";

const About = () => {
  return (
    <main className="min-h-screen bg-white text-jewelry-black py-16 px-6 md:px-12 lg:px-24">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-center text-jewelry-gold">
          About Redstone Jewelry
        </h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12 max-w-3xl mx-auto text-center">
          At Redstone Jewelry, we believe in the art of crafting exquisite pieces that tell a story.
          Our passionate artisans combine timeless designs with meticulous craftsmanship to bring
          you jewelry that radiates elegance and sophistication for every occasion.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80"
            alt="Craftsmen working on jewelry"
            className="rounded-lg shadow-lg object-cover w-full max-h-96"
          />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Legacy</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Founded with a vision to create exceptional jewelry, Redstone Jewelry has grown into a
              trusted name in luxury embellishments. Each piece is carefully designed and hand-finished
              to perfection using the finest materials.
            </p>
            <h2 className="text-3xl font-semibold mb-4">Our Commitment</h2>
            <p className="text-gray-700 leading-relaxed">
              We are committed to ethical sourcing, quality craftsmanship, and outstanding customer
              service. Whether you seek a classic design or a bespoke creation, your satisfaction is
              our highest priority.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;

