export type QuestionnaireType = 'student' | 'graduate'

export type VolunteerProfile = {
  volunteerId: string
  name: string
  age: number
  educationalLevel: string
  courseOfStudy: string
  email: string
}

export const STUDENT_EDUCATION_LEVELS = ['Secondary school', 'Undergraduate'] as const

export function getQuestionnaireType(educationLevel: string): QuestionnaireType {
  return STUDENT_EDUCATION_LEVELS.includes(educationLevel as (typeof STUDENT_EDUCATION_LEVELS)[number])
    ? 'student'
    : 'graduate'
}

export const EXTERNAL_BARRIERS = [
  'Financial constraints / lack of funding',
  'Lack of access to quality education or training',
  'Limited professional network or connections',
  'Geographic location / lack of local opportunities',
  'Family responsibilities or expectations',
  'Lack of physical tools/technology (e.g., laptop, reliable internet, transportation)',
  'Other',
] as const

export const PERSONAL_FACTORS = [
  'Fear of failure or judgment from others',
  'Imposter syndrome / lack of self-confidence',
  'Difficulty with time management or burnout',
  'Uncertainty about the exact steps to take',
  'Mental health or personal well-being struggles',
] as const

export const STUDENT_SUPPORT_TYPES = [
  'Direct mentorship / professional coaching',
  'Micro-grants, scholarships, or financial aid',
  'Hands-on skill building / technical workshops',
  'Peer networking and collaborative communities',
  'Mindset and wellness support',
] as const

export const GRADUATE_STAGES = [
  'Secondary School Student',
  'University Student / Recent Graduate',
  'Young Entrepreneur / Founder',
] as const

export const CAREER_CHALLENGES = [
  'Job market entry requirements (e.g., "3+ years experience" for entry-level roles)',
  'Mismatch between degree/skills and available job opportunities',
  'Student debt or immediate financial pressure to take any job',
  'Lack of professional connections or industry referrals',
] as const

export const GRADUATE_SUPPORT_TYPES = [
  'Direct financial aid (grants, scholarships, funding)',
  'One-on-one mentorship from an industry professional',
  'Technical/skill-based workshops and resume/pitch reviews',
  'Peer networking and mastermind groups',
] as const

export const BUSINESS_ROADBLOCKS = [
  'Access to seed capital, loans, or investor networks',
  'Navigating legal regulations, taxes, or business registration',
  'Finding reliable team members, mentors, or advisors',
  'Market validation, acquiring customers, or scaling',
] as const

export const DOUBT_FREQUENCY = ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always'] as const

export function ranksToOrderedList(ranks: Record<string, number>, otherSpecify = '') {
  return Object.entries(ranks)
    .filter(([, rank]) => Number.isFinite(rank))
    .sort((a, b) => a[1] - b[1])
    .map(([option, rank]) => ({
      rank,
      option,
      ...(option === 'Other' && otherSpecify ? { specify: otherSpecify } : {}),
    }))
}
