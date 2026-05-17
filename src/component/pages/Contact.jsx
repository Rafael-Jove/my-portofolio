import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";

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

const Contact = () => {
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [focused, setFocused] = useState(null);

    const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formState.name || !formState.email || !formState.message) return;
        setSending(true);

        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
                name: formState.name,
                email: formState.email,
                message: formState.message,
                time: new Date().toLocaleString("id-ID", {
                    dateStyle: "full",
                    timeStyle: "short",
                }),
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
            .then(() => {
                setSending(false);
                setSent(true);
                setFormState({ name: "", email: "", message: "" });
                setTimeout(() => setSent(false), 4000);
            })
            .catch(() => {
                setSending(false);
                alert("Gagal kirim pesan. Coba lagi.");
            });
    };

    return (
        <section id="contact" className="relative min-h-screen bg-black text-white flex items-center justify-center px-6 py-24 overflow-hidden">

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

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_rgba(139,92,246,0.12)_0%,_transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,_rgba(236,72,153,0.07)_0%,_transparent_50%)]" />

            <motion.div
                animate={{ y: [0, -20, 0], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-20 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl pointer-events-none"
            />
            <motion.div
                animate={{ y: [0, 20, 0], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-pink-600/10 blur-3xl pointer-events-none"
            />

            <div className="relative z-10 max-w-2xl w-full">

                <ScrollReveal direction="up" className="flex items-center justify-center gap-4 mb-12">
                    <div className="flex-1 h-px bg-white/10 max-w-[80px]" />
                    <span className="text-xs tracking-[0.3em] text-gray-500 uppercase whitespace-nowrap">
                        Get In Touch
                    </span>
                    <div className="flex-1 h-px bg-white/10 max-w-[80px]" />
                </ScrollReveal>

                <div className="mb-10">
                    <ScrollReveal direction="left">
                        <h2 className="text-6xl md:text-7xl font-bold leading-none">
                            Let's
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal direction="right" delay={100}>
                        <h2 className="text-6xl md:text-7xl font-bold leading-none text-purple-400">
                            Connect.
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={200}>
                        <p className="text-gray-400 text-sm leading-relaxed mt-4">
                            Whether you have an opportunity, a question, or just want to say hello — my inbox is always open.
                        </p>
                    </ScrollReveal>
                </div>

                <ScrollReveal direction="up" delay={250}>
                    <div className="relative rounded-3xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-8 overflow-hidden">

                        {/* Inner glows */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 blur-2xl rounded-full pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/8 blur-2xl rounded-full pointer-events-none" />

                        {/* Corner accents */}
                        <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-purple-500/40 rounded-tl-lg" />
                        <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-purple-500/40 rounded-tr-lg" />
                        <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-purple-500/40 rounded-bl-lg" />
                        <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-purple-500/40 rounded-br-lg" />

                        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {["name", "email"].map((field) => (
                                    <div key={field}>
                                        <motion.label
                                            className="block text-xs mb-1.5 capitalize tracking-widest"
                                            animate={{ color: focused === field ? "#a78bfa" : "#6b7280" }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {field}
                                        </motion.label>
                                        <motion.input
                                            type={field === "email" ? "email" : "text"}
                                            name={field}
                                            value={formState[field]}
                                            onChange={handleChange}
                                            onFocus={() => setFocused(field)}
                                            onBlur={() => setFocused(null)}
                                            placeholder={field === "name" ? "Your name" : "you@email.com"}
                                            required
                                            animate={{
                                                borderColor: focused === field
                                                    ? "rgba(139,92,246,0.5)"
                                                    : "rgba(255,255,255,0.08)",
                                            }}
                                            transition={{ duration: 0.2 }}
                                            className="w-full bg-white/[0.04] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 border outline-none transition-colors focus:bg-white/[0.07]"
                                            style={{ borderWidth: 1 }}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div>
                                <motion.label
                                    className="block text-xs mb-1.5 tracking-widest"
                                    animate={{ color: focused === "message" ? "#a78bfa" : "#6b7280" }}
                                    transition={{ duration: 0.2 }}
                                >
                                    message
                                </motion.label>
                                <motion.textarea
                                    name="message"
                                    value={formState.message}
                                    onChange={handleChange}
                                    onFocus={() => setFocused("message")}
                                    onBlur={() => setFocused(null)}
                                    placeholder="Tell me about the opportunity..."
                                    required
                                    rows={6}
                                    animate={{
                                        borderColor: focused === "message"
                                            ? "rgba(139,92,246,0.5)"
                                            : "rgba(255,255,255,0.08)",
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className="w-full bg-white/[0.04] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 border outline-none resize-none transition-colors focus:bg-white/[0.07]"
                                    style={{ borderWidth: 1 }}
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={sending || sent}
                                whileHover={!sending && !sent ? { scale: 1.02, y: -2 } : {}}
                                whileTap={!sending && !sent ? { scale: 0.97 } : {}}
                                className="relative w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium overflow-hidden transition-all duration-300 cursor-pointer"
                                style={{
                                    background: sent
                                        ? "rgba(74,222,128,0.15)"
                                        : "rgba(139,92,246,0.85)",
                                    border: sent
                                        ? "1px solid rgba(74,222,128,0.3)"
                                        : "1px solid rgba(139,92,246,0.5)",
                                    color: sent ? "#86efac" : "#fff",
                                }}
                            >
                                {!sent && (
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                                )}

                                {sent ? (
                                    <>
                                        <motion.svg
                                            initial={{ scale: 0, rotate: -90 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </motion.svg>
                                        Message Sent!
                                    </>
                                ) : sending ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="22" y1="2" x2="11" y2="13" />
                                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                        </svg>
                                        Send Message
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={400}>
                    <div className="flex items-center gap-4 mt-16">
                        <div className="flex-1 h-px bg-white/5" />
                        <p className="text-xs text-gray-700 tracking-widest uppercase whitespace-nowrap">
                            Rafael Jove Wicaksono · ISTTS Surabaya
                        </p>
                        <div className="flex-1 h-px bg-white/5" />
                    </div>
                </ScrollReveal>

            </div>
        </section>
    );
};

export default Contact;