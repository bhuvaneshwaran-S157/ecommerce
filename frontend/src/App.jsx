import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import { Orders, OrderDetail } from './pages/Orders'
import { Login, Register } from './pages/Auth'
import Profile from './pages/Profile'
import { Globe, Terminal, Zap } from 'lucide-react'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:id" element={<OrderDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <footer className="bg-[#050505] border-t  pt-20 pb-10">
              <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-left">
      
      {/* Brand Column */}
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-2 mb-6 group cursor-default">
          <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:border-indigo-500/50 transition-colors">
            <Zap className="w-4 h-4 text-indigo-500 fill-current" />
          </div>
          <span className="text-lg font-black tracking-tighter text-white uppercase">
            Quick<span className="text-indigo-500">Cart</span>
          </span>
        </div>
        <p className="text-[10px] font-bold text-slate-500 leading-loose uppercase tracking-[0.2em]">
          High-performance retail engine. <br />
          Built for terminal velocity.
        </p>
      </div>

      {/* Navigation - Inventory */}
      <div>
        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6 underline decoration-indigo-500 underline-offset-8">Inventory</h4>
        <ul className="space-y-4">
          <li><a href="/products" className="text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest">All Assets</a></li>
          <li><a href="/products?category=Electronics" className="text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Electronics</a></li>
        </ul>
      </div>

      {/* Navigation - System */}
      <div>
        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6 underline decoration-indigo-500 underline-offset-8">System</h4>
        <ul className="space-y-4">
          <li><a href="/profile" className="text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Identity</a></li>
          <li><a href="/orders" className="text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Archives</a></li>
        </ul>
      </div>

      {/* Social/Stats */}
      <div>
        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6 underline decoration-indigo-500 underline-offset-8">Network</h4>
        <div className="flex gap-4 mb-6">
          <a href="#" className="w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="#" className="w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>
        {/* Live System Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]" />
          <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Operational</span>
        </div>
      </div>
    </div>

    {/* Bottom Bar: The "Manifest" Footer */}
    <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em]">
        © 2026 QuickCart • Built for SDE Performance
      </p>
      
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 text-[9px] font-black text-slate-800 uppercase tracking-widest">
          <Terminal className="w-3 h-3" /> v2.4.0-stable
        </div>
        <div className="flex items-center gap-2 text-[9px] font-black text-slate-800 uppercase tracking-widest">
          <Globe className="w-3 h-3" /> Node: Chennai-2026
        </div>
      </div>
    </div>
  </div>
            </footer>
          
          </div>
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
