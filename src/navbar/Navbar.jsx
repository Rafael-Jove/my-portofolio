import { useState, useRef, useEffect } from "react";
import GlassSurface from '../component/GlassSurface/GlassSurface';

const NAV_LINKS = ["Home", "About", "Projects", "Contact"];

const Navbar = () => {
    const [active, setActive] = useState("Home");
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const [glowPos, setGlowPos] = useState({ x: 0, y: 0, visible: false });
    const [hideNavbar, setHideNavbar] = useState(true); // ✅ NEW

    const itemRefs = useRef({});
    const ulRef = useRef(null);
    const navbarWrapRef = useRef(null);
    const glowActual = useRef({ x: 0, y: 0 });
    const glowTarget = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);

    const MAGNET_STRENGTH = 0.38;
    const MAGNET_RADIUS = 60;

    // ✅ DETECT HERO SECTION
    useEffect(() => {
        const hero = document.getElementById("hero");
        if (!hero) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setHideNavbar(entry.isIntersecting);
            },
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
        setPillStyle({
            left: elRect.left - ulRect.left,
            width: elRect.width,
            opacity: 1,
        });
    }, [active]);

    useEffect(() => {
        const animate = () => {
            glowActual.current.x += (glowTarget.current.x - glowActual.current.x) * 0.12;
            glowActual.current.y += (glowTarget.current.y - glowActual.current.y) * 0.12;
            setGlowPos(prev => ({
                ...prev,
                x: glowActual.current.x,
                y: glowActual.current.y,
            }));
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    const handleNavMouseMove = (e) => {
        const glassEl = navbarWrapRef.current?.querySelector(':first-child');
        const navRect = glassEl?.getBoundingClientRect();
        if (!navRect) return;

        if (
            e.clientX < navRect.left || e.clientX > navRect.right ||
            e.clientY < navRect.top || e.clientY > navRect.bottom
        ) {
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
            className="fixed top-0 left-0 w-full flex justify-center mt-4 z-50"
            onMouseMove={handleNavMouseMove}
            onMouseLeave={handleNavMouseLeave}
            style={{
                transform: hideNavbar ? "translateY(-120%)" : "translateY(0)", // ✅ NEW
                opacity: hideNavbar ? 0 : 1, // ✅ NEW
                transition: "all 0.35s ease"
            }}
        >
            <div className="w-[30%] h-[50px] rounded-full overflow-hidden relative">
                <GlassSurface
                    width="100%"
                    height={50}
                    borderRadius={50}
                    distortionScale={-180}
                    redOffset={0}
                    greenOffset={10}
                    blueOffset={20}
                    brightness={50}
                    opacity={0.93}
                    blur={11}
                    saturation={1.4}
                    backgroundOpacity={0.05}
                    style={{ position: "relative" }}
                >
                    <div
                        className="absolute pointer-events-none z-10 rounded-full"
                        style={{
                            width: 90, height: 90,
                            background: "radial-gradient(circle, rgba(150,100,255,0.55) 0%, rgba(100,60,220,0.2) 40%, transparent 70%)",
                            left: glowPos.x,
                            top: glowPos.y,
                            transform: "translate(-50%, -50%)",
                            opacity: glowPos.visible ? 1 : 0,
                            transition: "opacity 0.25s ease",
                            mixBlendMode: "screen",
                        }}
                    />

                    <div
                        className="absolute pointer-events-none"
                        style={{
                            top: 0, left: "10%", right: "10%",
                            height: "1px",
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                        }}
                    />

                    <div className="w-full flex items-center justify-between px-6 relative">
                        <h1
                            onClick={() => setActive("Home")}
                            className="font-bold text-white/95 text-base cursor-pointer m-0"
                        >
                            Rafael Jove
                        </h1>

                        <ul ref={ulRef} className="flex list-none m-0 p-1 relative">
                            <div
                                className="absolute top-1/2 -translate-y-1/2 h-8 rounded-full pointer-events-none z-0"
                                style={{
                                    left: pillStyle.left,
                                    width: pillStyle.width,
                                    opacity: 0.5,
                                    background: "rgba(255,255,255,0.18)",
                                    backdropFilter: "blur(12px) saturate(1.5) brightness(1)",
                                    WebkitBackdropFilter: "blur(12px) saturate(1.5) brightness(1.2)",
                                    boxShadow: `
                                        inset 0 1px 0 rgba(255,255,255,0.45),
                                        inset 0 -1px 0 rgba(255,255,255,0.1),
                                        0 2px 8px rgba(0,0,0,0.15)
                                    `,
                                    transition: "left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease",
                                }}
                            >
                                <div
                                    className="absolute top-0 pointer-events-none"
                                    style={{
                                        left: "15%", right: "15%",
                                        height: "1px",
                                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                                    }}
                                />
                            </div>

                            {NAV_LINKS.map((name) => {
                                const isActive = active === name;
                                return (
                                    <li key={name} ref={el => itemRefs.current[name] = el}>
                                        <button
                                            onClick={() => setActive(name)}
                                            className="flex items-center px-3.5 py-1.5 rounded-full border-none bg-transparent cursor-pointer text-[13px] whitespace-nowrap relative z-10"
                                            style={{
                                                fontWeight: isActive ? 600 : 400,
                                                color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)",
                                                transition: "color 0.25s ease",
                                            }}
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
    );
};

export default Navbar;