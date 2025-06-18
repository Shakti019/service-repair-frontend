export default function BookingButton() {
    const scrollToBookingForm = () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <button 
            onClick={scrollToBookingForm}
            className='bg-black font-savate font-light hover:bg-gray-500 hover:text-black text-white px-8 py-3  rounded-md transition-all duration-300'
        >
            Book Now
        </button>
    );
}

