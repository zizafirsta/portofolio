/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Trophy, Music, Calendar, Award, Star, Compass } from 'lucide-react';
import { Organization } from '../types';

interface ExperienceProps {
  organizations: Organization[];
  detailsMap: Record<string | number, string[]>;
}

export default function Experience({ organizations, detailsMap }: ExperienceProps) {
  // Sort organizations such that choir roles appear together or custom order
  const sortedOrgs = [...organizations].sort((a, b) => {
    // Put choir experiences first, then general events
    if (a.is_choir && !b.is_choir) return -1;
    if (!a.is_choir && b.is_choir) return 1;
    return 0;
  });

  // Unique static waveform heights for choral decoration
  const waveformHeights = [10, 24, 14, 32, 18, 40, 22, 30, 12, 28, 16, 8];

  return (
    <section
      id="experience"
      className="relative bg-[#0D0D0D] py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      {/* Background glow shadow */}
      <div className="absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#800020]/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-start mb-16 text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#800020]" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#800020] font-semibold">
              04 // LEADERSHIP
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
            Organizational Tenures & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-[#800020]">
              Choral Discipline.
            </span>
          </h2>
        </div>

        {/* Horizontal/Vertical Grid of Tenures */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {sortedOrgs.map((org, index) => {
            const details = detailsMap[org.id] || [];
            
            return (
              <motion.div
                id={`org-card-${org.id}`}
                key={org.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative glass-card border border-white/5 p-8 md:p-10 rounded-3xl hover:border-[#800020]/40 hover:shadow-[0_0_30px_rgba(128,0,32,0.2)] transition-all duration-500 flex flex-col justify-between"
              >
                {/* 1. Special Choir Visual Background Effects */}
                {org.is_choir && (
                  <>
                    {/* Minimalist Static Waveform in the upper right background */}
                    <div className="absolute top-8 right-8 flex items-end gap-1.5 opacity-15 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
                      {waveformHeights.map((height, hIdx) => (
                        <div
                          key={hIdx}
                          style={{ height: `${height}px` }}
                          className="w-[3px] bg-[#800020]"
                        />
                      ))}
                    </div>

                    {/* Glowing Accent Top Border */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#800020] to-[#800020]/20 rounded-t-3xl" />
                  </>
                )}

                {/* 2. Top Meta details */}
                <div className="text-left">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="font-mono text-[10px] tracking-widest text-[#800020] uppercase font-bold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {org.years}
                    </span>

                    {org.is_choir ? (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-[#800020]/15 border border-[#800020]/30 font-mono text-[9px] uppercase tracking-widest text-[#800020] font-bold rounded-full">
                        <Trophy className="w-3 h-3 text-[#800020] mr-0.5" /> National Choir Award
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 font-mono text-[9px] uppercase tracking-widest text-gray-400 font-bold rounded-full">
                        <Compass className="w-3 h-3 text-gray-500 mr-0.5" /> General Event Leadership
                      </div>
                    )}
                  </div>

                  {/* Role Title */}
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#800020] transition-all duration-500">
                    {org.role}
                  </h3>

                  {/* Organization Name */}
                  <p className="font-mono text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-6 flex items-center gap-2">
                    {org.is_choir && <Music className="w-3.5 h-3.5 text-[#800020]" />}
                    {org.organization_name}
                  </p>

                  {/* Details Bullet Points */}
                  <ul className="flex flex-col gap-4">
                    {details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-[#800020] mt-1.5 rounded-full shrink-0" />
                        <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed">
                          {detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom luxury graphic marker */}
                <div className="w-full h-[1px] bg-white/5 mt-8 pt-4 flex justify-between items-center">
                  <span className="font-mono text-[8px] text-gray-600 tracking-widest">
                    {org.is_choir ? "CHORAL EXCELLENCE" : "ADMINISTRATIVE LEADERSHIP"}
                  </span>
                  {org.is_choir ? (
                    <Award className="w-4 h-4 text-[#800020] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                  ) : (
                    <Award className="w-4 h-4 text-gray-600 opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
