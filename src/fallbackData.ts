/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Profile, Tagline, Education, CompetencyCourse, Project, Organization, OrganizationDetail } from './types';

export const fallbackProfile: Profile = {
  full_name: "Ziza Firsta Mahadewi",
  nickname: "Ziza",
  current_location: "Malang, Indonesia",
  profile_image_url: "/assets/images/ziza-profile.jpg",
  linkedin_url: "https://www.linkedin.com/in/zizafirsta/",
  summary_text: "An Informatics student with a strong interest in application development and UI/UX design, experienced in building mobile and web-based applications. Has contributed as a UI/UX designer and project manager in system development projects, demonstrating both technical understanding and project coordination skills. Actively involved in organizational activities, taking on roles as a coordinator and event leader, which have strengthened leadership, team management, and communication abilities. Also achieved recognition in national-level choir competitions, reflecting discipline and strong teamwork. Currently seeking internship opportunities to further develop technical skills and contribute to real-world projects in the IT field."
};

export const fallbackTaglines: Tagline[] = [
  { tagline_text: "Informatics Engineering Student (2023)", display_order: 1 },
  { tagline_text: "Software Engineering Enthusiast", display_order: 2 },
  { tagline_text: "Web & Mobile Development", display_order: 3 },
  { tagline_text: "Intelligent Systems", display_order: 4 }
];

export const fallbackEducation: Education[] = [
  {
    id: "edu-umm",
    institution_name: "Universitas Muhammadiyah Malang (UMM)",
    degree_or_major: "Bachelor of Informatics", // Diperbaiki dari 'degree'
    start_year: "2023",                         // Diperbaiki dari 'years'
    end_year: "now"                             // Tambahan sesuai struktur DB
  },
  {
    id: "edu-high",
    institution_name: "SMAN 2 Sumbawa Besar",
    degree_or_major: "Natural Science Major",   // Diperbaiki dari 'degree'
    start_year: "2020",                         // Diperbaiki dari 'years'
    end_year: "2023"                            // Tambahan sesuai struktur DB
  }
];

export const fallbackCourses: CompetencyCourse[] = [
  {
    id: "course-1",
    course_name: "Data Structures",
    course_description: "Understanding data organization and algorithm efficiency for problem solving.", // Diperbaiki dari 'description'
    education_id: "edu-umm"
  },
  {
    id: "course-2",
    course_name: "Object-Oriented Programming",
    course_description: "Developing applications using object-oriented concepts and structured programming approaches.", // Diperbaiki dari 'description'
    education_id: "edu-umm"
  },
  {
    id: "course-3",
    course_name: "Database Systems",
    course_description: "Designing and managing relational databases, including data modeling and query implementation.", // Diperbaiki dari 'description'
    education_id: "edu-umm"
  },
  {
    id: "course-4",
    course_name: "Web Programming",
    course_description: "Building web-based applications with focus on functionality and user experience.", // Diperbaiki dari 'description'
    education_id: "edu-umm"
  },
  {
    id: "course-5",
    course_name: "Mobile Programming",
    course_description: "Developing mobile applications with emphasis on interface and usability.", // Diperbaiki dari 'description'
    education_id: "edu-umm"
  },
  {
    id: "course-6",
    course_name: "Software Project Management",
    course_description: "Planning and managing software development projects, including team coordination and workflow management.", // Diperbaiki dari 'description'
    education_id: "edu-umm"
  }
];

export const fallbackProjects: Project[] = [
  {
    id: "project-1",
    project_name: "Nusantara Catering Website",
    project_role: "Project Manager & Initiator",
    project_type: "Project-Based",
    project_year: "2026",
    project_description: "Initiated and led the development of a catering service website. Managed project planning, task distribution, and team coordination. Contributed to system design and feature planning.",
    drive_link_url: "https://drive.google.com/drive/folders/1brD30tkLTgv3Z9-Wj4dDzxFmWBt1epi1?usp=sharing",
    thumbnail_image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "project-2",
    project_name: "Mobile App Gangnam Laundry",
    project_role: "UI/UX Designer",
    project_type: "Project-Based",
    project_year: "2025",
    project_description: "Designed user interface and user experience for a mobile-based laundry application. Developed user flow to improve usability and user interaction.",
    drive_link_url: "https://drive.google.com/drive/folders/1brD30tkLTgv3Z9-Wj4dDzxFmWBt1epi1?usp=sharing",
    thumbnail_image: "https://images.unsplash.com/photo-1521580881336-e64548ae5864?auto=format&fit=crop&q=80&w=800"
  }
];

export const fallbackOrganizations: Organization[] = [
  {
    id: "org-gitasurya-1",
    organization_name: "PSM \"GITASURYA\" UMM",
    role_title: "Coordinator of Membership Division", // Diperbaiki dari 'role'
    period: "2025 – 2026",                            // Diperbaiki dari 'years'
    is_choir: true
  },
  {
    id: "org-gitasurya-2",
    organization_name: "PSM \"GITASURYA\" UMM",
    role_title: "Public Relations Staff",              // Diperbaiki dari 'role'
    period: "2024 – 2025",                            // Diperbaiki dari 'years'
    is_choir: true
  },
  {
    id: "org-event-1",
    organization_name: "Event & Leadership Experience — Various Events",
    role_title: "Chief Organizer / Event Leader",     // Diperbaiki dari 'role'
    period: "2024 – 2025",                            // Diperbaiki dari 'years'
    is_choir: false
  }
];

export const fallbackOrganizationDetails: OrganizationDetail[] = [
  // Coordinator of Membership Division (org-gitasurya-1)
  {
    id: "detail-1",
    organization_id: "org-gitasurya-1",
    detail_text: "Led and coordinated membership programs and internal engagement activities."
  },
  {
    id: "detail-2",
    organization_id: "org-gitasurya-1",
    detail_text: "Managed communication between members and organizational divisions."
  },
  {
    id: "detail-3",
    organization_id: "org-gitasurya-1",
    detail_text: "Organized initiatives to improve member participation and retention."
  },
  // Public Relations Staff (org-gitasurya-2)
  {
    id: "detail-4",
    organization_id: "org-gitasurya-2",
    detail_text: "Supported external communication and organizational branding activities."
  },
  {
    id: "detail-5",
    organization_id: "org-gitasurya-2",
    detail_text: "Assisted in managing partnerships and event promotions."
  },
  // Chief Organizer (org-event-1)
  {
    id: "detail-6",
    organization_id: "org-event-1",
    detail_text: "Led planning and execution of major events including Dies Natalis and Diklatsar."
  },
  {
    id: "detail-7",
    organization_id: "org-event-1",
    detail_text: "Coordinated cross-division teams and ensured project timelines were met."
  },
  {
    id: "detail-8",
    organization_id: "org-event-1",
    detail_text: "Managed event operations to ensure successful implementation."
  }
];