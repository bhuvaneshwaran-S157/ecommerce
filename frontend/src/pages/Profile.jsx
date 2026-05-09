// import { useState } from 'react'
// import { useAuth } from '../context/AuthContext'
// import { userApi } from '../api'
// import { Link } from 'react-router-dom'
// import { User, Save } from 'lucide-react'
// import toast from 'react-hot-toast'

// export default function Profile() {
//   const { user, updateUser } = useAuth()
//   const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', address: user?.address || '' })
//   const [loading, setLoading] = useState(false)

//   if (!user) return (
//     <div className="text-center py-20">
//       <Link to="/login" className="text-indigo-600 underline">Login</Link> to view your profile
//     </div>
//   )

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     try {
//       const res = await userApi.update(user.id, form)
//       updateUser(res.data)
//       toast.success('Profile updated!')
//     } catch {
//       toast.error('Failed to update profile')
//     } finally { setLoading(false) }
//   }

//   return (
//     <div className="max-w-xl mx-auto px-4 py-8">
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
//             <User className="w-6 h-6 text-indigo-600" />
//           </div>
//           <div>
//             <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
//             <p className="text-sm text-gray-500">{user.email}</p>
//           </div>
//           <span className="ml-auto text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">{user.role}</span>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//             <input
//               value={form.name}
//               onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
//               className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//             <input
//               value={form.phone}
//               onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
//               className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//             <textarea
//               value={form.address}
//               onChange={(e) => setForm(f => ({ ...f, address: e.target.value }))}
//               rows={3}
//               className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
//             />
//           </div>
//           <button
//             type="submit" disabled={loading}
//             className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60"
//           >
//             <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Save Changes'}
//           </button>
//         </form>

//         <div className="mt-6 pt-5 border-t border-gray-100">
//           <Link to="/orders" className="text-sm text-indigo-600 hover:underline">View My Orders →</Link>
//         </div>
//       </div>
//     </div>
//   )
// }
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { userApi } from '../api'
import { Link } from 'react-router-dom'
import { User, Save, Shield, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [form, setForm] = useState({ 
    name: user?.name || '', 
    phone: user?.phone || '', 
    address: user?.address || '' 
  })
  const [loading, setLoading] = useState(false)

  if (!user) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-widest">Session Expired</h2>
        <Link to="/login" className="bg-white text-black px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest">
          Login to Access
        </Link>
      </div>
    </div>
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await userApi.update(user.id, form)
      updateUser(res.data)
      toast.success('IDENTITY UPDATED')
    } catch {
      toast.error('PROTOCOL FAILURE: Update Failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="bg-[#050505] min-h-screen text-slate-200 pb-24 pt-28">
      <div className="max-w-2xl mx-auto px-6">
        
        {/* Profile Header */}
        <div className="relative overflow-hidden bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 mb-8 backdrop-blur-xl shadow-2xl">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Shield className="w-32 h-32 text-indigo-500" />
          </div>
          
          <div className="relative flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(79,70,229,0.3)]">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <h1 className="text-3xl font-black text-white tracking-tighter uppercase">{user.name}</h1>
                <span className="text-[10px] font-black bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full tracking-[0.2em] uppercase">
                  {user.role || 'Verified User'}
                </span>
              </div>
              <p className="flex items-center justify-center sm:justify-start gap-2 text-slate-500 font-bold text-xs mt-2 uppercase tracking-widest">
                <Mail className="w-3 h-3" /> {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
              {/* Full Name Field */}
              <div className="group">
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 group-focus-within:text-indigo-400 transition-colors">
                   Full Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white font-mono focus:outline-none focus:border-indigo-500/40 transition-all"
                  placeholder="Enter alias..."
                />
              </div>

              {/* Phone Field */}
              <div className="group">
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 group-focus-within:text-indigo-400 transition-colors">
                  <Phone className="w-3 h-3" /> Contact Comms
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white font-mono focus:outline-none focus:border-indigo-500/40 transition-all"
                  placeholder="+1 000 000 000"
                />
              </div>

              {/* Address Field */}
              <div className="group">
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 group-focus-within:text-indigo-400 transition-colors">
                  <MapPin className="w-3 h-3" /> Deployment Address
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) => setForm(f => ({ ...f, address: e.target.value }))}
                  rows={3}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white font-mono focus:outline-none focus:border-indigo-500/40 transition-all resize-none"
                  placeholder="Enter full logistics coordinates..."
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-black font-black uppercase text-xs tracking-[0.2em] px-10 py-4 rounded-2xl hover:bg-slate-200 active:scale-95 transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" /> {loading ? 'Syncing...' : 'Update Identity'}
              </button>

              <Link 
                to="/orders" 
                className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-colors group"
              >
                Order Archives <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}