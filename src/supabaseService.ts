/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from './supabaseClient';
import { 
  Profile, 
  Tagline, 
  Education, 
  CompetencyCourse, 
  Project, 
  Organization, 
  OrganizationDetail
} from './types';
import { 
  fallbackProfile, 
  fallbackTaglines, 
  fallbackEducation, 
  fallbackCourses, 
  fallbackProjects, 
  fallbackOrganizations, 
  fallbackOrganizationDetails 
} from './fallbackData';


export function isSupabaseConnected(): boolean {
  return supabase !== null;
}


export async function getProfile(): Promise<Profile> {
  if (!supabase) return fallbackProfile;
  try {
    const { data, error } = await supabase
      .from('profile')
      .select('full_name, nickname, current_location, profile_image_url, linkedin_url, summary_text');
    
    if (error) {
      console.error("Error fetching profile, using fallback:", error.message);
      return fallbackProfile;
    }
    
    if (data && data.length > 0) {
      return data[0] as Profile;
    }
    return fallbackProfile;
  } catch (err) {
    console.error("Exception fetching profile, using fallback:", err);
    return fallbackProfile;
  }
}

export async function getTaglines(): Promise<Tagline[]> {
  if (!supabase) return fallbackTaglines;
  try {
    const { data, error } = await supabase
      .from('taglines')
      .select('tagline_text, display_order')
      .order('display_order', { ascending: true });
    
    if (error) {
      console.error("Error fetching taglines, using fallback:", error.message);
      return fallbackTaglines;
    }
    
    if (data && data.length > 0) {
      return data as Tagline[];
    }
    return fallbackTaglines;
  } catch (err) {
    console.error("Exception fetching taglines, using fallback:", err);
    return fallbackTaglines;
  }
}

export async function getEducation(): Promise<Education[]> {
  if (!supabase) return fallbackEducation;
  try {
    const { data, error } = await supabase
      .from('education')
      .select('id, institution_name, degree_or_major, start_year, end_year')
      .order('start_year', { ascending: false });
    
    if (error) {
      console.error("Error fetching education, using fallback:", error.message);
      return fallbackEducation;
    }
    
    if (data && data.length > 0) {
      return data as unknown as Education[];
    }
    return fallbackEducation;
  } catch (err) {
    console.error("Exception fetching education, using fallback:", err);
    return fallbackEducation;
  }
}

export async function getCompetencyCourses(): Promise<CompetencyCourse[]> {
  if (!supabase) return fallbackCourses;
  try {
    // DISESUAIKAN: Kolom deskripsi di database adalah course_description
    const { data, error } = await supabase
      .from('competency_courses')
      .select('id, course_name, course_description, education_id');
    
    if (error) {
      console.error("Error fetching competency courses, using fallback:", error.message);
      return fallbackCourses;
    }
    
    if (data && data.length > 0) {
      return data as unknown as CompetencyCourse[];
    }
    return fallbackCourses;
  } catch (err) {
    console.error("Exception fetching competency courses, using fallback:", err);
    return fallbackCourses;
  }
}

export async function getProjects(): Promise<Project[]> {
  if (!supabase) return fallbackProjects;
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('id, project_name, project_role, project_type, project_year, project_description, drive_link_url, thumbnail_image')
      .order('project_year', { ascending: false });
    
    if (error) {
      console.error("Error fetching projects, using fallback:", error.message);
      return fallbackProjects;
    }
    
    if (data && data.length > 0) {
      return data as Project[];
    }
    return fallbackProjects;
  } catch (err) {
    console.error("Exception fetching projects, using fallback:", err);
    return fallbackProjects;
  }
}

export async function getOrganizationsAndDetails(): Promise<{
  organizations: Organization[];
  detailsMap: Record<string | number, string[]>;
}> {
  if (!supabase) {
    return {
      organizations: fallbackOrganizations,
      detailsMap: mapDetails(fallbackOrganizationDetails)
    };
  }
  
  try {
    const { data: orgsData, error: orgsError } = await supabase
      .from('organizations')
      .select('id, organization_name, role_title, period, is_choir')
      .order('id', { ascending: true });
      
    if (orgsError) {
      console.error("Error fetching organizations, using fallback:", orgsError.message);
      return {
        organizations: fallbackOrganizations,
        detailsMap: mapDetails(fallbackOrganizationDetails)
      };
    }
    
    const { data: detailsData, error: detailsError } = await supabase
      .from('organization_details')
      .select('id, organization_id, detail_text');
      
    if (detailsError) {
      console.warn("Error fetching organization details, mapping only organizations:", detailsError.message);
    }
    
    const finalOrgs = orgsData && orgsData.length > 0 ? (orgsData as unknown as Organization[]) : fallbackOrganizations;
    const finalDetails = detailsData && detailsData.length > 0 ? (detailsData as OrganizationDetail[]) : fallbackOrganizationDetails;
    
    return {
      organizations: finalOrgs,
      detailsMap: mapDetails(finalDetails)
    };
  } catch (err) {
    console.error("Exception fetching organizations and details, using fallback:", err);
    return {
      organizations: fallbackOrganizations,
      detailsMap: mapDetails(fallbackOrganizationDetails)
    };
  }
}

function mapDetails(details: OrganizationDetail[]): Record<string | number, string[]> {
  const map: Record<string | number, string[]> = {};
  details.forEach(item => {
    if (!map[item.organization_id]) {
      map[item.organization_id] = [];
    }
    map[item.organization_id].push(item.detail_text);
  });
  return map;
}

export async function submitRating(visitorName: string, ratingValue: number): Promise<boolean> {
  if (!supabase) {
    console.log(`[Offline Simulation] Rating submitted: ${visitorName} rated ${ratingValue} stars`);
    const localRatings = JSON.parse(localStorage.getItem('local_website_ratings') || '[]');
    localRatings.push({ visitor_name: visitorName, rating_value: ratingValue });
    localStorage.setItem('local_website_ratings', JSON.stringify(localRatings));
    return true;
  }
  
  try {
    const { error } = await supabase
      .from('website_ratings')
      .insert([
        { visitor_name: visitorName, rating_value: ratingValue }
      ]);
      
    if (error) {
      console.error("Error inserting rating:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Exception submitting rating:", err);
    return false;
  }
}

export async function getAverageRating(): Promise<number> {
  if (!supabase) {
    const localRatings = JSON.parse(localStorage.getItem('local_website_ratings') || '[]');
    const allRatings = [4, 5, 5, 5, 4, 5, ...localRatings.map((r: any) => r.rating_value)];
    const sum = allRatings.reduce((acc, curr) => acc + curr, 0);
    return Number((sum / allRatings.length).toFixed(1));
  }
  
  try {
    const { data, error } = await supabase
      .from('website_ratings')
      .select('rating_value');
      
    if (error) {
      console.error("Error fetching rating average:", error.message);
      return 4.9;
    }
    
    if (data && data.length > 0) {
      const sum = data.reduce((acc, curr) => acc + (curr.rating_value || 0), 0);
      const avg = sum / data.length;
      return Number(avg.toFixed(1));
    }
    return 4.9;
  } catch (err) {
    console.error("Exception fetching rating average:", err);
    return 4.9;
  }
}