import {Swiper ,SwiperSlide} from 'swiper/react';
import {Autoplay,Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaTools, FaSnowflake, FaFire, FaClock, FaShieldAlt } from 'react-icons/fa';

// Updated import paths to match your actual image files
import washingMachine from '../images/washingmachine.png';
import refrigerator from '../images/fridge.png';
import microwave from '../images/Microwave.jpg';

export default function Slider(){
    const slides=[
        {
            title: "Expert Appliance Repair",
            desc: "Professional repair services for all your home appliances. Fast, reliable, and affordable solutions.",
            icon: <FaTools className="text-6xl mx-auto mb-4 animate-bounce" />,
            bgColor: "white duration-300",
            image: null
        },
        {
            title: "Washing Machine Service",
            desc: "Specialized in repairing all brands of washing machines. We handle motor issues, drainage problems, and electronic repairs.",
            icon: <FaTools className="text-6xl mx-auto mb-4 animate-bounce" />,
            bgColor: "white",
            image: washingMachine
        },
        {
            title: "Refrigerator Repair",
            desc: "Expert cooling system maintenance, compressor repair, and temperature control solutions for your refrigerator.",
            icon: <FaSnowflake className="text-6xl mx-auto mb-4 animate-bounce" />,
            bgColor: "white",
            image: refrigerator
        },
        {
            title: "Microwave & Oven Service",
            desc: "Complete repair services for microwaves and ovens. Heating element replacement and safety checks included.",
            icon: <FaFire className="text-6xl mx-auto mb-4 animate-bounce" />,
            bgColor: "white",
            image: microwave
        },
        {
            title: "24/7 Emergency Service",
            desc: "Available round the clock for urgent repairs. Your convenience is our priority.",
            icon: <FaClock className="text-6xl mx-auto mb-4 animate-bounce" />,
            bgColor: "white",
            image: null
        },
        {
            title: "90-Day Warranty",
            desc: "All our repairs come with a 90-day warranty. Quality service guaranteed!",
            icon: <FaShieldAlt className="text-6xl mx-auto mb-4 animate-bounce" />,
            bgColor: "white",
            image: null
        }
    ]
    return(
        <section className="h-screen relative overflow-hidden"> 
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r animate-gradient-x">
                <div className="absolute inset-0 bg-white"></div>
            </div>

            <Swiper
                modules={[Autoplay,Pagination]}
                autoplay={{delay:3000}}
                pagination={{clickable:true}}
                loop={true}
                className='w-full max-w-4xl text-center font-savate relative z-10'
            >
                {slides.map((slide, i) => (
                    <SwiperSlide key={i}>
                        <div className={`p-2 min-h-screen flex flex-col items-center justify-center bg-white ${slide.bgColor} transition-all duration-500`}>
                            <div className="transform hover:scale-110 transition-transform duration-300">
                                {slide.icon}
                            </div>
                            {slide.image && (
                                <div className="w-full max-w-md mx-auto my-6 rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                                    <img 
                                        src={slide.image} 
                                        alt={slide.title}
                                        className="w-full h-auto max-h-[400px] object-contain"
                                    />
                                </div>
                            )}
                            <h1 className='text-4xl md:text-5xl font-bold mb-4  animate-bounce animate-fade-in-up'>
                                {slide.title}
                            </h1>
                            <p className='text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-up-delay'>
                                {slide.desc}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}