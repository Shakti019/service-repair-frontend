import React from 'react';
import Navbar from './components/Navbar';
import BookingForm from './components/BookingForm';
import HeroSection from './components/HeroSection';
import Card from './components/infoCard';
import { FaTools, FaSnowflake, FaFire, FaClock, FaShieldAlt, FaUsers, FaCog } from 'react-icons/fa';
import Slider from './components/slider';
import Footer from './components/Footer';

function App() {
  return(
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      
      {/* Home Section */}
      <section id="home" className="min-h-screen pt-20">
        <HeroSection/>
      </section>

      {/* Services Section */}
      <h2 className="text-2xl font-savate font-light text-center px-4 py-2">Connect With Us</h2>
      <section id="services" className="min-h-screen pt-0">
        <BookingForm/>
      </section>
      <h2 className="text-4xl font-savate font-light text-center px-4 py-2">Our Services</h2>
      <section id="slider" className="min-h-screen pt-0 pb-1">
        <Slider/>
      </section>

      {/* About Section */}
      <h2 className="text-4xl text-center font-savate px-2 py-2">Why Choose Us</h2>
      <section id="about" className="min-h-screen pt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-10">
        <Card 
          title="Washing Machine Service" 
          description="Expert repair and maintenance for all washing machine brands. We handle motor issues, drainage problems, and electronic control repairs."
          icon={<FaTools className="text-4xl text-blue-500 mb-4" />}
        />
        <Card 
          title="Refrigerator Repair" 
          description="Professional refrigerator repair services including cooling system maintenance, compressor repair, and temperature control issues."
          icon={<FaSnowflake className="text-4xl text-blue-500 mb-4" />}
        />
        <Card 
          title="Oven & Stove Service" 
          description="Complete repair services for electric and gas ovens, including heating element replacement, thermostat repair, and safety checks."
          icon={<FaFire className="text-4xl text-orange-500 mb-4" />}
        />
        <Card 
          title="Expert Technicians" 
          description="Our certified technicians have years of experience in repairing all major appliance brands with guaranteed quality service."
          icon={<FaCog className="text-4xl text-green-500 mb-4" />}
        />
        <Card 
          title="Quick Service" 
          description="Same-day service available for urgent repairs. We value your time and ensure minimal disruption to your daily routine."
          icon={<FaClock className="text-4xl text-purple-500 mb-4" />}
        />
        <Card 
          title="Warranty & Support" 
          description="All our repairs come with a 90-day warranty. We provide ongoing support and maintenance tips for your appliances."
          icon={<FaShieldAlt className="text-4xl text-red-500 mb-4" />}
        />
      </section>

      {/* Contact Section */}

      <section id="contact" >
        {/* Your contact content here */}
        <Footer />
      </section>

      {/* Footer - Moved outside of grid section */}
      
    </div>
  )
}

export default App;