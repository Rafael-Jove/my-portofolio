import { useState, useRef, useEffect } from "react";
import GlassSurface from '../component/GlassSurface/GlassSurface';

const NAV_LINKS = ["home", "projects", "skills", "contact"];

const Navbar = () => {
    const [active, setActive] = useState("home");
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const [glowPos, setGlowPos] = useState({ x: 0, y: 0, visible: false });
    const [hideNavbar, setHideNavbar] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    const itemRefs = useRef({});
    const ulRef = useRef(null);
    const navbarWrapRef = useRef(null);
    const glowActual = useRef({ x: 0, y: 0 });
    const glowTarget = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);

    const MAGNET_STRENGTH = 0.38;
    const MAGNET_RADIUS = 60;

    useEffect(() => {
        const hero = document.getElementById("hero");
        if (!hero) { setHideNavbar(false); return; }
        const observer = new IntersectionObserver(
            ([entry]) => { setHideNavbar(entry.isIntersecting); },
            { rootMargin: "-80px 0px 0px 0px" }
        );
        observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const activeEl = itemRefs.current[active];
        const ulEl = ulRef.current;
        if (!activeEl || !ulEl) return;
        const ulRect = ulEl.getBoundingClientRect();
        const elRect = activeEl.getBoundingClientRect();
        setPillStyle({ left: elRect.left - ulRect.left, width: elRect.width, opacity: 1 });
    }, [active]);

    useEffect(() => {
        const animate = () => {
            glowActual.current.x += (glowTarget.current.x - glowActual.current.x) * 0.12;
            glowActual.current.y += (glowTarget.current.y - glowActual.current.y) * 0.12;
            setGlowPos(prev => ({ ...prev, x: glowActual.current.x, y: glowActual.current.y }));
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    useEffect(() => {
        const sections = document.querySelectorAll("section[id]");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
            },
            { threshold: 0.3 }
        );
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const handleNavMouseMove = (e) => {
        const glassEl = navbarWrapRef.current?.querySelector(':first-child');
        const navRect = glassEl?.getBoundingClientRect();
        if (!navRect) return;
        if (e.clientX < navRect.left || e.clientX > navRect.right || e.clientY < navRect.top || e.clientY > navRect.bottom) {
            handleNavMouseLeave();
            return;
        }
        glowTarget.current = { x: e.clientX - navRect.left, y: e.clientY - navRect.top };
        setGlowPos(prev => ({ ...prev, visible: true }));
        Object.values(itemRefs.current).forEach(el => {
            if (!el) return;
            const r = el.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const btn = el.querySelector('button');
            if (!btn) return;
            if (dist < MAGNET_RADIUS) {
                const pull = 1 - dist / MAGNET_RADIUS;
                btn.style.transform = `translate(${dx * pull * MAGNET_STRENGTH}px, ${dy * pull * MAGNET_STRENGTH}px)`;
            } else {
                btn.style.transform = '';
            }
        });
    };

    const handleNavMouseLeave = () => {
        setGlowPos(prev => ({ ...prev, visible: false }));
        Object.values(itemRefs.current).forEach(el => {
            const btn = el?.querySelector('button');
            if (btn) btn.style.transform = '';
        });
    };

    return (
        <div
            ref={navbarWrapRef}
            className="fixed top-0 left-0 w-full flex justify-center mt-4 z-50 transition-all duration-300 ease-in-out"
            style={{
                transform: hideNavbar ? "translateY(-120%)" : "translateY(0)",
                opacity: hideNavbar ? 0 : 1,
            }}
            onMouseMove={handleNavMouseMove}
            onMouseLeave={handleNavMouseLeave}
        >
            <div className="w-[90%] lg:w-[34%] max-w-[520px] h-[52px] rounded-full relative shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_20px_rgba(139,92,246,0.2),0_4px_24px_rgba(0,0,0,0.6)]">
                <div className="absolute top-0 left-[20%] right-[20%] h-px rounded-full z-20 pointer-events-none bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />
                <div className="w-full h-full rounded-full overflow-hidden relative">
                    <GlassSurface
                        width="100%"
                        height={52}
                        borderRadius={50}
                        distortionScale={-180}
                        redOffset={0}
                        greenOffset={10}
                        blueOffset={20}
                        brightness={60}
                        opacity={0.97}
                        blur={16}
                        saturation={1.6}
                        backgroundOpacity={0.12}
                    >
                        <div
                            className="absolute pointer-events-none z-10 rounded-full w-24 h-24 mix-blend-screen transition-opacity duration-300"
                            style={{
                                background: "radial-gradient(circle, rgba(168,85,247,0.5) 0%, rgba(120,60,220,0.2) 40%, transparent 70%)",
                                left: glowPos.x,
                                top: glowPos.y,
                                transform: "translate(-50%, -50%)",
                                opacity: glowPos.visible ? 1 : 0,
                            }}
                        />
                        <div className="absolute inset-0 rounded-full pointer-events-none z-10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]" />
                        <div className="w-full h-full flex items-center justify-between px-6 relative">
                            <h1
                                onClick={() => {
                                    const section = document.getElementById("hero");
                                    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
                                }}
                                className="font-bold cursor-pointer m-0 text-base lg:text-sm tracking-wide text-white"
                            >
                                Rafael<span className="text-purple-400">.</span>
                            </h1>

                            <ul ref={ulRef} className="hidden lg:flex list-none m-0 p-1 relative">
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 h-7 rounded-full pointer-events-none z-0 border border-purple-500/30 bg-purple-500/20 shadow-[inset_0_1px_0_rgba(168,85,247,0.3),0_0_12px_rgba(168,85,247,0.15)]"
                                    style={{
                                        left: pillStyle.left,
                                        width: pillStyle.width,
                                        opacity: pillStyle.opacity,
                                        transition: "left 0.35s cubic-bezier(0.34,1.56,0.64,1), width 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease",
                                    }}
                                />
                                {NAV_LINKS.map((name) => {
                                    const isActive = active === name;
                                    return (
                                        <li key={name} ref={el => itemRefs.current[name] = el}>
                                            <button
                                                onClick={() => {
                                                    const section = document.getElementById(name);
                                                    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
                                                }}
                                                className={`flex items-center px-3.5 py-1.5 rounded-full border-none bg-transparent cursor-pointer text-base lg:text-[13px] whitespace-nowrap relative z-10 transition-colors duration-200 ${isActive ? "font-semibold text-white [text-shadow:0_0_12px_rgba(168,85,247,0.6)]" : "font-normal text-white hover:text-white"}`}
                                            >
                                                {name.charAt(0).toUpperCase() + name.slice(1)}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>

                            <button
                                onClick={() => setMenuOpen(prev => !prev)}
                                className="lg:hidden flex flex-col justify-center items-center gap-1 w-8 h-8 bg-transparent border-none cursor-pointer z-10"
                            >
                                <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                                <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                                <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
                            </button>
                        </div>
                    </GlassSurface>
                </div>
            </div>

            {menuOpen && (
                <div
                    className="lg:hidden absolute top-[64px] left-1/2 -translate-x-1/2 w-[90%] max-w-[520px] rounded-2xl border border-white/10 overflow-hidden"
                    style={{
                        background: "linear-gradient(135deg, rgba(20,10,40,0.95) 0%, rgba(10,5,25,0.98) 100%)",
                        backdropFilter: "blur(20px)",
                        boxShadow: "0 8px 40px rgba(139,92,246,0.2), 0 4px 24px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)",
                        animation: "dropIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards",
                    }}
                >
                    <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(139,92,246,0.08)_0%,_transparent_60%)] pointer-events-none" />

                    {NAV_LINKS.map((name, i) => {
                        const isActive = active === name;
                        return (
                            <button
                                key={name}
                                onClick={() => {
                                    const section = document.getElementById(name);
                                    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
                                    setMenuOpen(false);
                                }}
                                style={{
                                    animation: `slideIn 0.3s cubic-bezier(0.34,1.56,0.64,1) ${i * 60}ms both`,
                                }}
                                className={`w-full px-6 py-4 text-left text-base lg:text-sm border-none bg-transparent cursor-pointer transition-all duration-200 flex items-center justify-between group ${isActive ? "text-purple-400 font-semibold" : "text-white/60 hover:text-white"} ${i < NAV_LINKS.length - 1 ? "border-b border-white/5" : ""}`}
                            >
                                <span className="flex items-center gap-3">
                                    <span
                                        className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                                        style={{
                                            background: isActive ? "#a855f7" : "rgba(255,255,255,0.2)",
                                            boxShadow: isActive ? "0 0 8px rgba(168,85,247,0.8)" : "none",
                                        }}
                                    />
                                    {name.charAt(0).toUpperCase() + name.slice(1)}
                                </span>
                                <span
                                    className="text-xs transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
                                    style={{ color: isActive ? "#a855f7" : "rgba(255,255,255,0.3)" }}
                                >
                                    →
                                </span>
                            </button>
                        );
                    })}

                    <style>{`
                        @keyframes dropIn {
                            from { opacity: 0; transform: translateY(-12px) translateX(-50%) scale(0.95); }
                            to { opacity: 1; transform: translateY(0) translateX(-50%) scale(1); }
                        }
                        @keyframes slideIn {
                            from { opacity: 0; transform: translateX(-10px); }
                            to { opacity: 1; transform: translateX(0); }
                        }
                    `}</style>
                </div>
            )}
        </div>
    );
};

export default Navbar;