'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { QuestionnaireType, VolunteerProfile } from '@/lib/questionnaire'
import { GraduateQuestionnaireForm } from './graduate-form'
import { StudentQuestionnaireForm } from './student-form'

type Props = {
  open: boolean
  type: QuestionnaireType | null
  profile: VolunteerProfile | null
  onClose: () => void
  onSubmitted: () => void
}

export function QuestionnaireModal({ open, type, profile, onClose, onSubmitted }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (!open) return
    setError(null)
    setSubmitting(false)
    setCompleted(false)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  if (!open || !type || !profile) return null

  const currentProfile = profile
  const currentType = type

  async function saveAnswers(answers: Record<string, unknown>) {
    setSubmitting(true)
    setError(null)

    try {
      await addDoc(collection(db, 'questionnaires'), {
        volunteerId: currentProfile.volunteerId,
        email: currentProfile.email,
        questionnaireType: currentType,
        answers,
        createdAt: serverTimestamp(),
      })
      try {
        await updateDoc(doc(db, 'volunteers', currentProfile.volunteerId), {
          questionnaireStatus: 'submitted',
          questionnaireType: currentType,
        })
      } catch (updateError) {
        console.error('Questionnaire saved, but volunteer record could not be updated:', updateError)
      }
      setCompleted(true)
      onSubmitted()
    } catch (saveError) {
      console.error('Error submitting questionnaire:', saveError)
      setError('We could not save your responses. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="questionnaire-title">
      <div className="my-6 w-full max-w-3xl rounded-md border border-border bg-card text-foreground shadow-lg">
        {completed ? (
          <div className="px-5 py-12 text-center sm:px-8">
            <CheckCircle2 className="mx-auto text-primary" size={40} />
            <h2 id="questionnaire-title" className="mt-5 font-serif text-2xl font-semibold">
              Thank you. Your responses have been received.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
              We are grateful for your time and honesty. We will follow up with the research session details using the contact information you shared.
            </p>
            <button type="button" onClick={onClose} className="mt-8 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="sticky top-0 z-10 border-b border-border bg-card px-5 py-4 sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Required questionnaire</p>
              <h2 id="questionnaire-title" className="mt-1 font-serif text-2xl font-semibold">
                Please complete this to finish volunteering
              </h2>
            </div>
            <div className="px-5 py-6 sm:px-8 sm:py-8">
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                Your volunteer details have been received. This questionnaire is a required part of the process and helps us understand your hopes, the barriers you face, and the support that would help most. There are no right answers—please be as honest as you can.
              </p>
              <div className="mt-8">
                {type === 'student' ? (
                  <StudentQuestionnaireForm profile={profile} onSubmit={saveAnswers} submitting={submitting} error={error} />
                ) : (
                  <GraduateQuestionnaireForm profile={profile} onSubmit={saveAnswers} submitting={submitting} error={error} />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
