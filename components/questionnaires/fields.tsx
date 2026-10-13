import { ReactNode } from 'react'

export const inputClass =
  'w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-8">
      <h3 className="font-serif text-xl font-semibold">{title}</h3>
      <div className="mt-6 space-y-6">{children}</div>
    </section>
  )
}

export function Question({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-sm font-medium leading-6">{label}</p>
      {hint && <p className="mt-1 text-xs leading-5 text-muted-foreground">{hint}</p>}
      <div className="mt-3">{children}</div>
    </div>
  )
}

export function TextArea({
  value,
  onChange,
  required,
  rows = 4,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  required?: boolean
  rows?: number
  placeholder?: string
}) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      required={required}
      rows={rows}
      placeholder={placeholder}
      className={`${inputClass} resize-y`}
    />
  )
}

export function RadioList({
  name,
  options,
  value,
  onChange,
  required,
}: {
  name: string
  options: readonly string[]
  value: string
  onChange: (value: string) => void
  required?: boolean
}) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option} className="flex cursor-pointer items-start gap-3 rounded-md border border-border px-3 py-2.5 text-sm leading-6 hover:bg-secondary/60">
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            required={required}
            onChange={() => onChange(option)}
            className="mt-1 accent-[var(--primary)]"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  )
}

export function CheckboxList({
  options,
  values,
  onChange,
}: {
  options: readonly string[]
  values: string[]
  onChange: (values: string[]) => void
}) {
  function toggle(option: string) {
    onChange(values.includes(option) ? values.filter((item) => item !== option) : [...values, option])
  }

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option} className="flex cursor-pointer items-start gap-3 rounded-md border border-border px-3 py-2.5 text-sm leading-6 hover:bg-secondary/60">
          <input type="checkbox" checked={values.includes(option)} onChange={() => toggle(option)} className="mt-1 accent-[var(--primary)]" />
          <span>{option}</span>
        </label>
      ))}
    </div>
  )
}

export function Scale({
  name,
  value,
  onChange,
  labels,
}: {
  name: string
  value: number | null
  onChange: (value: number) => void
  labels?: { low: string; mid?: string; high: string }
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: 10 }, (_, index) => index + 1).map((score) => (
          <label
            key={score}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border text-sm font-medium ${
              value === score ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/50'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={score}
              required
              checked={value === score}
              onChange={() => onChange(score)}
              className="sr-only"
            />
            {score}
          </label>
        ))}
      </div>
      {labels && (
        <div className="mt-3 grid gap-2 text-xs leading-5 text-muted-foreground sm:grid-cols-3">
          <p>{labels.low}</p>
          {labels.mid && <p className="sm:text-center">{labels.mid}</p>}
          <p className="sm:text-right">{labels.high}</p>
        </div>
      )}
    </div>
  )
}

export function RankPicker({
  options,
  ranks,
  maxRank,
  onChange,
}: {
  options: readonly string[]
  ranks: Record<string, number>
  maxRank: number
  onChange: (ranks: Record<string, number>) => void
}) {
  function setRank(option: string, rank: number) {
    const next = { ...ranks }
    for (const key of Object.keys(next)) {
      if (next[key] === rank) delete next[key]
    }
    if (ranks[option] === rank) delete next[option]
    else next[option] = rank
    onChange(next)
  }

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option} className="flex flex-col gap-2 rounded-md border border-border px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6">{option}</p>
          <div className="flex shrink-0 gap-1">
            {Array.from({ length: maxRank }, (_, index) => index + 1).map((rank) => (
              <button
                key={rank}
                type="button"
                onClick={() => setRank(option, rank)}
                className={`h-8 w-8 rounded-md border text-xs font-semibold ${
                  ranks[option] === rank ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/50'
                }`}
                aria-label={`Rank ${rank} for ${option}`}
              >
                {rank}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
