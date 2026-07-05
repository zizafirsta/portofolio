/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, BookOpen, Calendar, MapPin } from 'lucide-react';
import { Education, CompetencyCourse } from '../types';

interface EducationProps {
  educationList: Education[];
  courses: CompetencyCourse[];
}

export default function EducationComponent({ educationList, courses }: EducationProps) {
  const [expandedCourse, setExpandedCourse] = useState<string | number | null>(null);

  // Memisahkan data UMM dan SMAN berdasarkan pencocokan nama institusi
  const ummEdu = educationList.find(e => e.institution_name.toLowerCase().includes('muhammadiyah')) || educationList[0];
  const highSchoolEdu = educationList.find(e => e.institution_name.toLowerCase().includes('sman')) || educationList[1];

  const handleCourseClick = (courseId: string | number) => {
    setExpandedCourse(prev => (prev === courseId ? null : courseId));
  };

  return (
    <section
      id="education"
      className="relative bg-[#0D0D0D] py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      {/* Background elegant circles */}
      <div className="absolute top-[30%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#800020]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-start mb-16 text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#800020]" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#800020] font-semibold">
              02 // ACADEMICS
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
            Academic Pathways &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-[#800020]">
              Informatics Competency.
            </span>
          </h2>
        </div>

        {/* Minimal Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto mt-12 pl-8 md:pl-12 text-left">
          
          {/* Main vertical line track */}
          <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-neutral-800" />
          
          {/* Animated active path that lights up on view */}
          <motion.div
            id="timeline-indicator-track"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute left-0 top-2 w-[2px] bg-[#800020] origin-top"
          />

          {/* 1. UMM CARD ENTRY */}
          {ummEdu && (
            <motion.div
              id="timeline-node-umm"
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="relative mb-20 group"
            >
              {/* Timeline dynamic dot */}
              <motion.div
                whileInView={{ backgroundColor: '#800020', borderColor: '#ff4d6d' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="absolute left-[-38px] md:left-[-54px] top-1.5 w-4 h-4 rounded-full bg-neutral-900 border-2 border-neutral-700 z-10 shadow-[0_0_10px_rgba(0,0,0,0.8)]"
              />

              {/* Institution Content Block */}
              <div className="pl-4 md:pl-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] tracking-widest text-[#800020] uppercase font-bold flex items-center gap-1.5">
                    {/* MODIFIKASI: Menyelaraskan nama properti pemanggil tahun sesuai skema SQL DB */}
                    <Calendar className="w-3.5 h-3.5" /> {ummEdu.start_year} — {ummEdu.end_year}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-gray-500 uppercase flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Malang, Indonesia
                  </span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#800020] transition-colors duration-500">
                  {ummEdu.institution_name}
                </h3>
                <p className="font-sans text-sm md:text-base text-gray-400 mt-1 font-medium italic">
                  {/* MODIFIKASI: Menyelaraskan pemanggil nama jurusan/gelar sesuai skema SQL DB */}
                  {ummEdu.degree_or_major}
                </p>

                <div className="h-[1px] w-1/4 bg-[#800020]/20 my-6" />

                {/* Course Competencies Accordion Module */}
                <div className="mt-6 glass-card rounded-3xl p-6 md:p-8 burgundy-glow max-w-3xl">
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="w-4 h-4 text-[#800020]" />
                    <h4 className="font-mono text-[11px] tracking-widest text-gray-300 uppercase font-semibold">
                      Featured Informatics Coursework
                    </h4>
                  </div>

                  <div className="flex flex-col gap-3">
                    {courses.map((course) => {
                      const isExpanded = expandedCourse === course.id;
                      return (
                        <div
                          id={`course-item-${course.id}`}
                          key={course.id}
                          className="border-b border-white/5 last:border-0 pb-3 last:pb-0 transition-colors duration-300"
                        >
                          <button
                            id={`course-trigger-${course.id}`}
                            onClick={() => handleCourseClick(course.id)}
                            className="w-full flex items-center justify-between text-left py-3 cursor-pointer group/btn"
                          >
                            <span className="font-serif text-sm sm:text-base font-medium text-gray-300 group-hover/btn:text-white transition-colors duration-300">
                              {course.course_name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-widest text-gray-500 group-hover/btn:text-gray-400">
                                {isExpanded ? "Collapse" : "Explore"}
                              </span>
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-[#800020]" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-500 group-hover/btn:text-white transition-colors" />
                              )}
                            </div>
                          </button>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                id={`course-desc-${course.id}`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                              >
                                <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed pb-4 pl-1">
                                  {/* MODIFIKASI: Menyelaraskan teks penampung deskripsi penjelasan subjek kuliah sesuai skema SQL DB */}
                                  {course.course_description}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. HIGH SCHOOL CARD ENTRY */}
          {highSchoolEdu && (
            <motion.div
              id="timeline-node-high"
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              {/* Timeline dynamic dot */}
              <motion.div
                whileInView={{ backgroundColor: '#800020', borderColor: '#ff4d6d' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="absolute left-[-38px] md:left-[-54px] top-1.5 w-4 h-4 rounded-full bg-neutral-900 border-2 border-neutral-700 z-10 shadow-[0_0_10px_rgba(0,0,0,0.8)]"
              />

              <div className="pl-4 md:pl-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] tracking-widest text-[#800020] uppercase font-bold flex items-center gap-1.5">
                    {/* MODIFIKASI: Menyelaraskan nama properti pemanggil tahun sesuai skema SQL DB */}
                    <Calendar className="w-3.5 h-3.5" /> {highSchoolEdu.start_year} — {highSchoolEdu.end_year}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-gray-500 uppercase flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Sumbawa Besar, Indonesia
                  </span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#800020] transition-colors duration-500">
                  {highSchoolEdu.institution_name}
                </h3>
                <p className="font-sans text-sm md:text-base text-gray-400 mt-1 font-medium italic">
                  {/* MODIFIKASI: Menyelaraskan pemanggil nama jurusan/gelar sesuai skema SQL DB */}
                  {highSchoolEdu.degree_or_major}
                </p>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}