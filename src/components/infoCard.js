import {motion} from 'framer-motion';
export default function Card({title, description, icon}) {
    return(
        <motion.div
        intial={{opacity:0,y:30}}
        whileview={{opacity:1,y:0}}
        transition={{duration:0.5}}
        viewport={{once:true}}
        className="bg-white shadow-lg rounded-2xl p-6 transform hover:scale-105 hover:shadow-2xl transition-all duration-300"


        >
            
                <div className='animate-bounce delay-300'>{icon}</div>
                <h2 className='text-2xl font-savate font-bold font-light text-black mb-2'>{title}</h2>
                <p className="text-gray-600 text-sm font-savate">{description}</p>
            
        </motion.div>
       
    )
}