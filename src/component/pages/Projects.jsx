import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import projects from "../../data/projects.json";


const FILTERS = ["All", "React", "Laravel", "Firebase", "MySQL", "Tailwind", "PHP"];

const COLORS = {
    slate: {
        border: "border-white/10",
        hBorder: "hover:border-white/22",
        glow: "rgba(148,163,184,0.18)",
        accentRgb: "148,163,184",
        accent: "#94a3b8",
        tag: "bg-slate-800/60 border-slate-700/50 text-slate-300",
        feat: "bg-slate-700/40 border-slate-500/30 text-slate-200",
        title: "text-white",
    },
    indigo: {
        border: "border-indigo-900/60",
        hBorder: "hover:border-indigo-600/55",
        glow: "rgba(99,102,241,0.18)",
        accentRgb: "99,102,241",
        accent: "#6366f1",
        tag: "bg-indigo-900/50 border-indigo-700/40 text-indigo-300",
        feat: "bg-indigo-800/30 border-indigo-500/30 text-indigo-200",
        title: "text-indigo-50",
    },
    blue: {
        border: "border-blue-900/60",
        hBorder: "hover:border-blue-600/55",
        glow: "rgba(59,130,246,0.18)",
        accentRgb: "59,130,246",
        accent: "#3b82f6",
        tag: "bg-blue-900/50 border-blue-700/40 text-blue-300",
        feat: "bg-blue-800/30 border-blue-500/30 text-blue-200",
        title: "text-blue-50",
    },
    violet: {
        border: "border-violet-900/60",
        hBorder: "hover:border-violet-600/55",
        glow: "rgba(139,92,246,0.18)",
        accentRgb: "139,92,246",
        accent: "#8b5cf6",
        tag: "bg-violet-900/50 border-violet-700/40 text-violet-300",
        feat: "bg-violet-800/30 border-violet-500/30 text-violet-200",
        title: "text-violet-50",
    },
    teal: {
        border: "border-teal-900/60",
        hBorder: "hover:border-teal-600/55",
        glow: "rgba(20,184,166,0.16)",
        accentRgb: "20,184,166",
        accent: "#14b8a6",
        tag: "bg-teal-900/50 border-teal-700/40 text-teal-300",
        feat: "bg-teal-800/30 border-teal-500/30 text-teal-200",
        title: "text-teal-50",
    },
    rose: {
        border: "border-rose-900/60",
        hBorder: "hover:border-rose-600/55",
        glow: "rgba(244,63,94,0.16)",
        accentRgb: "244,63,94",
        accent: "#f43f5e",
        tag: "bg-rose-900/50 border-rose-700/40 text-rose-300",
        feat: "bg-rose-800/30 border-rose-500/30 text-rose-200",
        title: "text-rose-50",
    },
};

const GitHubIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
);

const ExternalIcon = () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const Brackets = ({ color, hovered }) => (
    <>
        <motion.span
            animate={hovered ? { width: 20, height: 20 } : { width: 14, height: 14 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -top-px -left-px border-t border-l rounded-tl-lg z-10"
            style={{ borderColor: color }}
        />
        <motion.span
            animate={hovered ? { width: 20, height: 20 } : { width: 14, height: 14 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -top-px -right-px border-t border-r rounded-tr-lg z-10"
            style={{ borderColor: color }}
        />
        <motion.span
            animate={hovered ? { width: 20, height: 20 } : { width: 14, height: 14 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-px -left-px border-b border-l rounded-bl-lg z-10"
            style={{ borderColor: color }}
        />
        <motion.span
            animate={hovered ? { width: 20, height: 20 } : { width: 14, height: 14 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-px -right-px border-b border-r rounded-br-lg z-10"
            style={{ borderColor: color }}
        />
    </>
);

const FloatingOrb = ({ color, size, x, y, duration, delay }) => (
    <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{ width: size, height: size, left: x, top: y, background: color }}
        animate={{
            y: [0, -28, 8, -18, 0],
            x: [0, 14, -10, 18, 0],
            opacity: [0.25, 0.45, 0.3, 0.5, 0.25],
            scale: [1, 1.15, 0.95, 1.1, 1],
        }}
        transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
);

const IdleShimmer = ({ accent, delay }) => (
    <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
            background: `linear-gradient(105deg, transparent 40%, ${accent}18 50%, transparent 60%)`,
            backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
        transition={{ duration: 3.5, delay, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
    />
);

const BorderPulse = ({ accent }) => (
    <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: `0 0 0 1px ${accent}00` }}
        animate={{ boxShadow: [`0 0 0 1px ${accent}00`, `0 0 0 1px ${accent}30`, `0 0 0 1px ${accent}00`] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
    />
);

const Particle = ({ accent, index, active }) => {
    const angle = (index / 6) * Math.PI * 2;
    const dist = 60 + Math.random() * 30;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    const size = 2 + Math.random() * 3;
    const delay = index * 0.04;

    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                width: size,
                height: size,
                background: accent,
                left: "50%",
                top: "40%",
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={active
                ? { x: tx, y: ty, opacity: [0, 0.8, 0], scale: [0, 1, 0] }
                : { x: 0, y: 0, opacity: 0, scale: 0 }
            }
            transition={{ duration: 0.7, delay, ease: "easeOut" }}
        />
    );
};

const ProjectCard = ({ project, index }) => {
    const ref = useRef(null);
    const cardRef = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const [hovered, setHovered] = useState(false);
    const [particleKey, setParticleKey] = useState(0);

    const c = COLORS[project.color] ?? COLORS.indigo;
    const idleDelay = (index * 0.9) % 5;
    const floatDelay = (index * 1.3) % 4;

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

    const spotX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 20 });
    const spotY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 20 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseEnter = () => {
        setHovered(true);
        setParticleKey(k => k + 1);
    };

    const handleMouseLeave = () => {
        setHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 800 }}
        >
            <motion.div
                ref={cardRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                animate={{
                    y: hovered ? -6 : 0,
                    scale: hovered ? 1.02 : 1,
                    boxShadow: hovered
                        ? `0 20px 60px -10px rgba(${c.accentRgb}, 0.25), 0 8px 20px -4px rgba(0,0,0,0.5)`
                        : `0 2px 8px rgba(0,0,0,0.3)`,
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-2xl border bg-white/[0.03] p-5 flex flex-col gap-3 overflow-hidden cursor-default transition-colors duration-300 ${c.border} ${c.hBorder} h-full`}
                style={{ backdropFilter: "blur(10px)" }}
            >
                <motion.div
                    className="absolute -top-16 -left-16 w-56 h-56 rounded-full blur-3xl pointer-events-none"
                    style={{ background: c.glow }}
                    animate={{
                        opacity: hovered ? 0 : [0.15, 0.35, 0.15],
                        scale: hovered ? 0.8 : [0.8, 1.05, 0.8],
                    }}
                    transition={hovered
                        ? { duration: 0.3 }
                        : { duration: 4 + floatDelay * 0.5, repeat: Infinity, ease: "easeInOut", delay: floatDelay }
                    }
                />
                <IdleShimmer accent={c.accent} delay={idleDelay} />
                <BorderPulse accent={c.accent} />

                <motion.div
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        background: useTransform(
                            [spotX, spotY],
                            ([x, y]) =>
                                `radial-gradient(280px circle at ${x}% ${y}%, rgba(${c.accentRgb}, 0.10), transparent 70%)`
                        ),
                    }}
                />

                <motion.div
                    className="absolute -top-16 -left-16 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                    style={{ background: c.glow.replace("0.18", "0.35") }}
                    animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.1 : 0.6 }}
                    transition={{ duration: 0.5 }}
                />

                {[...Array(6)].map((_, i) => (
                    <Particle key={`${particleKey}-${i}`} accent={c.accent} index={i} active={hovered} />
                ))}

                <Brackets
                    color={hovered ? c.accent + "dd" : c.accent + "44"}
                    hovered={hovered}
                />

                <motion.div
                    className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                    animate={{
                        opacity: hovered ? 1 : 0.5,
                        left: hovered ? "0px" : "32px",
                        right: hovered ? "0px" : "32px",
                    }}
                    transition={{ duration: 0.4 }}
                    style={{ background: `linear-gradient(90deg, transparent, ${c.accent}88, transparent)` }}
                />

                {project.featured && (
                    <motion.div
                        animate={hovered ? { opacity: 1, scale: 1.05 } : { opacity: 0.8, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-4 right-4 text-[9px] tracking-[0.2em] uppercase px-2.5 py-0.5 rounded-full border font-semibold ${c.feat}`}
                    >
                        Featured
                    </motion.div>
                )}

                <div className={project.featured ? "pr-20" : ""}>
                    <div className="flex items-center gap-2 mb-0.5">
                        <motion.span
                            animate={hovered
                                ? { scale: [1, 1.6, 1], opacity: [1, 1, 1] }
                                : { opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }
                            }
                            transition={hovered
                                ? { duration: 0.5, repeat: Infinity, repeatDelay: 0.8 }
                                : { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: floatDelay }
                            }
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: c.accent }}
                        />
                        <motion.h3
                            animate={{ y: hovered ? -1 : 0 }}
                            transition={{ duration: 0.25 }}
                            className={`font-bold text-[15px] leading-snug ${c.title}`}
                        >
                            {project.title}
                        </motion.h3>
                    </div>
                    <span className="text-[11px] text-white/25 pl-3.5 block">{project.year}</span>
                </div>

                <motion.p
                    animate={{ opacity: hovered ? 0.8 : 0.6 }}
                    transition={{ duration: 0.25 }}
                    className="text-[12px] leading-relaxed flex-1 text-white"
                >
                    {project.description}
                </motion.p>

                <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, ti) => (
                        <motion.span
                            key={tag}
                            animate={hovered
                                ? { y: -2, transition: { delay: ti * 0.05, duration: 0.2 } }
                                : { y: 0, transition: { delay: 0, duration: 0.2 } }
                            }
                            className={`text-[10px] px-2 py-0.5 rounded-md border font-medium ${c.tag}`}
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>

                <motion.div
                    animate={{ y: hovered ? -1 : 0, opacity: hovered ? 1 : 0.7 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-3 pt-2 border-t border-white/[0.06]"
                >
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-[11px] text-white/40 hover:text-white transition-colors"
                    >
                        <GitHubIcon /> Source
                    </a>
                    {project.live && (
                        <>
                            <div className="w-px h-3 bg-white/10" />
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 text-[11px] text-white/40 transition-colors"
                                onMouseEnter={e => { e.currentTarget.style.color = c.accent; }}
                                onMouseLeave={e => { e.currentTarget.style.color = ""; }}
                            >
                                <ExternalIcon /> Live Demo
                            </a>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export const Projects = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true });

    const filtered = activeFilter === "All"
        ? projects
        : projects.filter(p => p.tags.includes(activeFilter));

    return (
        <section id="projects" className="relative min-h-screen bg-black text-white py-24 px-6 overflow-hidden">

            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #ffffff 1px, transparent 1px),
                        linear-gradient(to bottom, #ffffff 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                }}
            />

            <FloatingOrb color="rgba(139,92,246,0.07)" size={500} x="5%" y="10%" duration={14} delay={0} />
            <FloatingOrb color="rgba(59,130,246,0.06)" size={400} x="60%" y="50%" duration={18} delay={3} />
            <FloatingOrb color="rgba(20,184,166,0.05)" size={320} x="80%" y="5%" duration={12} delay={6} />
            <FloatingOrb color="rgba(244,63,94,0.04)" size={280} x="30%" y="70%" duration={16} delay={2} />

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,_rgba(139,92,246,0.10)_0%,_transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,_rgba(59,130,246,0.07)_0%,_transparent_50%)]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">

                <div ref={headerRef} className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-4 mb-5 w-[260px]"
                    >
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-[11px] tracking-[0.3em] text-gray-500 uppercase whitespace-nowrap">My Work</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-6xl font-bold leading-none"
                    >
                        Projects
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.18 }}
                        className="text-gray-500 text-sm mt-3 max-w-sm"
                    >
                        Things I've built, experimented with, and shipped.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="flex gap-2 flex-wrap items-center mb-10"
                >
                    {FILTERS.map(f => (
                        <motion.button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            whileHover={{ scale: 1.05, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            className={`
                                text-[11px] px-4 py-1.5 rounded-xl border transition-all duration-200 font-medium
                                ${activeFilter === f
                                    ? "bg-purple-600 border-purple-500/70 text-white shadow-lg shadow-purple-900/30"
                                    : "bg-white/[0.04] border-white/10 text-gray-500 hover:text-white hover:border-white/20 hover:bg-white/[0.07]"
                                }
                            `}
                        >
                            {f}
                        </motion.button>
                    ))}
                    <span className="ml-auto text-[11px] text-white/20">
                        {filtered.length} project{filtered.length !== 1 ? "s" : ""}
                    </span>
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.22 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                    >
                        {filtered.map((project, i) => (
                            <ProjectCard key={project.id} project={project} index={i} />
                        ))}
                    </motion.div>
                </AnimatePresence>

            </div>
        </section>
    );
};

export default Projects;