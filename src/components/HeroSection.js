import { FaTools, FaUserClock, FaShieldAlt } from 'react-icons/fa';


export default function HeroSection(){
    return(
        <section className='min-h-screen py-12 flex items-center justify-center rounded-lg bg-gradient-to-r from-black to-gray-300  text-relative overflow-hidden'>
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-ping "></div>
                <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-white/10 rounded-full animate-ping delay-300"></div>
                <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping delay-500"></div>
                <div className="absolute top-1/5 left-1/5 w-32 h-32 bg-white/10 rounded-full animate-ping"></div>
                <div className="absolute bottom-1/6 right-1/5 w-24 h-24 bg-white/10 rounded-full animate-ping delay-300"></div>
                <div className="absolute top-1/7 right-1/2 w-16 h-16 bg-white/10 rounded-full animate-ping delay-500"></div>
                <div className="absolute top-1/9 left-1/6 w-32 h-32 bg-white/10 rounded-full animate-ping"></div>
                <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-white/10 rounded-full animate-ping delay-300"></div>
                <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping delay-500"></div>
                <div className="absolute top-1/5 left-1/7 w-32 h-32 bg-white/10 rounded-full animate-ping"></div>
                <div className="absolute bottom-1/6 right-1/9 w-24 h-24 bg-white/10 rounded-full animate-ping delay-300"></div>
                <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping delay-500"></div>
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-ping "></div>
                <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-white/10 rounded-full animate-ping delay-300"></div>
                <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping delay-500"></div>
                <div className="absolute top-1/5 left-1/5 w-32 h-32 bg-white/10 rounded-full animate-ping"></div>
                <div className="absolute bottom-1/6 right-1/5 w-24 h-24 bg-white/10 rounded-full animate-ping delay-300"></div>
                <div className="absolute top-1/7 right-1/2 w-16 h-16 bg-white/10 rounded-full animate-ping delay-500"></div>
                <div className="absolute top-1/12 left-1/12 w-32 h-32 bg-white/10 rounded-full animate-ping"></div>
                <div className="absolute bottom-1/8 right-1/3 w-24 h-24 bg-white/10 rounded-full animate-ping delay-300"></div>
                <div className="absolute top-1/3 right-1/9 w-16 h-16 bg-white/10 rounded-full animate-ping delay-500"></div>
                <div className="absolute top-1/5 left-1/7 w-32 h-32 bg-white/10 rounded-full animate-ping"></div>
                <div className="absolute bottom-1/6 right-1/5 w-24 h-24 bg-white/10 rounded-full animate-ping delay-300"></div>
                <div className="absolute top-1/4 right-1/2 w-16 h-16 bg-white/10 rounded-full animate-ping delay-500"></div>
            </div>

            <div className="text-center animate-fadeInUp z-10">
                <h1 className="text-5xl font-bold font-savate font-light text-white mb-4 pt-5">Welcome to ElectroCare</h1>
                <p className="text-xl mb-8 font-savate text-white">We Provide Best Services and Good Experience with you</p>
                
                {/* Service features with icons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 shadow-lg animate-bounce">
                        <FaTools className="text-4xl mx-auto mb-4 animate-bounce" />
                        <h3 className="text-xl font-semibold mb-2 font-savate text-white">Expert Service</h3>
                        <p className="text-sm font-savate text-white">Professional technicians at your service</p>
                    </div>
                    
                    <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 animate-bounce">
                        <FaUserClock className="text-4xl mx-auto mb-4 animate-bounce delay-100" />
                        <h3 className="text-xl font-semibold mb-2 font-savate text-white">Quick Response</h3>
                        <p className="text-sm font-savate text-white">Fast and reliable service delivery</p>
                    </div>
                    
                    <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 animate-bounce">
                        <FaShieldAlt className="text-4xl mx-auto mb-4 animate-bounce delay-200" />
                        <h3 className="text-xl font-semibold mb-2 font-savate text-white">Quality Guarantee</h3>
                        <p className="text-sm font-savate text-white">100% satisfaction guaranteed</p>
                    </div>
                </div>
                <div className="mt-12">
                        <p className='text-2xl font-bold text-white font-savate max-w-3xl mx-auto animate-pulse transition-transform duration-500'>Book trusted electricians and appliance repair experts in seconds. Fast, affordable, and professional.</p>
                </div>
                <div className="mt-8">
                    <button 
                        onClick={() => {
                            const bookingForm = document.getElementById('services');
                            if (bookingForm) {
                                bookingForm.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="px-12 py-4 text-xl font-bold font-savate text-white bg-black hover:bg-white hover:text-black animate-bounce rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </section>
    )
}