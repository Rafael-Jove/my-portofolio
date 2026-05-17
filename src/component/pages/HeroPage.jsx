import Plasma from '../Plasma/Plasma';

const HeroPage = () => {
    return (
        <section id="hero" className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">

            <div className="absolute inset-0 z-0 bg-black">
                <Plasma
                    color="#A855F7"
                    speed={1}
                    direction="forward"
                    scale={1}
                    opacity={1}
                    mouseInteractive={false}
                />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center">
                <h1 className="text-5xl md:text-7xl font-bold text-white">
                    Rafael Jove
                </h1>

                <p className="text-xl text-gray-300 mt-4">
                    Informatics student at ISTTS | Passionate about web development
                </p>

                <div className="flex gap-4 mt-6">

                    {/* PRIMARY */}
                    <button className="px-6 py-2 rounded-full 
        bg-purple-500 text-white font-semibold
        shadow-[0_0_25px_rgba(168,85,247,0.8)]
        hover:bg-purple-600 
        hover:scale-105 
        hover:shadow-[0_0_35px_rgba(168,85,247,1)]
        transition duration-300">
                        My Projects
                    </button>

                    {/* SECONDARY */}
                    <button className="px-6 py-2 rounded-full 
        bg-black/40 backdrop-blur-md
        border border-white/30 
        text-white 
        hover:bg-white hover:text-black 
        hover:scale-105
        transition duration-300">
                        Contact Me
                    </button>

                </div>
            </div>

        </section>
    );
};

export default HeroPage;