import { useState, useRef, useEffect } from "react";
import GlassSurface from '../component/GlassSurface/GlassSurface';

const NAV_LINKS = ["Home", "About", "Projects", "Contact"];

const Navbar = () => {
    const [active, setActive] = useState("Home");
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const [glowPos, setGlowPos] = useState({ x: 0, y: 0, visible: false });
    const [hideNavbar, setHideNavbar] = useState(true);

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
        if (!hero) return;
        const observer = new IntersectionObserver(
            ([entry]) => setHideNavbar(entry.isIntersecting),
            { threshold: 0.4 }
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
            <div className="w-[34%] h-[52px] rounded-full relative shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_20px_rgba(139,92,246,0.2),0_4px_24px_rgba(0,0,0,0.6)]">

                {/* Purple top accent line */}
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
                        {/* Mouse glow */}
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

                        {/* Inner border */}
                        <div className="absolute inset-0 rounded-full pointer-events-none z-10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]" />

                        <div className="w-full h-full flex items-center justify-between px-6 relative">

                            {/* Logo */}
                            <h1
                                onClick={() => setActive("Home")}
                                className="font-bold cursor-pointer m-0 text-sm tracking-wide text-white"
                            >
                                Rafael<span className="text-purple-400">.</span>
                            </h1>

                            {/* Nav links */}
                            <ul ref={ulRef} className="flex list-none m-0 p-1 relative">

                                {/* Active pill */}
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
                                                onClick={() => setActive(name)}
                                                className={`
    flex items-center px-3.5 py-1.5 rounded-full border-none bg-transparent
    cursor-pointer text-[13px] whitespace-nowrap relative z-10
    transition-colors duration-200
    ${isActive
                                                        ? "font-semibold text-white [text-shadow:0_0_12px_rgba(168,85,247,0.6)]"
                                                        : "font-normal text-white hover:text-white"
                                                    }
`}
                                            >
                                                {name}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </GlassSurface>
                </div>
            </div>
        </div>
    );
};

export default Navbar;