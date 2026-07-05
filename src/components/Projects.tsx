/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowUpRight, FolderGit, Calendar } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section
      id="projects"
      className="relative bg-[#0D0D0D] py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      {/* Decorative luxury lines */}
      <div id="projects-horizontal-line" className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#800020]/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-left">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#800020]" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#800020] font-semibold">
                03 // WORKS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
              Selected Projects & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-[#800020]">
                Creative Deliverables.
              </span>
            </h2>
          </div>
          
          <p className="font-sans text-xs text-gray-500 max-w-xs leading-relaxed">
            A curated showcase of dynamic software architectures, interactive mobile designs, and structural system integrations.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              id={`project-card-${project.id}`}
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-[420px] rounded-3xl overflow-hidden border border-white/5 glass-card transition-all duration-500 hover:border-[#800020]/40 hover:shadow-[0_0_35px_rgba(128,0,32,0.25)] flex flex-col justify-end p-6 md:p-8"
            >
              {/* Background Thumbnail Image with custom zoom transition */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  id={`project-thumb-${project.id}`}
                  src={project.thumbnail_image}
                  alt={project.project_name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700 ease-out"
                />
                {/* Visual Dark Multi-gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/55 via-[#0D0D0D]/85 to-[#0D0D0D] group-hover:via-[#0D0D0D]/80 group-hover:to-[#0D0D0D] transition-all duration-500" />
              </div>

              {/* Card Meta details - Absolute top-right */}
              <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-black/60 border border-white/5 rounded-full font-mono text-[9px] tracking-wider text-gray-400">
                  <Calendar className="w-3.5 h-3.5 text-[#800020]" /> {project.project_year}
                </span>
              </div>

              {/* Content block */}
              <div className="relative z-10 flex flex-col items-start w-full text-left">
                {/* Role badge with Burgundy tint */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-[#800020]/20 border border-[#800020]/40 text-white font-mono text-[9px] uppercase tracking-widest font-semibold rounded-full">
                    {project.project_role}
                  </span>
                  <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-gray-400 font-mono text-[9px] uppercase tracking-widest rounded-full">
                    {project.project_type}
                  </span>
                </div>

                {/* Project Name */}
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#800020] transition-all duration-500">
                  {project.project_name}
                </h3>

                {/* Project Description */}
                <p className="font-sans text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-500 leading-relaxed mb-6 line-clamp-3">
                  {project.project_description}
                </p>

                {/* Hover button: View Documentation & Assets */}
                <a
                  id={`project-btn-${project.id}`}
                  href={project.drive_link_url}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-between border border-[#800020]/50 text-white font-sans text-[10px] font-semibold uppercase tracking-[0.2em] py-3 px-5 rounded-full overflow-hidden relative group/btn transition-all duration-500 hover:border-[#800020] hover:bg-[#800020]/10"
                >
                  <span className="flex items-center gap-2">
                    <FolderGit className="w-3.5 h-3.5 text-[#800020]" />
                    <span>View Materials & Assets</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover/btn:text-white transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
