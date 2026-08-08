import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowDown, BookOpen, Gamepad2, Users, BarChart3 } from "lucide-react";

/**
 * HallPage - 星辰啟航 (Hall of Cosmos)
 * 
 * Design Philosophy: Deep Space Minimalism
 * - Hero section with animated title and particle background
 * - Four portal cards: Specialty (專攻區), Game (遊戲模式), Parent (家長區), Teacher (教師區)
 * - Glass morphism design with cosmic colors
 * - Hover effects: spotlight effect on cards, subtle elevation
 */

export default function HallPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in (from localStorage or session)
    const userSession = localStorage.getItem("userSession");
    setIsLoggedIn(!!userSession);
  }, []);

  const portals = [
    {
      id: "specialty",
      name: "專攻區",
      subtitle: "心流之間",
      description: "追蹤能力進度、解鎖技能樹、規劃學習路徑",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      href: "/specialty",
      stats: ["聽力 B1▲", "寵物 Lv.12"],
    },
    {
      id: "game",
      name: "遊戲模式",
      subtitle: "星辰冒險",
      description: "探索六顆知識星球、馴養寵物、參加競技場",
      icon: Gamepad2,
      color: "from-amber-500 to-orange-600",
      href: "/game",
      stats: ["能量 ████░░", "排名 Top 100"],
    },
    {
      id: "parent",
      name: "家長區",
      subtitle: "親子星港",
      description: "掌握孩子成長、親子共學、溫暖陪伴",
      icon: Users,
      color: "from-emerald-500 to-teal-600",
      href: "/parent",
      stats: ["孩子 1 位", "本週進度 ↑"],
    },
    {
      id: "teacher",
      name: "教師區",
      subtitle: "班級指揮艙",
      description: "班級戰情、派發套餐、學生管理、榮譽殿堂",
      icon: BarChart3,
      color: "from-purple-500 to-violet-600",
      href: "/teacher",
      stats: ["班級 3 個", "學生 87 位"],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Particle Background Canvas */}
      <ParticleBackground />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-cosmic border-b border-white/6">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
              <span className="text-xs font-bold text-black">CE</span>
            </div>
            <span className="font-bold text-lg">Cool English</span>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <span className="text-sm text-muted-foreground">歡迎回來</span>
                <button className="w-8 h-8 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all" />
              </>
            ) : (
              <Button variant="outline" className="text-xs">
                登入
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-float">
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              你的英語宇宙
            </span>
            <br />
            <span className="text-white">由你指揮</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            在這個內在宇宙中，每一次學習都是一次探索。用數據驅動成長、用遊戲激發熱情、用社群溫暖陪伴。
          </p>
          <div className="flex justify-center">
            <ArrowDown className="w-6 h-6 text-accent animate-bounce" />
          </div>
        </div>
      </section>

      {/* Portal Cards Section */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {portals.map((portal) => {
              const Icon = portal.icon;
              const isHovered = hoveredCard === portal.id;

              return (
                <Link key={portal.id} href={portal.href}>
                  <div
                    className="glass-card-hover group relative overflow-hidden h-full cursor-pointer"
                    onMouseEnter={() => setHoveredCard(portal.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${portal.color}`}
                    />

                    {/* Content */}
                    <div className="relative p-6 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">
                              {portal.name}
                            </h3>
                            <p className="text-sm text-accent">{portal.subtitle}</p>
                          </div>
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${portal.color} text-white`}>
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {portal.description}
                        </p>
                      </div>

                      {/* Stats or CTA */}
                      {isLoggedIn ? (
                        <div className="space-y-2">
                          {portal.stats.map((stat, idx) => (
                            <div key={idx} className="text-xs text-muted-foreground">
                              {stat}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Button className="w-full bg-accent text-accent-foreground hover:opacity-90">
                          進入
                        </Button>
                      )}
                    </div>

                    {/* Spotlight effect on hover */}
                    {isHovered && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/6 py-8 px-4 mt-20">
        <div className="container flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <div>© 2024 Cool English. All rights reserved.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">
              客服中心
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              隱私政策
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              使用條款
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * ParticleBackground - Canvas-based particle system
 * Creates a subtle cosmic atmosphere with floating particles
 */
function ParticleBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle array
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "rgba(11, 12, 16, 0.02)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.fillStyle = `rgba(240, 196, 90, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

import React from "react";
