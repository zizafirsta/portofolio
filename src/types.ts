/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Profile {
  full_name: string;
  nickname: string;
  current_location: string;
  profile_image_url: string;
  linkedin_url: string;
  summary_text: string;
}

export interface Tagline {
  id?: string | number;
  tagline_text: string;
  display_order: number;
}

export interface Education {
  id: string | number;
  institution_name: string;
  degree_or_major: string; // Diperbaiki dari 'degree'
  start_year: string;       // Diperbaiki dari 'years'
  end_year: string;         // Tambahan sesuai struktur DB
}

export interface CompetencyCourse {
  id: string | number;
  course_name: string;
  course_description: string; // Diperbaiki dari 'description'
  education_id: string | number;
}

export interface Project {
  id: string | number;
  project_name: string;
  project_role: string;
  project_type: string;
  project_year: string | number;
  project_description: string;
  drive_link_url: string;
  thumbnail_image: string;
}

export interface Organization {
  id: string | number;
  organization_name: string;
  role_title: string; // Diperbaiki dari 'role'
  period: string;     // Diperbaiki dari 'years'
  is_choir: boolean;
}

export interface OrganizationDetail {
  id: string | number;
  organization_id: string | number;
  detail_text: string;
}

export interface WebsiteRating {
  id?: string | number;
  visitor_name: string;
  rating_value: number;
  created_at?: string;
}