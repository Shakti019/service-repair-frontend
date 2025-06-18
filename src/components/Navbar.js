import { useState } from "react";
import { Menu, X } from 'lucide-react';
import BookingButton from './BookingButton';
export default function Navbar(){
    const [open, setopen] = useState(false);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setopen(false); // Close mobile menu after clicking
        }
    };

    return(
        <nav className="bg-white shadow-md fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
                <div className="flex items-center gap-2">
                    <h1 className='text-2xl font-bold text-black-600 font-savate font-light'>ElectroCare</h1>
                </div>
               
                <div className="flex items-center gap-6">
                    <ul className={`md:flex md:items-center  font-bold font-savate font-light text-black-600  gap-6 absolute md:static bg-white w-full md:w-auto top-16 left-0 transition-all duration-300 ease-in ${open?"block":'hidden'}`}>
                        {[
                            { name: "Home", id: "home" },
                            { name: "About", id: "about" },
                            { name: "Services", id: "services" },
                            { name: "Contact", id: "contact" }
                        ].map((link)=>(
                            <li 
                                key={link.name} 
                                className='px-4 py-2 text-xl hover:text-gray-600 cursor-pointer'
                                onClick={() => scrollToSection(link.id)}
                            >
                                {link.name}
                            </li>
                        ))}
                    </ul>
                    <BookingButton/>
                    <div className="md:hidden" onClick={()=>setopen(!open)}>
                        {open? <X size={24}/>:<Menu size={24}/>}
                    </div>
                </div>
            </div>
        </nav>
    )
}