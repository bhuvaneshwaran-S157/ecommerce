import { Link } from 'react-router-dom'
import { Zap, Github, Twitter, Globe, Terminal } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:border-indigo-500/50 transition-colors">
                <Zap className="w-4 h-4 text-indigo-500 fill-current" />
              </div>
              <span className="text-lg font-black tracking-tighter text-white uppercase">
                Quick<span className="text-indigo-500">Cart</span>
              </span>
            </Link>
            <p className="text-xs font-bold text-slate-500 leading-loose uppercase tracking-widest">
              High-performance retail engine for the modern era. Built for speed.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6">Inventory</h4>
            <ul className="space-y-4">
              <li><Link to="/products" className="text-xs font-bold text-slate-500 hover:text-indigo-400 transition-colors uppercase tracking-widest">All Products</Link></li>
              <li><Link to="/products?category=Electronics" className="text-xs font-bold text-slate-500 hover:text-indigo-400 transition-colors uppercase tracking-widest">Electronics</Link></li>
              <li><Link to="/products?category=Gear" className="text-xs font-bold text-slate-500 hover:text-indigo-400 transition-colors uppercase tracking-widest">Technical Gear</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6">System</h4>
            <ul className="space-y-4">
              <li><Link to="/profile" className="text-xs font-bold text-slate-500 hover:text-indigo-400 transition-colors uppercase tracking-widest">User Profile</Link></li>
              <li><Link to="/orders" className="text-xs font-bold text-slate-500 hover:text-indigo-400 transition-colors uppercase tracking-widest">Order History</Link></li>
              <li><Link to="/cart" className="text-xs font-bold text-slate-500 hover:text-indigo-400 transition-colors uppercase tracking-widest">Secure Cart</Link></li>
            </ul>
          </div>

          {/* Social/Stats */}
          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6">Network</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            {/* System Status Mock */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest text-nowrap">Systems Operational</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
            © {currentYear} QuickCart. Architecture by Backend Elite.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-[9px] font-black text-slate-700 uppercase tracking-widest">
              <Terminal className="w-3 h-3" /> v2.4.0-stable
            </span>
            <span className="flex items-center gap-2 text-[9px] font-black text-slate-700 uppercase tracking-widest">
              <Globe className="w-3 h-3" /> Node: Chennai-SC-1
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}