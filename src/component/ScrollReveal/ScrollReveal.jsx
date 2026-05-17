import { motion } from "framer-motion";

const variants = {
    hidden: (direction) => {
        const distance = 56; // sama kayak translate-y-14

        switch (direction) {
            case "left":
                return {
                    opacity: 0,
                    x: -distance,
                    scale: 0.95,
                    filter: "blur(4px)",
                };
            case "right":
                return {
                    opacity: 0,
                    x: distance,
                    scale: 0.95,
                    filter: "blur(4px)",
                };
            case "up":
                return {
                    opacity: 0,
                    y: -distance,
                    scale: 0.95,
                    filter: "blur(4px)",
                };
            case "down":
            default:
                return {
                    opacity: 0,
                    y: distance,
                    scale: 0.95,
                    filter: "blur(4px)",
                };
        }
    },

    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 1, // sama kayak duration-1000
            ease: [0.16, 1, 0.3, 1], // easing kamu sebelumnya
        },
    },
};

const ScrollReveal = ({
    children,
    className = "",
    delay = 0,
    direction = "up",
}) => {
    return (
        <motion.span
            className={`inline-block ${className}`}
            custom={direction}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: true,
                margin: "-20% 0px", // sama feel dengan rootMargin lama
            }}
            transition={{
                delay: delay / 1000,
            }}
            style={{
                willChange: "transform, opacity, filter",
            }}
        >
            {children}
        </motion.span>
    );
};

export default ScrollReveal;