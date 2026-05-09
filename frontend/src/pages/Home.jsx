// import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { productApi } from '../api'
// import ProductCard from '../components/ProductCard'
// import { Spinner } from '../components/UI'
// import { ArrowRight } from 'lucide-react'

// const CATEGORIES = [
//   { name: 'Electronics', emoji: '📱', color: 'bg-blue-50 text-blue-700' },
//   { name: 'Clothing', emoji: '👕', color: 'bg-pink-50 text-pink-700' },
//   { name: 'Footwear', emoji: '👟', color: 'bg-green-50 text-green-700' },
//   { name: 'Home & Kitchen', emoji: '🏠', color: 'bg-yellow-50 text-yellow-700' },
//   { name: 'Sports', emoji: '⚽', color: 'bg-orange-50 text-orange-700' },
//   { name: 'Books', emoji: '📚', color: 'bg-purple-50 text-purple-700' },
// ]

// export default function Home() {
//   const [featured, setFeatured] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     productApi.getAll({ page: 0, size: 8, sortBy: 'reviewCount', sortDir: 'desc' })
//       .then(res => setFeatured(res.data.content))
//       .finally(() => setLoading(false))
//   }, [])

//   return (
//     <div>
//       {/* Hero */}
//       <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 px-4">
//         <div className="max-w-4xl mx-auto text-center">
//           <h1 className="text-5xl font-extrabold mb-4">Shop Smarter, Faster</h1>
//           <p className="text-indigo-200 text-lg mb-8">Discover thousands of products at unbeatable prices</p>
//           <Link
//             to="/products"
//             className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors"
//           >
//             Shop Now <ArrowRight className="w-4 h-4" />
//           </Link>
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="max-w-7xl mx-auto px-4 py-12">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
//         <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
//           {CATEGORIES.map(cat => (
//             <Link
//               key={cat.name}
//               to={`/products?category=${encodeURIComponent(cat.name)}`}
//               className={`${cat.color} rounded-xl p-4 text-center hover:scale-105 transition-transform`}
//             >
//               <div className="text-3xl mb-1">{cat.emoji}</div>
//               <div className="text-xs font-semibold">{cat.name}</div>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="max-w-7xl mx-auto px-4 pb-16">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
//           <Link to="/products" className="text-indigo-600 hover:underline text-sm flex items-center gap-1">
//             View all <ArrowRight className="w-4 h-4" />
//           </Link>
//         </div>
//         {loading ? <Spinner /> : (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {featured.map(p => <ProductCard key={p.id} product={p} />)}
//           </div>
//         )}
//       </section>

//       {/* Banner */}
//       <section className="bg-indigo-50 py-12 px-4">
//         <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
//           <div>
//             <h3 className="text-2xl font-bold text-gray-800">Free Shipping on Orders Over $50</h3>
//             <p className="text-gray-500 mt-1">Use code <span className="font-semibold text-indigo-600">QUICKSHIP</span> at checkout</p>
//           </div>
//           <Link to="/products" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 shrink-0">
//             Start Shopping
//           </Link>
//         </div>
//       </section>
//     </div>
//   )
// }
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { productApi } from '../api'
import ProductCard from '../components/ProductCard'
import { Spinner } from '../components/UI'
import { ArrowRight, Sparkles } from 'lucide-react'

// Enhanced Categories with Dark-Mode compatible Glassmorphism
const CATEGORIES = [
  { name: 'Electronics', emoji: '📱', glow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]', border: 'border-blue-500/20' },
  { name: 'Clothing', emoji: '👕', glow: 'hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]', border: 'border-pink-500/20' },
  { name: 'Footwear', emoji: '👟', glow: 'hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]', border: 'border-green-500/20' },
  { name: 'Home & Kitchen', emoji: '🏠', glow: 'hover:shadow-[0_0_20px_rgba(234,179,8,0.5)]', border: 'border-yellow-500/20' },
  { name: 'Sports', emoji: '⚽', glow: 'hover:shadow-[0_0_20_rgba(249,115,22,0.5)]', border: 'border-orange-500/20' },
  { name: 'Books', emoji: '📚', glow: 'hover:shadow-[0_0_20_rgba(168,85,247,0.5)]', border: 'border-purple-500/20' },
]

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productApi.getAll({ page: 0, size: 8, sortBy: 'reviewCount', sortDir: 'desc' })
      .then(res => setFeatured(res.data.content))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-[#050505] text-slate-200 min-h-screen font-sans selection:bg-indigo-500/30">
      
      {/* Hero Section: Sophisticated Mesh Gradient */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#312e81,transparent_50%)] pointer-events-none opacity-50" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-6 animate-fade-in">
            <Sparkles className="w-3 h-3" /> New Collection Available
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
            SHOP SMARTER.<br/>FASTER.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience the future of retail with ultra-fast delivery and a curated collection of high-performance gear.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/products"
              className="group relative inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-10 py-4 rounded-full hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)]"
            >
              Start Exploring
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories: Modern Glassmorphism Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
            <div>
                <span className="text-indigo-500 font-bold tracking-widest text-xs uppercase">Curated Collections</span>
                <h2 className="text-4xl font-bold mt-2">Shop by Category</h2>
            </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className={`group relative overflow-hidden bg-white/[0.03] border ${cat.border} rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 ${cat.glow}`}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{cat.emoji}</div>
              <div className="text-sm font-bold text-slate-300 tracking-tight">{cat.name}</div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products: Clean, High-Contrast Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Featured Drops</h2>
          <Link to="/products" className="group text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
            View all collections <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {loading ? (
            <div className="flex justify-center py-20"><Spinner className="text-indigo-500" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      {/* Promo Banner: The "Dark Card" Aesthetic */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto rounded-[2.5rem] bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-white/10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] -z-10" />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-black mb-4">Elite Membership.</h3>
            <p className="text-slate-400 text-lg max-w-md">
                Get free priority shipping on all orders over $50. Use code <span className="text-white font-mono bg-white/10 px-2 py-1 rounded">QUICKSHIP</span>
            </p>
          </div>
          <Link to="/products" className="relative z-10 bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform shrink-0">
            Join the Club
          </Link>
        </div>
      </section>
    </div>
  )
}