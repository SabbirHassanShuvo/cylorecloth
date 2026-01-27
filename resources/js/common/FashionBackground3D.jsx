import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FashionBackground3D = ({ variant = 'default' }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const variants = {
        default: {
            gradient: 'linear-gradient(135deg, rgba(252, 231, 243, 0.4), rgba(250, 245, 255, 0.3), rgba(239, 246, 255, 0.4))',
            accentColor: 'rgba(236, 72, 153, 0.15)',
        },
        dark: {
            gradient: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.9), rgba(17, 24, 39, 0.95))',
            accentColor: 'rgba(236, 72, 153, 0.3)',
        },
        light: {
            gradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(249, 250, 251, 0.8), rgba(255, 255, 255, 0.9))',
            accentColor: 'rgba(236, 72, 153, 0.1)',
        },
    };

    const currentVariant = variants[variant];

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* 3D Gradient Background with Mouse Parallax */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background: currentVariant.gradient,
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                }}
                animate={{
                    background: [
                        currentVariant.gradient,
                        'linear-gradient(135deg, rgba(239, 246, 255, 0.4), rgba(252, 231, 243, 0.3), rgba(250, 245, 255, 0.4))',
                        currentVariant.gradient,
                    ],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Floating 3D Fashion Icons */}
            {[...Array(12)].map((_, i) => {
                const icons = ['👗', '👠', '👜', '💄', '💅', '👒', '💍', '🕶️', '👔', '🎀', '💎', '✨'];
                return (
                    <motion.div
                        key={`icon-${i}`}
                        className="absolute text-5xl md:text-7xl"
                        style={{
                            left: `${(i * 8.33) % 100}%`,
                            top: `${(i * 13) % 100}%`,
                            filter: 'blur(1px)',
                            opacity: 0.15,
                        }}
                        animate={{
                            y: [0, -40, 0],
                            x: [0, Math.sin(i) * 30, 0],
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.25, 0.1],
                        }}
                        transition={{
                            duration: 20 + i * 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: 'easeInOut',
                        }}
                    >
                        {icons[i]}
                    </motion.div>
                );
            })}

            {/* 3D Geometric Shapes */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={`shape-${i}`}
                    className="absolute"
                    style={{
                        left: `${(i * 16.66) % 100}%`,
                        top: `${(i * 20) % 100}%`,
                        width: `${150 + i * 50}px`,
                        height: `${150 + i * 50}px`,
                        background: currentVariant.accentColor,
                        borderRadius: i % 2 === 0 ? '50%' : '30%',
                        filter: 'blur(60px)',
                    }}
                    animate={{
                        y: [0, -60, 0],
                        x: [0, 40, 0],
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 0],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 25 + i * 3,
                        repeat: Infinity,
                        delay: i * 1.5,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Sparkle/Glitter Effects */}
            {[...Array(25)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.8), rgba(168, 85, 247, 0.8))',
                        boxShadow: '0 0 10px rgba(236, 72, 153, 0.5)',
                    }}
                    animate={{
                        scale: [0, 2, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 180],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Elegant Wave Patterns */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-96 opacity-20"
                style={{
                    background: 'linear-gradient(to top, rgba(219, 39, 119, 0.3), transparent)',
                }}
                animate={{
                    opacity: [0.1, 0.3, 0.1],
                    transform: ['scaleY(1)', 'scaleY(1.2)', 'scaleY(1)'],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Gradient Orbs for Depth */}
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={`orb-${i}`}
                    className="absolute rounded-full"
                    style={{
                        left: `${25 * i}%`,
                        top: `${(i * 30) % 100}%`,
                        width: `${300 + i * 100}px`,
                        height: `${300 + i * 100}px`,
                        background: `radial-gradient(circle, rgba(236, 72, 153, ${0.2 - i * 0.03}), transparent)`,
                        filter: 'blur(80px)',
                    }}
                    animate={{
                        scale: [1, 1.4, 1],
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                        duration: 30 + i * 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Fashion Runway Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
                <motion.line
                    x1="0"
                    y1="50%"
                    x2="100%"
                    y2="50%"
                    stroke="rgba(236, 72, 153, 0.3)"
                    strokeWidth="2"
                    strokeDasharray="10,10"
                    animate={{
                        strokeDashoffset: [0, -20],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            </svg>

            {/* 3D Parallax Layers */}
            <motion.div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 20% 30%, rgba(236, 72, 153, 0.4) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)
                    `,
                    transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
                }}
            />
        </div>
    );
};

export default FashionBackground3D;