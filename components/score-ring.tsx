"use client"

const CIRCUMFERENCE = 2 * Math.PI * 54

export function ScoreRing({ score }: { score: number }) {
  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE
  const color = score >= 70 ? "#6fbf8f" : score >= 45 ? "#e8a33d" : "#e0645a"

  return (
    <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="currentColor"
          className="text-muted"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span
          className="font-display text-4xl font-medium italic"
          style={{ color }}
        >
          {score}
        </span>
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          compat.
        </span>
      </div>
    </div>
  )
}
