// import { Link, useNavigate } from 'react-router-dom'
// import { ShoppingCart, User, LogOut, Package, Search, Menu, X } from 'lucide-react'
// import { useAuth } from '../context/AuthContext'
// import { useCart } from '../context/CartContext'
// import { useState } from 'react'

// export default function Navbar() {
//   const { user, logout } = useAuth()
//   const { cart } = useCart()
//   const navigate = useNavigate()
//   const [search, setSearch] = useState('')
//   const [menuOpen, setMenuOpen] = useState(false)

//   const handleSearch = (e) => {
//     e.preventDefault()
//     if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`)
//   }

//   return (
//     <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
//         <Link to="/" className="text-2xl font-bold text-indigo-600 shrink-0">
//           ⚡ QuickCart
//         </Link>

//         <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:flex">
//           <div className="relative w-full">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search products..."
//               className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
//             />
//           </div>
//         </form>

//         <div className="ml-auto flex items-center gap-3">
//           <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg">
//             <ShoppingCart className="w-5 h-5 text-gray-700" />
//             {cart.itemCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
//                 {cart.itemCount}
//               </span>
//             )}
//           </Link>

//           {user ? (
//             <div className="hidden md:flex items-center gap-2">
//               <Link to="/orders" className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600 px-2 py-1">
//                 <Package className="w-4 h-4" /> Orders
//               </Link>
//               <Link to="/profile" className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600 px-2 py-1">
//                 <User className="w-4 h-4" /> {user.name.split(' ')[0]}
//               </Link>
//               <button onClick={logout} className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 px-2 py-1">
//                 <LogOut className="w-4 h-4" />
//               </button>
//             </div>
//           ) : (
//             <div className="hidden md:flex gap-2">
//               <Link to="/login" className="text-sm text-gray-600 hover:text-indigo-600 px-3 py-1.5">Login</Link>
//               <Link to="/register" className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700">Sign Up</Link>
//             </div>
//           )}

//           <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {menuOpen && (
//         <div className="md:hidden border-t border-gray-100 px-4 py-3 flex flex-col gap-3 bg-white">
//           <form onSubmit={handleSearch} className="flex gap-2">
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search products..."
//               className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none"
//             />
//             <button type="submit" className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm">Go</button>
//           </form>
//           {user ? (
//             <>
//               <Link to="/orders" onClick={() => setMenuOpen(false)} className="text-sm text-gray-700">My Orders</Link>
//               <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-sm text-gray-700">Profile</Link>
//               <button onClick={() => { logout(); setMenuOpen(false) }} className="text-sm text-red-500 text-left">Logout</button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm text-gray-700">Login</Link>
//               <Link to="/register" onClick={() => setMenuOpen(false)} className="text-sm text-indigo-600 font-medium">Sign Up</Link>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   )
// }
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, LogOut, Package, Search, Menu, X, Zap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`)
      setMenuOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-8">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
            <Zap className="w-6 h-6 text-white fill-current" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase hidden sm:block">
            Quick<span className="text-indigo-500">Cart</span>
          </span>
        </Link>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:block">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 group-focus-within:text-indigo-400 transition-colors" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gear, tech, inventory..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
            />
          </div>
        </form>

        {/* Action Controls */}
        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          
          <Link to="/cart" className="relative p-3 hover:bg-white/5 rounded-2xl transition-colors group">
            <ShoppingCart className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
            {cart.itemCount > 0 && (
              <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center ring-4 ring-[#050505]">
                {cart.itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden md:flex items-center gap-1 border-l border-white/10 pl-4 ml-2">
              <Link to="/orders" className="p-3 text-slate-400 hover:text-white transition-colors" title="Orders">
                <Package className="w-5 h-5" />
              </Link>
              <Link to="/profile" className="flex items-center gap-3 p-2 pr-4 hover:bg-white/5 rounded-2xl transition-all group">
                <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center border border-indigo-500/20">
                   <User className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-xs font-black text-slate-300 group-hover:text-white uppercase tracking-widest uppercase">
                    {user.name.split(' ')[0]}
                </span>
              </Link>
              <button onClick={logout} className="p-3 text-slate-500 hover:text-red-400 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4 ml-4">
              <Link to="/login" className="text-xs font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors">
                Login
              </Link>
              <Link to="/register" className="bg-white text-black px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 hover:scale-105 transition-all shadow-lg">
                Join
              </Link>
            </div>
          )}

          {/* Mobile Toggle */}
          <button className="md:hidden p-3 bg-white/5 rounded-xl border border-white/5" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#050505] border-b border-white/10 animate-in slide-in-from-top duration-300">
          <div className="p-6 space-y-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 font-black text-xs uppercase">Go</button>
            </form>
            
            <div className="grid grid-cols-2 gap-4">
              {user ? (
                <>
                  <Link to="/orders" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 text-sm font-bold uppercase tracking-widest text-slate-300">
                    <Package className="w-4 h-4" /> Orders
                  </Link>
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 text-sm font-bold uppercase tracking-widest text-slate-300">
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <button onClick={() => { logout(); setMenuOpen(false) }} className="col-span-2 flex items-center justify-center gap-2 p-4 text-red-400 font-black uppercase tracking-[0.2em] text-xs">
                    <LogOut className="w-4 h-4" /> Terminate Session
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="flex items-center justify-center p-4 bg-white/5 rounded-2xl text-xs font-black uppercase tracking-widest text-white">Login</Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="flex items-center justify-center p-4 bg-indigo-600 rounded-2xl text-xs font-black uppercase tracking-widest text-white">Join Now</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}