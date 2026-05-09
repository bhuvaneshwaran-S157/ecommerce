import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ShieldCheck, Lock, Mail, User, Phone, MapPin, Terminal } from 'lucide-react'

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await login(form)
      navigate('/')
    } catch (e) {
      setError(e.response?.data?.error || 'ACCESS DENIED: Invalid Credentials')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 w-full max-w-md shadow-2xl">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(79,70,229,0.4)]">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Initialize</h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Secure Personnel Access</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest px-4 py-3 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 group-focus-within:text-indigo-400 transition-colors">
              <Mail className="w-3 h-3" /> Email Hash
            </label>
            <input
              type="email" required
              value={form.email}
              onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-white font-mono text-sm focus:outline-none focus:border-indigo-500/40 transition-all placeholder:text-slate-700"
              placeholder="user@network.com"
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 group-focus-within:text-indigo-400 transition-colors">
              <Lock className="w-3 h-3" /> Keyphrase
            </label>
            <input
              type="password" required
              value={form.password}
              onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
              className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-white font-mono text-sm focus:outline-none focus:border-indigo-500/40 transition-all placeholder:text-slate-700"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-white text-black font-black uppercase text-xs tracking-[0.2em] py-5 rounded-2xl hover:bg-slate-200 active:scale-95 transition-all disabled:opacity-50 shadow-xl"
          >
            {loading ? 'Authenticating...' : 'Authorize Access'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            New operative? <Link to="/register" className="text-indigo-400 hover:text-white transition-colors">Create Identity</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', address: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await register(form)
      navigate('/')
    } catch (e) {
      setError(e.response?.data?.error || 'REGISTRATION FAILURE')
    } finally { setLoading(false) }
  }

  const renderField = (key, label, Icon, type = 'text', placeholder = '', required = false) => (
    <div className="group">
      <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 group-focus-within:text-indigo-400 transition-colors">
        <Icon className="w-3 h-3"/> {label}{required && ' *'}
      </label>
      <input
        type={type} required={required}
        value={form[key]}
        onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-white font-mono text-sm focus:outline-none focus:border-indigo-500/40 transition-all placeholder:text-slate-700"
      />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.05),transparent)] pointer-events-none" />

      <div className="relative bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 w-full max-w-2xl shadow-2xl">
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Create Identity</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Establish Network Presence</p>
          </div>
          <Terminal className="text-indigo-500/50 w-8 h-8 mb-2" />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest px-4 py-3 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {renderField('name', 'Alias', User, 'text', 'John Doe', true)}
            {renderField('email', 'Email Hash', Mail, 'email', 'you@network.com', true)}
            {renderField('password', 'Keyphrase', Lock, 'password', '••••••••', true)}
            {renderField('phone', 'Comms', Phone, 'tel', '+1 000 000 000')}
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 group-focus-within:text-indigo-400 transition-colors">
              <MapPin className="w-3 h-3" /> Deployment Address
            </label>
            <textarea
              value={form.address}
              onChange={(e) => setForm(f => ({ ...f, address: e.target.value }))}
              placeholder="Enter logistics coordinates..."
              rows={2}
              className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-white font-mono text-sm focus:outline-none focus:border-indigo-500/40 transition-all resize-none placeholder:text-slate-700"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-indigo-600 text-white font-black uppercase text-xs tracking-[0.2em] py-5 rounded-2xl hover:bg-indigo-500 active:scale-95 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
          >
            {loading ? 'Initializing...' : 'Confirm Registration'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Identity already exists? <Link to="/login" className="text-indigo-400 hover:text-white transition-colors">Authorize Here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}