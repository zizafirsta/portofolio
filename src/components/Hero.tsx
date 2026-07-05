/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Linkedin, ArrowRight, Code2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Tagline } from '../types';

interface HeroProps {
  fullName: string;
  location: string;
  profileImageUrl: string;
  linkedinUrl: string;
  taglines: Tagline[];
}

export default function Hero({ fullName, location, profileImageUrl, linkedinUrl }: HeroProps) {
  // Mouse parallax effect states untuk background foto agar tetap mewah
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const offsetX = ((clientX - centerX) / centerX) * 18;
    const offsetY = ((clientY - centerY) / centerY) * 18;
    setMouseOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center bg-[#0D0D0D] overflow-hidden pt-24 pb-16 px-6 md:px-12"
    >
      {/* Immersive background visuals & dark-red ambient shadows */}
      <div id="ambient-glow-top-left" className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#800020]/10 blur-[120px] pointer-events-none" />
      <div id="ambient-glow-bottom-right" className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#800020]/8 blur-[150px] pointer-events-none" />
      
      {/* Decorative luxury vector lines (grid-like minimalism) */}
      <div id="background-grid-lines" className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Side: Typography Content */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center order-2 lg:order-1 text-left">
          
          {/* Location badge with small pin */}
          <motion.div
            id="location-badge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#800020]/10 border border-[#800020]/30 rounded-full mb-6"
          >
            <MapPin className="w-3.5 h-3.5 text-[#800020] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-300">
              {location}
            </span>
          </motion.div>

          {/* Full Name in Editorial Typography */}
          <motion.h1
            id="hero-fullname"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95] mb-5"
          >
            Ziza Firsta<br/>
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-[#800020]">Mahadewi</span>
          </motion.h1>

          {/* HEADLINE UTAMA: Langsung To The Point Menjelaskan Siapa Kamu */}
          <motion.div
            id="hero-headline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-2.5 mb-3 text-white font-sans text-sm sm:text-base md:text-lg font-semibold tracking-wider uppercase"
          >
            <Code2 className="w-5 h-5 text-[#800020]" />
            <span>Informatics Engineering Student 2023</span>
          </motion.div>

          {/* SUB-HEADLINE*/}
          <motion.p
            id="hero-subheadline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-mono text-[11px] sm:text-xs tracking-widest text-zinc-400 uppercase mb-8 border-l-2 border-[#800020] pl-3 leading-relaxed"
          >
            Software Engineering Enthusiast | Web & Mobile Development | Intelligent Systems
          </motion.p>

          {/* LinkedIn CTA Button */}
          <motion.div
            id="hero-cta-wrapper"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <a
              id="hero-linkedin-btn"
              href={linkedinUrl}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-full text-white font-sans text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-500 hover:bg-[#800020]/20 hover:border-[#800020] hover:shadow-[0_0_20px_rgba(128,0,32,0.3)] group"
            >
              <span className="relative overflow-hidden flex items-center gap-2">
                <span>Connect On LinkedIn</span>
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </motion.div>

        </div>

        {/* Right Side: Portrait with Parallax Outer Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
          <motion.div
            id="profile-frame-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-[320px] md:h-[320px] aspect-square rounded-full border border-[#800020]/40 p-2 burgundy-glow flex items-center justify-center bg-zinc-900/50"
          >
            <div className="absolute inset-2 rounded-full bg-[#800020]/20 blur-xl animate-pulse pointer-events-none" />

            {/* Micro-parallax Image Wrapper */}
            <div
              id="parallax-image-wrapper"
              style={{
                transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
                transition: 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
              className="w-full h-full relative"
            >
              {/* Main Circular Portrait */}
              <div className="w-full h-full overflow-hidden rounded-full border border-[#800020]/60 relative z-10 bg-[#0D0D0D] shadow-2xl group">
                <img
                  id="hero-profile-image"
                  src={profileImageUrl}
                  alt={fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center brightness-95 contrast-[1.02] saturate-[0.9] group-hover:saturate-105 group-hover:brightness-105 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/85 via-transparent to-transparent opacity-60 pointer-events-none" />
                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-serif text-2xl font-bold tracking-widest text-white/10 group-hover:text-[#800020]/40 transition-colors duration-500 select-none">
                  ZF
                </span>
              </div>

              {/* Pulse status indicator */}
              <div className="absolute bottom-2 right-2 bg-[#0D0D0D] p-1.5 rounded-full border border-[#800020]/20 z-20">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}