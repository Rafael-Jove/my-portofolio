import ScrollReveal from "../ScrollReveal/ScrollReveal";
import { motion } from "framer-motion";
import profile from "../../assets/profile.jpg";

const Home = () => {
    return (
        <section id="home" className="relative min-h-screen bg-black text-white flex items-center justify-center px-6 overflow-hidden py-20">

            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #ffffff 1px, transparent 1px),
                        linear-gradient(to bottom, #ffffff 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,_rgba(139,92,246,0.12)_0%,_transparent_60%)]" />

            <div className="absolute top-8 w-full flex justify-center">
                <ScrollReveal direction="up" className="flex items-center gap-4 w-[320px]">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs tracking-[0.3em] text-gray-500 uppercase whitespace-nowrap">
                        About Me
                    </span>
                    <div className="flex-1 h-px bg-white/10" />
                </ScrollReveal>
            </div>

            <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-12 items-center max-w-6xl w-full z-10">

                <div className="flex-1 space-y-3 text-center md:text-left">
                    <ScrollReveal direction="left" className="text-purple-400 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none">
                        Hi,
                    </ScrollReveal>
                    <ScrollReveal direction="right" delay={100} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none">
                        I'm Rafael
                    </ScrollReveal>
                    <ScrollReveal direction="right" delay={150} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none">
                        Jove Wicaksono
                    </ScrollReveal>

                    <ScrollReveal
                        direction="down"
                        delay={300}
                        className="text-sm text-gray-400 text-justify leading-relaxed max-w-lg pt-2 mx-auto md:mx-0"
                    >
                        Informatics student at ISTTS with an interest in software development and digital product creation. Passionate about learning new technologies, improving problem-solving skills, and understanding how real-world applications are built. Currently seeking internship opportunities to gain practical experience, develop professionally, and contribute in a collaborative environment.
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={400} className="flex items-center gap-4 pt-3 justify-center md:justify-start">

                        <motion.a
                            href="https://www.instagram.com/vnt.el?igsh=MWc3djNpN3QzNWx1dg%3D%3D&utm_source=qr"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                            </svg>
                        </motion.a>

                        <motion.a
                            href="https://github.com/ellexcia"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                        </motion.a>

                        <div className="w-px h-6 bg-white/10" />

                        <motion.a
                            href="/cv.pdf"
                            download
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors relative overflow-hidden group"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download CV
                        </motion.a>

                    </ScrollReveal>
                </div>

                <div className="shrink-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="relative"
                        style={{ width: "min(280px, 75vw)", height: "min(400px, 105vw)" }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 rounded-3xl bg-purple-500/30 blur-3xl"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.3, 0.15] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-28 bg-violet-400/30 blur-2xl rounded-full"
                        />

                        <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-purple-500/60 rounded-tl-lg z-20" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 border-t border-r border-purple-500/60 rounded-tr-lg z-20" />
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b border-l border-purple-500/60 rounded-bl-lg z-20" />
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-purple-500/60 rounded-br-lg z-20" />

                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            whileHover={{ scale: 1.03, rotate: 1.5 }}
                            className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-pointer group"
                        >
                            <img
                                src={profile}
                                alt="Rafael Jove Wicaksono"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                <p className="text-xs text-purple-300 tracking-widest uppercase">Informatics Student</p>
                                <p className="text-sm font-semibold text-white">ISTTS · Surabaya</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                            className="absolute -bottom-4 -left-4 bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg z-20"
                        >
                            <motion.span
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-2 h-2 rounded-full bg-green-400 shrink-0"
                            />
                            <span className="text-xs text-gray-300 whitespace-nowrap">Available for internship</span>
                        </motion.div>

                    </motion.div>
                </div>

            </div>

        </section>
    );
};

export default Home;