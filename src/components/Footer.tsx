/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Linkedin, Github, Mail, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { submitRating, getAverageRating } from '../supabaseService';

interface FooterProps {
  linkedinUrl: string;
}

export default function Footer({ linkedinUrl }: FooterProps) {
  // 1. Interactive Rating States
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [averageScore, setAverageScore] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchInitialAverage = async () => {
      try {
        const avg = await getAverageRating();
        setAverageScore(avg);
      } catch (err) {
        console.error("Failed to load initial average rating:", err);
      }
    };
    fetchInitialAverage();
  }, []);

  const handleStarClick = (value: number) => {
    if (isSubmitted) return;
    setRating(value);
    setIsFormOpen(true);
    setErrorMsg('');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim()) {
      setErrorMsg('Please enter a valid name to complete your rating.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const success = await submitRating(visitorName.trim(), rating);
      if (success) {
        // Fetch new math average asynchronously
        const newAvg = await getAverageRating();
        setAverageScore(newAvg);
        setIsSubmitted(true);
        setIsFormOpen(false);
      } else {
        setErrorMsg('Database submission timed out. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('A connection error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      id="footer"
      className="relative bg-[#0D0D0D] border-t border-[#800020]/25 pt-20 pb-12 px-6 md:px-12 text-center"
    >
      {/* Background vector lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80002005_1px,transparent_1px)] bg-[size:100%_40px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Recruiter Call-to-Action */}
        <div className="max-w-xl mb-12 text-center">
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#800020] uppercase font-bold mb-3 block">
            // COLLABORATION OPPORTUNITIES
          </span>
          <h3 className="font-serif text-2xl md:text-3xl font-medium text-white mb-4 leading-tight">
            Seeking an Impact-Driven <br />
            <span className="text-[#800020] font-semibold">Informatics Engineering</span> Intern?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
            I am actively looking for software engineering, web/mobile development, or intelligent systems internship roles in the IT field starting in 2026. Let's sync and build high-performance products together.
          </p>
        </div>

        {/* Sleek Social Media Connections */}
        <div className="flex items-center gap-6 mb-16">
          <a
            id="footer-social-linkedin"
            href={linkedinUrl}
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-12 h-12 rounded-full border border-[#800020]/30 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#800020] hover:bg-[#800020]/10 transition-all duration-500 hover:scale-110"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            id="footer-social-github"
            href="https://github.com/firstadewi"
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-12 h-12 rounded-full border border-[#800020]/30 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#800020] hover:bg-[#800020]/10 transition-all duration-500 hover:scale-110"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            id="footer-social-email"
            href="mailto:firstadewi14@gmail.com"
            aria-label="Email"
            className="w-12 h-12 rounded-full border border-[#800020]/30 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#800020] hover:bg-[#800020]/10 transition-all duration-500 hover:scale-110"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Interactive "Rate My Website" Module */}
        <div
          id="ratings-module"
          className="w-full max-w-md glass-card rounded-3xl p-6 md:p-8 mb-16 relative burgundy-glow"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-[#0D0D0D] border border-[#800020]/30 font-mono text-[8px] tracking-widest text-gray-500 uppercase rounded-full">
            VISITOR FEEDBACK
          </div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="rating-input-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center"
              >
                <p className="font-serif text-sm md:text-base text-gray-200 mb-4 font-medium">
                  How do you like my portfolio? Leave a rating!
                </p>

                {/* Star Row */}
                <div className="flex items-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((starValue) => {
                    const isLit = starValue <= (hoveredRating || rating);
                    return (
                      <button
                        id={`star-btn-${starValue}`}
                        key={starValue}
                        type="button"
                        onClick={() => handleStarClick(starValue)}
                        onMouseEnter={() => setHoveredRating(starValue)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="p-1 cursor-pointer transition-transform active:scale-95 duration-200"
                        aria-label={`Rate ${starValue} Stars`}
                      >
                        <Star
                          className={`w-6 sm:w-7 h-6 sm:h-7 transition-all duration-300 ${
                            isLit
                              ? 'fill-[#800020] text-[#ff4d6d] filter drop-shadow-[0_0_6px_rgba(128,0,32,0.6)]'
                              : 'text-neutral-700 hover:text-gray-400'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Name Form Sub-container */}
                <AnimatePresence>
                  {isFormOpen && (
                    <motion.form
                      id="rating-name-form"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleFormSubmit}
                      className="w-full flex flex-col items-center overflow-hidden"
                    >
                      <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 mb-2">
                        Please enter your name to submit your rating
                      </label>
                      <div className="w-full flex items-center gap-2 max-w-xs mb-2">
                        <input
                          id="rating-name-input"
                          type="text"
                          required
                          value={visitorName}
                          onChange={(e) => setVisitorName(e.target.value)}
                          placeholder="Your Name"
                          disabled={isSubmitting}
                          className="flex-1 bg-black/60 border border-[#800020]/40 px-4 py-2 text-xs text-white placeholder-gray-600 rounded-full focus:outline-none focus:border-[#800020] transition-colors"
                        />
                        <button
                          id="rating-submit-btn"
                          type="submit"
                          disabled={isSubmitting}
                          className="p-2.5 bg-[#800020] hover:bg-[#A30029] text-white rounded-full cursor-pointer disabled:opacity-50 transition-colors shrink-0"
                          aria-label="Submit Rating"
                        >
                          {isSubmitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {errorMsg && (
                        <p className="font-mono text-[10px] text-red-500 mt-1">
                          {errorMsg}
                        </p>
                      )}
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="rating-success-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center py-2"
              >
                <CheckCircle2 className="w-8 h-8 text-[#800020] mb-3 animate-bounce" />
                <p className="font-serif text-sm text-gray-200 font-medium mb-4">
                  Thank you, {visitorName}! Your rating has been received.
                </p>

                {averageScore !== null && (
                  <div className="pt-4 border-t border-white/5 w-full">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500 block mb-1">
                      CURRENT PORTFOLIO SCORE
                    </span>
                    <span
                      id="average-rating-display"
                      className="font-serif text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#800020] to-white tracking-wider filter drop-shadow-[0_0_10px_rgba(128,0,32,0.5)]"
                    >
                      {averageScore} / 5.0
                    </span>
                    <div className="flex items-center justify-center gap-1 mt-1 text-[#800020]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 fill-[#800020] text-[#ff4d6d]" />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tiny Copyright & Platform Credit */}
        <p className="font-mono text-[9px] tracking-widest text-gray-600 uppercase">
          © 2026 Ziza Firsta Mahadewi. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}
