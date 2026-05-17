import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import skillCategories from "../../data/skills.json";

const ScrollReveal = ({ children, direction = "up", delay = 0, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    const variants = {
        hidden: {
            opacity: 0,
            x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
            y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
        },
        visible: { opacity: 1, x: 0, y: 0 },
    };

    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.7, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const FloatingParticle = ({ style, animateProps, transition }) => (
    <motion.div
        className="absolute rounded-full pointer-events-none"
        style={style}
        animate={animateProps}
        transition={transition}
    />
);

const SkillIcon = ({ skill, color, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-40px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.18, y: -8 }}
            className="flex flex-col items-center gap-2.5 group cursor-default"
        >
            <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center bg-white/[0.04] border border-white/8 transition-all duration-300 group-hover:border-white/20">
                <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                    style={{ background: color + "40" }}
                />
                <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-9 h-9 relative z-10"
                    style={{
                        filter: skill.name === "GitHub" || skill.name === "Express"
                            ? "invert(1) brightness(0.65)"
                            : "none",
                    }}
                />
            </div>
            <span className="text-xs text-gray-600 group-hover:text-gray-300 transition-colors duration-200">
                {skill.name}
            </span>
        </motion.div>
    );
};

const Skill = () => {
    return (
        <section id="skills" className="relative min-h-screen bg-black text-white px-6 py-24 overflow-hidden">

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

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_rgba(139,92,246,0.1)_0%,_transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_80%,_rgba(52,211,153,0.06)_0%,_transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_60%,_rgba(244,114,182,0.05)_0%,_transparent_50%)]" />

            <motion.div
                animate={{ y: [0, -30, 0], x: [0, 15, 0], opacity: [0.12, 0.2, 0.12] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-32 right-24 w-72 h-72 rounded-full bg-purple-600/10 blur-3xl pointer-events-none"
            />
            <motion.div
                animate={{ y: [0, 25, 0], x: [0, -10, 0], opacity: [0.08, 0.15, 0.08] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-32 left-16 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"
            />
            <motion.div
                animate={{ y: [0, -20, 0], opacity: [0.06, 0.12, 0.06] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-pink-500/5 blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"
            />

            {[
                { style: { top: "15%", left: "8%", width: 4, height: 4, background: "#a78bfa44" }, animateProps: { y: [0, -18, 0], opacity: [0.3, 0.7, 0.3] }, transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } },
                { style: { top: "40%", right: "6%", width: 3, height: 3, background: "#34d39944" }, animateProps: { y: [0, 14, 0], opacity: [0.2, 0.6, 0.2] }, transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 } },
                { style: { bottom: "20%", left: "15%", width: 5, height: 5, background: "#f472b644" }, animateProps: { y: [0, -22, 0], opacity: [0.2, 0.5, 0.2] }, transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 } },
                { style: { top: "60%", right: "15%", width: 3, height: 3, background: "#38bdf844" }, animateProps: { y: [0, 16, 0], opacity: [0.3, 0.6, 0.3] }, transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 } },
                { style: { top: "25%", left: "45%", width: 2, height: 2, background: "#a78bfa66" }, animateProps: { y: [0, -12, 0], opacity: [0.4, 0.8, 0.4] }, transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 } },
                { style: { bottom: "35%", right: "30%", width: 4, height: 4, background: "#34d39933" }, animateProps: { y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }, transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 3 } },
            ].map((p, i) => (
                <FloatingParticle key={i} {...p} />
            ))}

            <div className="relative z-10 max-w-4xl mx-auto">

                <ScrollReveal direction="up" className="flex items-center justify-center gap-4 mb-12">
                    <div className="flex-1 h-px bg-white/10 max-w-[80px]" />
                    <span className="text-xs tracking-[0.3em] text-gray-500 uppercase whitespace-nowrap">
                        What I Work With
                    </span>
                    <div className="flex-1 h-px bg-white/10 max-w-[80px]" />
                </ScrollReveal>

                <div className="mb-20 text-center">
                    <div className="flex justify-center">
                        <ScrollReveal direction="left">
                            <h2 className="text-6xl md:text-7xl font-bold leading-none me-4">My</h2>
                        </ScrollReveal>
                        <ScrollReveal direction="right" delay={100}>
                            <h2 className="text-6xl md:text-7xl font-bold leading-none text-purple-400">Skills.</h2>
                        </ScrollReveal>
                    </div>
                    <ScrollReveal direction="up" delay={200}>
                        <p className="text-gray-400 text-sm leading-relaxed mt-4 max-w-md mx-auto">
                            Still learning and growing — these are the technologies I've explored throughout my journey. JavaScript is where I'm most at home.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="space-y-16">
                    {skillCategories.map((cat, catIdx) => (
                        <div key={cat.label}>

                            <ScrollReveal direction="up" delay={catIdx * 50}>
                                <div className="flex items-center justify-center gap-3 mb-8">
                                    <div className="flex-1 h-px max-w-[60px]" style={{ background: cat.color + "30" }} />
                                    <div className="flex items-center gap-2">
                                        <motion.div
                                            animate={{ opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{ background: cat.color }}
                                        />
                                        <span
                                            className="text-xs tracking-[0.3em] uppercase font-medium"
                                            style={{ color: cat.color }}
                                        >
                                            {cat.label}
                                        </span>
                                        <motion.div
                                            animate={{ opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{ background: cat.color }}
                                        />
                                    </div>
                                    <div className="flex-1 h-px max-w-[60px]" style={{ background: cat.color + "30" }} />
                                </div>
                            </ScrollReveal>

                            <div className="flex flex-wrap justify-center gap-6">
                                {cat.skills.map((skill, skillIdx) => (
                                    <SkillIcon
                                        key={skill.name}
                                        skill={skill}
                                        color={cat.color}
                                        index={skillIdx}
                                    />
                                ))}
                            </div>

                            {/* Divider — except last */}
                            {catIdx < skillCategories.length - 1 && (
                                <ScrollReveal direction="up" delay={200}>
                                    <div className="mt-16 h-px bg-white/[0.04] mx-auto max-w-xs" />
                                </ScrollReveal>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skill;