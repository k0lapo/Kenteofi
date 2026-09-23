'use client'

import { FormEvent, ReactNode, useState } from 'react'
import { ArrowRight, CheckCircle2, Clock3, Mail, MapPin, Menu, Phone, Users, X } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const scheduleOptions = [
  'Session 1 · 16th Sept · 12:00–1:00pm',
  'Session 2 · 16th Sept · 1:00–2:00pm',
  'Session 3 · 16th Sept · 2:00–3:00pm',
  'Session 4 · 17th Sept · 12:00–1:00pm',
  'Session 5 · 17th Sept · 1:00–2:00pm',
]
const educationOptions = ['Secondary school', 'Diploma / NCE', 'Undergraduate', 'Bachelor’s degree', 'Master’s degree', 'Doctorate', 'Other']

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formElement = event.currentTarget

    setStatus('loading')

    const form = new FormData(formElement)
    const rawPayload = Object.fromEntries(form.entries())

    const volunteerData = {
      firstName: String(rawPayload.firstName).trim(),
      lastName: String(rawPayload.lastName).trim(),
      age: Number(rawPayload.age),
      sex: String(rawPayload.sex),
      email: String(rawPayload.email).trim().toLowerCase(),
      whatsappNumber: String(rawPayload.whatsappNumber).trim(),
      university: String(rawPayload.university).trim(),
      courseStudied: String(rawPayload.courseStudied).trim(),
      educationLevel: String(rawPayload.educationLevel),
      convenientTime: String(rawPayload.convenientTime),
      message: String(rawPayload.message || '').trim(),
      createdAt: serverTimestamp(),
      status: 'pending',
    }

    try {
      await addDoc(collection(db, 'volunteers'), volunteerData)

      setStatus('success')
      formElement.reset()
    } catch (error) {
      console.error('Error submitting form to Firebase:', error)
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/95">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10" aria-label="Main navigation">
          <a href="#top" aria-label="Kenteofi home">
            <img src="/kenteofi-logo.png" alt="Kenteofi" className="h-14 w-32 object-contain" />
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#about" className="hover:text-primary">About</a>
            <a href="#research" className="hover:text-primary">Research</a>
            <a href="#contact" className="hover:text-primary">Contact</a>
            <a href="#volunteer" className="rounded-md bg-primary px-5 py-3 text-primary-foreground hover:bg-primary/90">Volunteer</a>
          </div>
          <button className="rounded-md border border-border p-2 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        {menuOpen && (
          <div className="border-t border-border bg-card px-6 py-5 md:hidden">
            <div className="flex flex-col gap-4 text-sm">
              <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
              <a href="#research" onClick={() => setMenuOpen(false)}>Research</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
              <a href="#volunteer" onClick={() => setMenuOpen(false)}>Volunteer</a>
            </div>
          </div>
        )}
      </header>

      <section id="top" className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Supporting excellence in pioneers of tomorrow</p>
          <h1 className="mt-5 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-pretty sm:text-6xl lg:text-7xl">
            Catalyzing systemic change. Building <span className="text-primary">talents.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
            Kenteofi is a youth-centred NGO committed to improving capacity and preparing talents for significant contributions to socio economic transformation.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#volunteer" className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 font-semibold text-primary-foreground hover:bg-primary/90">
              Join the research <ArrowRight size={18} />
            </a>
            <a href="#about" className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3.5 font-semibold hover:bg-secondary">
              Learn about us
            </a>
          </div>
          <div className="mt-12 border-t border-border pt-6">
            <p className="max-w-lg text-sm leading-6 text-muted-foreground">
              We believe preparation is part of celebration: when people have the right support, skills, and confidence, potentials can be harnessed.
            </p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md">
          <div className="overflow-hidden border border-border bg-card p-3 shadow-sm">
            <img src="/kenteofi-research-flyer.png" alt="Kenteofi research flyer inviting alumni to share their voice about closing skill gaps" className="h-auto w-full object-cover" />
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">An invitation to share experience and help shape better opportunities for young Nigerians.</p>
        </div>
      </section>

      <section id="about" className="border-y border-border bg-secondary py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">About Kenteofi</p>
              <h2 className="mt-4 max-w-md font-serif text-4xl font-semibold leading-tight text-balance sm:text-5xl">Building capacity for socio economic transformation</h2>
            </div>
            <div className="space-y-6 text-base leading-8 text-muted-foreground">
              <p>
                Kente and ofi are garments associated with identity, dignity, achievement, and important landmarks. Kenteofi carries that meaning into social impact: we work so that more people can gain the knowledge, practical abilities, and confidence needed to reach their own milestones.
              </p>
              <p>
                We are a Nigeria-led NGO dedicated to solving societal challenges by bridging the gap between potential and opportunity through strategic investment in human capital.
              </p>
              <p>
                The aim is to catalyze systemic change across Nigeria by supporting excellence in pioneers of tomorrow, ensuring that Nigerian talent is at the forefront of global problem-solving.
              </p>
              <p>
                Our aim is to foster home-grown solutions for sustainable development by investing in the nation's greatest resource—its people—to cultivate the intellectual leadership required to solve our most pressing societal challenges and ensure the brightest Nigerian minds have the capital they need to lead us into the future.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-10 border-t border-border pt-10 lg:grid-cols-2">
            <div>
              <h3 className="font-serif text-2xl font-semibold">The purpose of this research</h3>
              <div className="mt-5 space-y-5 text-base leading-8 text-muted-foreground">
                <p>
                  Our work is rooted in listening. It is essential to learn from students, graduates, professionals, families, and communities to understand where education and everyday life do not yet meet.
                </p>
                <p>This is important to design and implement initiatives to maximize human capital achievement.</p>
                <p>
                  This research aims to bring together people from different educational backgrounds to share honest experiences. Specifically, your information may be used to understand skill gaps and design programmes that better prepare young Nigerians for life beyond the classroom.
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-semibold">How the information provided will be used and stored</h3>
              <div className="mt-5 space-y-5 text-base leading-8 text-muted-foreground">
                <p>We use the information collected to design and implement initiatives that maximize human capital achievement.</p>
                <p>
                  Data is anonymous once submitted, personal data will be protected; used only in this research. All data will be confidential and anonymity preserved.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-8 border-t border-border pt-8 sm:grid-cols-3">
            <div>
              <Users className="text-primary" size={22} />
              <h3 className="mt-4 font-semibold">People first</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">We listen to lived experiences before designing solutions.</p>
            </div>
            <div>
              <CheckCircle2 className="text-primary" size={22} />
              <h3 className="mt-4 font-semibold">Practical growth</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">We connect learning to skills people can use in real life.</p>
            </div>
            <div>
              <Clock3 className="text-primary" size={22} />
              <h3 className="mt-4 font-semibold">Long Term Readiness</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">We help build confidence and capacity for better life outcomes and socio economic impact.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="research" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Online Research</p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-tight text-balance sm:text-5xl">Your experience can help design realistic solutions</h2>
          </div>
          <p className="max-w-lg text-base leading-7 text-muted-foreground">
            We are inviting thoughtful contributors to discuss what school teaches, what life demands and how to better equip young people for the future.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          <div className="border-t-2 border-primary pt-5">
            <Clock3 className="text-primary" size={24} />
            <h3 className="mt-7 font-semibold">A focused conversation</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">A guided online session planned around your availability.</p>
          </div>
          <div className="border-t-2 border-primary pt-5">
            <Users className="text-primary" size={24} />
            <h3 className="mt-7 font-semibold">Many perspectives</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Different disciplines and life paths help reveal the full picture.</p>
          </div>
          <div className="border-t-2 border-primary pt-5">
            <CheckCircle2 className="text-primary" size={24} />
            <h3 className="mt-7 font-semibold">A useful contribution</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Your voice will inform meaningful interventions, not disappear into a report.</p>
          </div>
        </div>
        <div className="mt-14 border-t border-border pt-10">
          <h3 className="font-serif text-2xl font-semibold">Possible timelines</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Choose the session that works best for you when you volunteer below.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {scheduleOptions.map((session) => (
              <div key={session} className="border border-border bg-card p-4">
                <Clock3 className="text-primary" size={18} />
                <p className="mt-3 text-sm font-medium leading-6">{session}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="volunteer" className="bg-primary px-6 py-20 text-primary-foreground lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
          <div className="lg:sticky lg:top-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">Volunteer</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-balance sm:text-5xl">Add your voice to the conversation.</h2>
            <p className="mt-5 max-w-sm leading-7 text-primary-foreground/75">Tell us a little about yourself and choose a convenient time. We will follow up with the research session details.</p>
          </div>
          <form onSubmit={handleSubmit} className="rounded-md bg-card p-6 text-foreground shadow-sm sm:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="First name" name="firstName" required />
              <Field label="Last name" name="lastName" required />
              <Field label="Age" name="age" type="number" min="13" max="100" required />
              <SelectField label="Sex" name="sex" options={['Female', 'Male', 'Prefer not to say', 'Other']} required />
              <Field label="Email address" name="email" type="email" required />
              <Field label="WhatsApp number" name="whatsappNumber" type="tel" required />
              <Field label="University / institution" name="university" required />
              <Field label="Course studied" name="courseStudied" required />
              <SelectField label="Level of education attained" name="educationLevel" options={educationOptions} required />
              <SelectField label="Convenient day and time" name="convenientTime" options={scheduleOptions} required />
            </div>
            <div className="mt-6">
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                Anything you’d like us to know <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <textarea id="message" name="message" rows={4} className="w-full resize-y rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </div>
            <button type="submit" disabled={status === 'loading'} className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-5 py-3.5 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
              {status === 'loading' ? 'Sending…' : 'Submit volunteer interest'}
            </button>
            {status === 'success' && <p className="mt-4 text-sm text-primary">Thank you. We will be in touch with the research session details.</p>}
            {status === 'error' && <p className="mt-4 text-sm text-destructive">We could not submit your details. Please try again or contact us directly.</p>}
          </form>
        </div>
      </section>

      <section id="contact" className="border-t border-border bg-card px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Contact Kenteofi</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold">Let’s keep the conversation going.</h2>
              <p className="mt-4 max-w-md leading-7 text-muted-foreground">Our contact details are being finalised. The placeholders below can be replaced with your official information.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <ContactItem icon={<Mail size={20} />} label="Email" value="volunteer@kenteofi.com" />
              <ContactItem icon={<Phone size={20} />} label="Phone / WhatsApp" value="+234 805 211 9298" />
              <ContactItem icon={<MapPin size={20} />} label="Address" value="Lagos, Nigeria" />
              <ContactItem icon={<Users size={20} />} label="Enquiries" value="Research and partnership enquiries welcome" />
            </div>
          </div>
        </div>
      </section>
      <footer className="border-t border-border bg-background px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <img src="/kenteofi-logo.png" alt="Kenteofi" className="h-12 w-28 object-contain" />
          <p className="text-sm text-muted-foreground">Catalyzing systemic change. Building talents.</p>
        </div>
      </footer>
    </main>
  )
}

function ContactItem({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-4 border-t border-border pt-4">
      <span className="text-primary">{icon}</span>
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}

function Field({ label, name, type = 'text', min, max, required }: { label: string; name: string; type?: string; min?: string; max?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}{required && <span className="text-primary"> *</span>}
      </label>
      <input id={name} name={name} type={type} min={min} max={max} required={required} className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </div>
  )
}

function SelectField({ label, name, options, required }: { label: string; name: string; options: string[]; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}{required && <span className="text-primary"> *</span>}
      </label>
      <select id={name} name={name} required={required} defaultValue="" className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
        <option value="" disabled>Select an option</option>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </div>
  )
}
