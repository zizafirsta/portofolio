/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  Database, 
  Github, 
  Terminal, 
  Globe, 
  Cpu, 
  Layers,
  Smartphone
} from 'lucide-react';

interface AboutProps {
  summaryText: string;
}

export default function About({ summaryText }: AboutProps) {
  const paragraphs = summaryText
    ? summaryText.split('\n\n').filter((p) => p.trim() !== '')
    : ["No biographical profile information has been configured."];

  // Daftar lengkap Tech Stack yang biasa kamu gunakan (Web, Mobile, & Tools)
  const techStack = [
    { name: "Next.js", icon: <Globe className="w-5 h-5 text-white" /> },
    { name: "React", icon: <Code2 className="w-5 h-5 text-sky-400" /> },
    { name: "Flutter", icon: <Smartphone className="w-5 h-5 text-blue-400" /> },
    { name: "Node.js", icon: <Terminal className="w-5 h-5 text-green-500" /> },
    { name: "Python", icon: <Cpu className="w-5 h-5 text-yellow-500" /> },
    { name: "Pandas", icon: <Layers className="w-5 h-5 text-indigo-400" /> },
    { name: "Supabase", icon: <Database className="w-5 h-5 text-emerald-500" /> },
    { name: "TypeScript", icon: <Code2 className="w-5 h-5 text-blue-500" /> },
    { name: "Tailwind CSS", icon: <Layers className="w-5 h-5 text-teal-400" /> },
    { name: "HTML5/CSS3", icon: <Globe className="w-5 h-5 text-orange-500" /> },
    { name: "GitHub", icon: <Github className="w-5 h-5 text-zinc-400" /> },
  ];

  // Duplikasi stack untuk menciptakan efek sambungan loop tanpa patah
  const duplicatedStack = [...techStack, ...techStack];

  return (
    <section
      id="about"
      className="relative bg-[#0D0D0D] py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div id="about-vertical-line" className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-white/5 hidden sm:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* SISI KIRI: Menggunakan Animasi Ban Berjalan / Infinite Rolling Loop Ke Kiri */}
          <div className="lg:col-span-5 flex flex-col justify-start w-full overflow-hidden">
            <div className="sticky top-28 w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-[#800020]" />
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#800020] font-semibold">
                  01 // TECH ENGINE
                </span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight mb-8">
                Technical Stack &amp; <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-[#800020]">
                  Development Tools.
                </span>
              </h2>

              {/* Masking overlay untuk efek sinematik gradasi memudar di kanan dan kiri ujung */}
              <div 
                className="relative w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]"
              >
                <motion.div
                  className="flex gap-3 w-max"
                  animate={{ x: [0, -1000] }} // Menyeret barisan ke kiri secara konstan
                  transition={{
                    ease: "linear",
                    duration: 25,
                    repeat: Infinity,
                  }}
                  whileHover={{ transition: { ease: "linear" } }} // Menjaga kestabilan saat di-hover
                >
                  {duplicatedStack.map((tech, index) => (
                    <motion.div
                      key={`${tech.name}-${index}`}
                      whileHover={{ 
                        scale: 1.05,
                        borderColor: "rgba(128,0,32,0.4)",
                        backgroundColor: "rgba(128,0,32,0.05)",
                        y: -4
                      }}
                      className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/5 bg-zinc-900/20 backdrop-blur-sm transition-all duration-300 cursor-default flex-shrink-0"
                    >
                      <div className="p-1.5 rounded-lg bg-zinc-950/80 border border-white/5">
                        {tech.icon}
                      </div>
                      <span className="font-mono text-[11px] font-medium text-zinc-300">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          {/* SISI KANAN: Deskripsi Biografi & Statistik Utama */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-center">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                id={`about-paragraph-${index}`}
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed tracking-wide text-justify"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Quick interactive stats panel - minimalist luxury */}
            <motion.div
              id="about-stagger-metrics"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="grid grid-cols-3 gap-6 pt-10 mt-6 border-t border-white/5"
            >
              <div>
                <span className="block font-serif text-2xl md:text-3xl text-white font-bold tracking-tight">
                  2023
                </span>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-gray-500 mt-1">
                  UMM Entry Year
                </span>
              </div>
              <div>
                <span className="block font-serif text-2xl md:text-3xl text-[#800020] font-bold tracking-tight">
                  11+
                </span>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-gray-500 mt-1">
                  Core Competencies
                </span>
              </div>
              <div>
                <span className="block font-serif text-2xl md:text-3xl text-white font-bold tracking-tight">
                  100%
                </span>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-gray-500 mt-1">
                  Choral Dedication
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}