// export function Spinner() {
//   return (
//     <div className="flex justify-center items-center py-16">
//       <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
//     </div>
//   )
// }

// export function EmptyState({ icon, title, description, action }) {
//   return (
//     <div className="flex flex-col items-center justify-center py-20 text-center">
//       <div className="text-6xl mb-4">{icon}</div>
//       <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
//       <p className="text-gray-400 mt-1 mb-6">{description}</p>
//       {action}
//     </div>
//   )
// }

import { Loader2, Database, AlertCircle } from 'lucide-react'

export function Spinner() {
  return (
    <div className="flex flex-col justify-center items-center py-24 gap-4">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-2 border-indigo-500/10 rounded-full" />
        
        {/* Animated Segment */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-indigo-500 rounded-full animate-spin shadow-[0_0_15px_rgba(79,70,229,0.4)]" />
        
        {/* The Pulsing Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(79,70,229,1)]" />
      </div>
      <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] animate-pulse">
        Initializing...
      </span>
    </div>
  )
}

export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in zoom-in duration-500">
      <div className="relative mb-8">
        {/* Background Glow for Icon */}
        <div className="absolute inset-0 bg-indigo-600/10 blur-[50px] rounded-full" />
        
        <div className="relative w-24 h-24 bg-white/[0.03] border border-white/5 rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl">
          <span className="grayscale opacity-80">{icon}</span>
        </div>
      </div>

      <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">
        {title}
      </h3>
      
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest max-w-xs leading-loose mb-10">
        {description}
      </p>

      <div className="relative group">
        {/* Action Button Highlight */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
        {action}
      </div>
    </div>
  )
}

// Bonus: Small Inline Loader for buttons
export function InlineLoader() {
  return <Loader2 className="w-4 h-4 animate-spin text-current" />
}