import { FormEvent, useState } from 'react'
import {
  EXTERNAL_BARRIERS,
  PERSONAL_FACTORS,
  STUDENT_SUPPORT_TYPES,
  VolunteerProfile,
  ranksToOrderedList,
} from '@/lib/questionnaire'
import { CheckboxList, Question, RankPicker, Scale, Section, TextArea, inputClass } from './fields'

type Props = {
  profile: VolunteerProfile
  onSubmit: (answers: Record<string, unknown>) => Promise<void>
  submitting: boolean
  error: string | null
}

export function StudentQuestionnaireForm({ profile, onSubmit, submitting, error }: Props) {
  const [name, setName] = useState(profile.name)
  const [age, setAge] = useState(String(profile.age))
  const [educationalLevel, setEducationalLevel] = useState(profile.educationalLevel)
  const [courseOfStudy, setCourseOfStudy] = useState(profile.courseOfStudy)
  const [biggestDream, setBiggestDream] = useState('')
  const [confidence, setConfidence] = useState<number | null>(null)
  const [skillGaps, setSkillGaps] = useState('')
  const [barrierRanks, setBarrierRanks] = useState<Record<string, number>>({})
  const [otherBarrier, setOtherBarrier] = useState('')
  const [fundingAttempt, setFundingAttempt] = useState('')
  const [personalFactors, setPersonalFactors] = useState<string[]>([])
  const [roadmap, setRoadmap] = useState('')
  const [hasMentor, setHasMentor] = useState('')
  const [supportRanks, setSupportRanks] = useState<Record<string, number>>({})
  const [overnightObstacle, setOvernightObstacle] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLocalError(null)

    if (Object.keys(barrierRanks).length !== 3) {
      setLocalError('Please rank your top 3 external barriers, with 1 as the most important.')
      return
    }
    if (barrierRanks.Other && !otherBarrier.trim()) {
      setLocalError('Please specify the other external barrier you ranked.')
      return
    }
    if (personalFactors.length === 0) {
      setLocalError('Please choose at least one personal or emotional factor.')
      return
    }
    if (Object.keys(supportRanks).length !== 3) {
      setLocalError('Please rank the top 3 types of support that would help most.')
      return
    }

    await onSubmit({
      questionnaireType: 'student',
      profile: {
        name: name.trim(),
        age: Number(age),
        educationalLevel,
        courseOfStudy: courseOfStudy.trim(),
      },
      biggestDream: biggestDream.trim(),
      confidence,
      skillGaps: skillGaps.trim(),
      externalBarriers: ranksToOrderedList(barrierRanks, otherBarrier.trim()),
      otherBarrier: otherBarrier.trim(),
      fundingAttempt: fundingAttempt.trim(),
      personalFactors,
      roadmap: roadmap.trim(),
      hasMentor,
      supportNeeded: ranksToOrderedList(supportRanks),
      overnightObstacle: overnightObstacle.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section>
        <h3 className="font-serif text-xl font-semibold">Your profile</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">We have filled this from your volunteer form. Please change anything that is not quite right.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Name
            <input value={name} onChange={(event) => setName(event.target.value)} required className={`${inputClass} mt-2`} />
          </label>
          <label className="text-sm font-medium">
            Age
            <input type="number" min={13} max={100} value={age} onChange={(event) => setAge(event.target.value)} required className={`${inputClass} mt-2`} />
          </label>
          <label className="text-sm font-medium">
            Educational level
            <input value={educationalLevel} onChange={(event) => setEducationalLevel(event.target.value)} required className={`${inputClass} mt-2`} />
          </label>
          <label className="text-sm font-medium">
            Course of study
            <input value={courseOfStudy} onChange={(event) => setCourseOfStudy(event.target.value)} required className={`${inputClass} mt-2`} />
          </label>
        </div>
      </section>

      <Section title="Section 1: Vision & aspirations">
        <Question label="What is your biggest dream or goal for the next 3 to 5 years?" hint="This could be about career, education, a creative project, a business, or something else that matters to you.">
          <TextArea value={biggestDream} onChange={setBiggestDream} required placeholder="Share as much as you feel comfortable with." />
        </Question>
        <Question label="On a scale of 1–10, how confident do you feel about your ability to achieve this dream with your current resources?">
          <Scale
            name="student-confidence"
            value={confidence}
            onChange={setConfidence}
            labels={{
              low: '1 — You feel a lot of doubt and experience fear',
              mid: '5 — You feel capable, but criticism can create self-doubt',
              high: '10 — You trust your abilities and have a calm mindset',
            }}
          />
        </Question>
        <Question label="Is there any known gap between your current skills and the ambition or vision you identified above?" hint="Please list the gaps, even if they feel small.">
          <TextArea value={skillGaps} onChange={setSkillGaps} required />
        </Question>
      </Section>

      <Section title="Section 2: External challenges & environmental barriers">
        <Question
          label="What is the single biggest external barrier currently holding you back?"
          hint="Select your top 3 in order of importance. Tap 1 for the most important, then 2 and 3."
        >
          <RankPicker options={EXTERNAL_BARRIERS} ranks={barrierRanks} maxRank={3} onChange={setBarrierRanks} />
          {barrierRanks.Other ? (
            <div className="mt-3">
              <TextArea value={otherBarrier} onChange={setOtherBarrier} rows={2} placeholder="Please specify the other barrier." />
            </div>
          ) : null}
        </Question>
        <Question label="Have you attempted to access funding, scholarships, or support programmes in the past year?" hint="If so, what was the outcome or the main difficulty you faced? If not, a short note is still helpful.">
          <TextArea value={fundingAttempt} onChange={setFundingAttempt} required />
        </Question>
      </Section>

      <Section title="Section 3: Internal & personal obstacles">
        <Question label="Which personal or emotional factors do you feel impact your progress the most?" hint="You may choose more than one.">
          <CheckboxList options={PERSONAL_FACTORS} values={personalFactors} onChange={setPersonalFactors} />
        </Question>
        <Question label="Do you feel you have a clear, actionable roadmap to reach your goal, or are you unsure of where to start?">
          <TextArea value={roadmap} onChange={setRoadmap} required />
        </Question>
      </Section>

      <Section title="Section 4: Guidance & support systems">
        <Question label="Do you currently have a mentor, role model, or advisor who helps guide your path?">
          <div className="flex gap-3">
            {['Yes', 'No'].map((option) => (
              <label
                key={option}
                className={`flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2.5 text-sm ${hasMentor === option ? 'border-primary bg-primary/5' : 'border-border'}`}
              >
                <input type="radio" name="hasMentor" value={option} required checked={hasMentor === option} onChange={() => setHasMentor(option)} className="accent-[var(--primary)]" />
                {option}
              </label>
            ))}
          </div>
        </Question>
        <Question
          label="What specific type of support would make the immediate biggest difference in your journey?"
          hint="Rank your top 3, with 1 as the most important."
        >
          <RankPicker options={STUDENT_SUPPORT_TYPES} ranks={supportRanks} maxRank={3} onChange={setSupportRanks} />
        </Question>
      </Section>

      <Section title="Section 5: Next steps">
        <Question label="If you could remove one single obstacle in your path overnight, which one would it be, and why?">
          <TextArea value={overnightObstacle} onChange={setOvernightObstacle} required />
        </Question>
      </Section>

      {(localError || error) && <p className="text-sm text-destructive">{localError || error}</p>}

      <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
        <button type="submit" disabled={submitting} className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
          {submitting ? 'Sending…' : 'Share my responses'}
        </button>
      </div>
    </form>
  )
}
