/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import EducationComponent from './components/Education';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer';

import { 
  getProfile, 
  getTaglines, 
  getEducation, 
  getCompetencyCourses, 
  getProjects, 
  getOrganizationsAndDetails 
} from './supabaseService';

import { 
  Profile, 
  Tagline, 
  Education, 
  CompetencyCourse, 
  Project, 
  Organization 
} from './types';

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [taglines, setTaglines] = useState<Tagline[]>([]);
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [courses, setCourses] = useState<CompetencyCourse[]>([]);
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [detailsMap, setDetailsMap] = useState<Record<string | number, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAllPortfolioData() {
      try {
        // Run all queries asynchronously in parallel for premium load speeds
        const [
          profileData,
          taglinesData,
          educationData,
          coursesData,
          projectsData,
          orgsData
        ] = await Promise.all([
          getProfile(),
          getTaglines(),
          getEducation(),
          getCompetencyCourses(),
          getProjects(),
          getOrganizationsAndDetails()
        ]);

        setProfile(profileData);
        setTaglines(taglinesData);
        setEducationList(educationData);
        setCourses(coursesData);
        setProjectsList(projectsData);
        setOrganizations(orgsData.organizations);
        setDetailsMap(orgsData.detailsMap);
      } catch (err) {
        console.error("Fatal error loading portfolio datasets:", err);
      } finally {
        // A short loading pause to ensure the entrance animations are clean and smooth
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
      }
    }

    loadAllPortfolioData();
  }, []);

  return (
    <div id="portfolio-app-root" className="min-h-screen bg-[#0D0D0D] text-gray-200 selection:bg-[#800020] selection:text-white relative">
      <AnimatePresence mode="wait">
        {isLoading ? (
          /* Custom Premium Luxury Loading Intro Page */
          <motion.div
            id="loading-screen"
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#0D0D0D] z-[100] flex flex-col items-center justify-center"
          >
            <div className="relative flex flex-col items-center">
              {/* Spinning luxury circular ring */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="w-16 h-16 rounded-full border border-[#800020]/25 border-t-[#800020] mb-6"
              />
              
              {/* Elegant monogram monogram */}
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-4 font-serif text-lg font-bold tracking-tighter text-white"
              >
                ZF.
              </motion.span>

              {/* Minimalist subtitle */}
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gray-500">
                LOADING PORTFOLIO
              </span>
            </div>
          </motion.div>
        ) : (
          /* Full Application Layout */
          <motion.div
            id="portfolio-content"
            key="portfolio-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            {profile && (
              <>
                {/* 1. Header & Navigation */}
                <Header linkedinUrl={profile.linkedin_url} />

                {/* 2. Hero Section */}
                <Hero
                  fullName={profile.full_name}
                  location={profile.current_location}
                  profileImageUrl={profile.profile_image_url}
                  linkedinUrl={profile.linkedin_url}
                  taglines={taglines}
                />

                {/* 3. About & Summary Section */}
                <About summaryText={profile.summary_text} />

                {/* 4. Education & Coursework Section */}
                <EducationComponent
                  educationList={educationList}
                  courses={courses}
                />

                {/* 5. Featured Projects Bento Grid */}
                <Projects projects={projectsList} />

                {/* 6. Leadership & Organizational Experience */}
                <Experience
                  organizations={organizations}
                  detailsMap={detailsMap}
                />

                {/* 7. Footer, Contact & Star Rating */}
                <Footer linkedinUrl={profile.linkedin_url} />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
