import { FormEvent, useState } from 'react'
import {
  BUSINESS_ROADBLOCKS,
  CAREER_CHALLENGES,
  DOUBT_FREQUENCY,
  GRADUATE_STAGES,
  GRADUATE_SUPPORT_TYPES,
  VolunteerProfile,
  ranksToOrderedList,
} from '@/lib/questionnaire'
import { Question, RadioList, RankPicker, Scale, Section, TextArea, inputClass } from './fields'

type Props = {
  profile: VolunteerProfile
  onSubmit: (answers: Record<string, unknown>) => Promise<void>
  submitting: boolean
  error: string | null
}

export function GraduateQuestionnaireForm({ profile, onSubmit, submitting, error }: Props) {
  const [currentStage, setCurrentStage] = useState('')
  const [primaryDream, setPrimaryDream] = useState('')
  const [careerChallenge, setCareerChallenge] = useState('')
  const [academicConfidence, setAcademicConfidence] = useState<number | null>(null)
  const [doubtFrequency, setDoubtFrequency] = useState('')
  const [hasSafeSpace, setHasSafeSpace] = useState('')
  const [supportRanks, setSupportRanks] = useState<Record<string, number>>({})
  const [otherSupport, setOtherSupport] = useState('')
  const [improveCaliber, setImproveCaliber] = useState('')
  const [graduateProjects, setGraduateProjects] = useState('')
  const [employabilityGap, setEmployabilityGap] = useState('')
  const [equipGraduates, setEquipGraduates] = useState('')
  const [writtenCommunication, setWrittenCommunication] = useState<number | null>(null)
  const [verbalCommunication, setVerbalCommunication] = useState<number | null>(null)
  const [microsoftWord, setMicrosoftWord] = useState<number | null>(null)
  const [numeracyExcel, setNumeracyExcel] = useState<number | null>(null)
  const [criticalThinkingPowerpoint, setCriticalThinkingPowerpoint] = useState<number | null>(null)
  const [businessRoadblock, setBusinessRoadblock] = useState('')
  const [keyResource, setKeyResource] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  const isEntrepreneur = currentStage === 'Young Entrepreneur / Founder'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLocalError(null)

    if (Object.keys(supportRanks).length !== 4) {
      setLocalError('Please rank all four support types from most needed (1) to least needed (4).')
      return
    }

    await onSubmit({
      questionnaireType: 'graduate',
      profile: {
        name: profile.name,
        age: profile.age,
        educationalLevel: profile.educationalLevel,
        courseOfStudy: profile.courseOfStudy,
      },
      currentStage,
      primaryDream: primaryDream.trim(),
      careerChallenge,
      academicConfidence,
      doubtFrequency,
      hasSafeSpace,
      supportNeeded: ranksToOrderedList(supportRanks),
      otherSupport: otherSupport.trim(),
      improveCaliber: improveCaliber.trim(),
      graduateProjects: graduateProjects.trim(),
      employabilityGap: employabilityGap.trim(),
      equipGraduates: equipGraduates.trim(),
      skillAssessment: {
        writtenCommunication,
        verbalCommunication,
        microsoftWord,
        numeracyExcel,
        criticalThinkingPowerpoint,
      },
      entrepreneur: isEntrepreneur
        ? {
            businessRoadblock,
            keyResource: keyResource.trim(),
          }
        : null,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <p className="rounded-md bg-secondary px-4 py-3 text-sm leading-6 text-muted-foreground">
        Completing this as {profile.name}, {profile.educationalLevel}
        {profile.courseOfStudy ? ` · ${profile.courseOfStudy}` : ''}.
      </p>

      <Section title="Section 1: General background & aspirations">
        <Question label="Which category best describes your current stage?">
          <RadioList name="currentStage" options={GRADUATE_STAGES} value={currentStage} onChange={setCurrentStage} required />
        </Question>
        <Question label="What is your primary dream or core focus for the next 3 years?">
          <TextArea value={primaryDream} onChange={setPrimaryDream} required />
        </Question>
      </Section>

      <Section title="Section 2: Target-specific barriers">
        <Question label="What is the main challenge you face in starting your career or entering the workforce?">
          <RadioList name="careerChallenge" options={CAREER_CHALLENGES} value={careerChallenge} onChange={setCareerChallenge} required />
        </Question>
        <Question label="How confident are you in translating your academic background into a marketable skill set?">
          <Scale
            name="academic-confidence"
            value={academicConfidence}
            onChange={setAcademicConfidence}
            labels={{ low: '1 — Not confident', high: '10 — Very confident' }}
          />
        </Question>
      </Section>

      <Section title="Section 3: Mental health & mindset factors">
        <Question label="How often do self-doubt, fear of failure, or burnout delay your progress?">
          <select value={doubtFrequency} onChange={(event) => setDoubtFrequency(event.target.value)} required className={inputClass}>
            <option value="" disabled>
              Select an option
            </option>
            {DOUBT_FREQUENCY.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Question>
        <Question label="Do you feel you have a safe space or community to talk openly about career stress and personal struggles?">
          <div className="flex gap-3">
            {['Yes', 'No'].map((option) => (
              <label
                key={option}
                className={`flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2.5 text-sm ${hasSafeSpace === option ? 'border-primary bg-primary/5' : 'border-border'}`}
              >
                <input type="radio" name="hasSafeSpace" value={option} required checked={hasSafeSpace === option} onChange={() => setHasSafeSpace(option)} className="accent-[var(--primary)]" />
                {option}
              </label>
            ))}
          </div>
        </Question>
      </Section>

      <Section title="Section 4: Priority interventions">
        <Question label="Rank the following support types from most needed (1) to least needed (4).">
          <RankPicker options={GRADUATE_SUPPORT_TYPES} ranks={supportRanks} maxRank={4} onChange={setSupportRanks} />
        </Question>
        <Question label="Others" hint="If another kind of support would help, please list it here.">
          <TextArea value={otherSupport} onChange={setOtherSupport} rows={2} placeholder="Optional" />
        </Question>
      </Section>

      <Section title="Section 5: Capacity building">
        <Question label="To effectively transform Nigeria into a productive economy, what would you recommend to improve the calibre of young graduates from schools, right from secondary level through university?">
          <TextArea value={improveCaliber} onChange={setImproveCaliber} required />
        </Question>
        <Question label="What type of projects should graduates focus on for better impact?">
          <TextArea value={graduateProjects} onChange={setGraduateProjects} required />
        </Question>
        <Question label="Have you ever heard the cliché, “Nigerian graduates are not employable”? What should be done to address that gap in skills, if any?">
          <TextArea value={employabilityGap} onChange={setEmployabilityGap} required />
        </Question>
        <Question label="How do we better equip young graduates and get them ready for employment or life’s breakthrough?">
          <TextArea value={equipGraduates} onChange={setEquipGraduates} required />
        </Question>
      </Section>

      <Section title="Section 6: Skill assessment">
        <p className="text-sm leading-6 text-muted-foreground">Rate yourself from 1–10, with 10 being very proficient.</p>
        <Question label="Written communication">
          <Scale name="written-communication" value={writtenCommunication} onChange={setWrittenCommunication} />
        </Question>
        <Question label="Verbal communication">
          <Scale name="verbal-communication" value={verbalCommunication} onChange={setVerbalCommunication} />
        </Question>
        <Question label="Proficiency in Microsoft Word">
          <Scale name="microsoft-word" value={microsoftWord} onChange={setMicrosoftWord} />
        </Question>
        <Question label="Numeracy skill & Microsoft Excel">
          <Scale name="numeracy-excel" value={numeracyExcel} onChange={setNumeracyExcel} />
        </Question>
        <Question label="Critical thinking skill & PowerPoint">
          <Scale name="critical-thinking" value={criticalThinkingPowerpoint} onChange={setCriticalThinkingPowerpoint} />
        </Question>
      </Section>

      {isEntrepreneur && (
        <Section title="For young entrepreneurs">
          <Question label="What is currently the most critical roadblock for your business or project?">
            <RadioList name="businessRoadblock" options={BUSINESS_ROADBLOCKS} value={businessRoadblock} onChange={setBusinessRoadblock} required />
          </Question>
          <Question label="What key resource would instantly help you move your business to the next stage?">
            <TextArea value={keyResource} onChange={setKeyResource} required />
          </Question>
        </Section>
      )}

      {(localError || error) && <p className="text-sm text-destructive">{localError || error}</p>}

      <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
        <button type="submit" disabled={submitting} className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
          {submitting ? 'Sending…' : 'Share my responses'}
        </button>
      </div>
    </form>
  )
}
