import { motion } from "framer-motion";
import Plasma from '../Plasma/Plasma';

const HeroPage = () => {
    return (
        <section id="hero" className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">

            <div className="absolute inset-0 z-0 bg-black">
                <Plasma
                    color="#A855F7"
                    speed={0.3}
                    scale={0.6}
                    opacity={0.4}
                    mouseInteractive={false}
                />
            </div>

            <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.6)_100%)]" />

            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">

                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3 mb-6"
                >
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-8xl font-bold text-white leading-none tracking-tight"
                >
                    Rafael Jove
                </motion.h1>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-8xl font-bold text-purple-400 leading-none tracking-tight mt-1"
                >
                    Wicaksono
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-sm text-gray-400 mt-5 max-w-sm leading-relaxed"
                >
                    Informatics student at ISTTS — passionate about software development and building meaningful digital products.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    className="flex gap-3 mt-8"
                >
                    <motion.a
                        onClick={() => {
                            const section = document.getElementById("projects");
                            if (section) {
                                section.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                });
                            }
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="relative px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors overflow-hidden group"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        My Projects
                    </motion.a>

                    <motion.a
                        onClick={() => {
                            const section = document.getElementById("contact");
                            if (section) {
                                section.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                });
                            }
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-6 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white text-sm font-medium transition-colors backdrop-blur-sm"
                    >
                        Contact Me
                    </motion.a>
                </motion.div>

            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10">
                <span className="text-[10px] tracking-widest text-gray-600 uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgb(75,85,99)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </motion.div>
            </div>

        </section>
    );
};

export default HeroPage;