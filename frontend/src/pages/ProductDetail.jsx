// import { useEffect, useState } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { productApi, reviewApi } from '../api'
// import { useCart } from '../context/CartContext'
// import { useAuth } from '../context/AuthContext'
// import { Spinner } from '../components/UI'
// import { Star, ShoppingCart, Package, ArrowLeft } from 'lucide-react'
// import toast from 'react-hot-toast'

// export default function ProductDetail() {
//   const { id } = useParams()
//   const { user } = useAuth()
//   const { addToCart, loading } = useCart()
//   const [product, setProduct] = useState(null)
//   const [reviews, setReviews] = useState([])
//   const [qty, setQty] = useState(1)
//   const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })
//   const [submitting, setSubmitting] = useState(false)

//   useEffect(() => {
//     productApi.getById(id).then(res => setProduct(res.data))
//     reviewApi.getReviews(id).then(res => setReviews(res.data))
//   }, [id])

//   const submitReview = async (e) => {
//     e.preventDefault()
//     if (!user) { toast.error('Please login to review'); return }
//     setSubmitting(true)
//     try {
//       const res = await reviewApi.addReview(id, user.id, reviewForm)
//       setReviews(prev => [res.data, ...prev])
//       setReviewForm({ rating: 5, comment: '' })
//       toast.success('Review submitted!')
//     } catch (e) {
//       toast.error(e.response?.data?.error || 'Failed to submit review')
//     } finally { setSubmitting(false) }
//   }

//   if (!product) return <Spinner />

//   const stars = (rating) => Array.from({ length: 5 }, (_, i) => (
//     <Star key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
//   ))

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <Link to="/products" className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 mb-6">
//         <ArrowLeft className="w-4 h-4" /> Back to Products
//       </Link>

//       <div className="grid md:grid-cols-2 gap-10 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//         <img
//           src={product.imageUrl || 'https://placehold.co/600x400?text=No+Image'}
//           alt={product.name}
//           className="w-full h-80 object-cover rounded-xl"
//           onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=No+Image' }}
//         />

//         <div className="flex flex-col">
//           <span className="text-sm text-indigo-600 font-medium uppercase">{product.category}</span>
//           <h1 className="text-2xl font-bold text-gray-900 mt-1">{product.name}</h1>
//           <p className="text-gray-400 text-sm">{product.brand}</p>

//           <div className="flex items-center gap-2 mt-3">
//             <div className="flex">{stars(product.rating)}</div>
//             <span className="text-sm text-gray-500">{product.rating?.toFixed(1)} ({product.reviewCount} reviews)</span>
//           </div>

//           <p className="text-3xl font-bold text-gray-900 mt-4">${product.price.toFixed(2)}</p>
//           <p className="text-gray-600 text-sm mt-3 leading-relaxed">{product.description}</p>

//           <div className="flex items-center gap-2 mt-4">
//             <Package className="w-4 h-4 text-gray-400" />
//             <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
//               {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
//             </span>
//           </div>

//           {product.stock > 0 && (
//             <div className="flex items-center gap-3 mt-6">
//               <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
//                 <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-50 text-lg font-medium">−</button>
//                 <span className="px-4 py-2 text-sm font-semibold">{qty}</span>
//                 <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="px-3 py-2 hover:bg-gray-50 text-lg font-medium">+</button>
//               </div>
//               <button
//                 onClick={() => addToCart(product.id, qty)}
//                 disabled={loading}
//                 className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60"
//               >
//                 <ShoppingCart className="w-4 h-4" /> Add to Cart
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Reviews */}
//       <div className="mt-10">
//         <h2 className="text-xl font-bold text-gray-800 mb-5">Customer Reviews</h2>

//         {/* Review Form */}
//         <form onSubmit={submitReview} className="bg-white rounded-xl border border-gray-100 p-5 mb-6 shadow-sm">
//           <h3 className="font-semibold text-gray-700 mb-3">Write a Review</h3>
//           <div className="flex items-center gap-2 mb-3">
//             <span className="text-sm text-gray-600">Rating:</span>
//             {[1, 2, 3, 4, 5].map(r => (
//               <button key={r} type="button" onClick={() => setReviewForm(f => ({ ...f, rating: r }))}>
//                 <Star className={`w-5 h-5 ${r <= reviewForm.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
//               </button>
//             ))}
//           </div>
//           <textarea
//             value={reviewForm.comment}
//             onChange={(e) => setReviewForm(f => ({ ...f, comment: e.target.value }))}
//             placeholder="Share your experience..."
//             rows={3}
//             className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
//           />
//           <button
//             type="submit"
//             disabled={submitting}
//             className="mt-3 bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-60"
//           >
//             {submitting ? 'Submitting...' : 'Submit Review'}
//           </button>
//         </form>

//         {reviews.length === 0 ? (
//           <p className="text-gray-400 text-sm">No reviews yet. Be the first!</p>
//         ) : (
//           <div className="space-y-4">
//             {reviews.map(r => (
//               <div key={r.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
//                 <div className="flex items-center justify-between mb-1">
//                   <span className="font-semibold text-sm text-gray-800">{r.userName}</span>
//                   <span className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</span>
//                 </div>
//                 <div className="flex mb-2">{stars(r.rating)}</div>
//                 {r.comment && <p className="text-sm text-gray-600">{r.comment}</p>}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { productApi, reviewApi } from '../api'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { Spinner } from '../components/UI'
import { Star, ShoppingCart, Package, ArrowLeft, ShieldCheck, Zap } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProductDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const { addToCart, loading: cartLoading } = useCart()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [qty, setQty] = useState(1)
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    productApi.getById(id).then(res => setProduct(res.data))
    reviewApi.getReviews(id).then(res => setReviews(res.data))
  }, [id])

  const submitReview = async (e) => {
    e.preventDefault()
    if (!user) { toast.error('Please login to review'); return }
    setSubmitting(true)
    try {
      const res = await reviewApi.addReview(id, user.id, reviewForm)
      setReviews(prev => [res.data, ...prev])
      setReviewForm({ rating: 5, comment: '' })
      toast.success('Review submitted!')
    } catch (e) {
      toast.error(e.response?.data?.error || 'Failed to submit review')
    } finally { setSubmitting(false) }
  }

  if (!product) return (
    <div className="h-screen flex items-center justify-center bg-[#050505]">
      <Spinner className="text-indigo-500 w-12 h-12" />
    </div>
  )

  const stars = (rating) => Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-white/10'}`} />
  ))

  return (
    <div className="bg-[#050505] min-h-screen text-slate-200 pb-20 pt-28">
      <div className="max-w-7xl mx-auto px-6">
        
        <Link to="/products" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Inventory
        </Link>

        {/* Product Showcase Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Image Side: Cinematic Presentation */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-[2rem] overflow-hidden">
              <img
                src={product.imageUrl || 'https://placehold.co/800x800?text=No+Image'}
                alt={product.name}
                className="w-full aspect-square object-cover transition-transform duration-700 hover:scale-105"
                onError={(e) => { e.target.src = 'https://placehold.co/800x800?text=No+Image' }}
              />
            </div>
          </div>

          {/* Info Side: The Control Panel */}
          <div className="flex flex-col space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                  {product.category}
                </span>
                {product.stock > 0 && (
                  <span className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                    <Zap className="w-3 h-3 fill-emerald-500" /> In Stock
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none">
                {product.name}
              </h1>
              <p className="text-xl text-slate-500 font-medium mt-4">{product.brand}</p>
            </div>

            <div className="flex items-center gap-6 py-6 border-y border-white/5">
              <div className="flex flex-col">
                <div className="flex gap-1">{stars(product.rating)}</div>
                <span className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-tighter">{product.rating?.toFixed(1)} / {product.reviewCount} Reviews</span>
              </div>
              <div className="h-8 w-[1px] bg-white/10" />
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">${product.price.toFixed(2)}</span>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">VAT Included</span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-lg italic">"{product.description}"</p>

            {/* Action Area */}
            <div className="space-y-6 pt-4">
              <div className="flex flex-wrap items-center gap-4">
                {/* Tactical Qty Selector */}
                <div className="flex items-center bg-white/[0.03] border border-white/10 rounded-2xl p-1">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-white/5 rounded-xl transition-colors text-xl">−</button>
                  <span className="w-12 text-center font-black text-white">{qty}</span>
                  <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="w-12 h-12 flex items-center justify-center hover:bg-white/5 rounded-xl transition-colors text-xl">+</button>
                </div>

                <button
                  onClick={() => addToCart(product.id, qty)}
                  disabled={cartLoading || product.stock === 0}
                  className="flex-1 min-w-[200px] h-14 flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] disabled:opacity-30"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.stock === 0 ? 'Out of Stock' : 'Secure Item'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-indigo-400" />
                    <span className="text-[10px] font-bold uppercase text-slate-500">2-Year Warranty</span>
                </div>
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center gap-3">
                    <Package className="w-5 h-5 text-indigo-400" />
                    <span className="text-[10px] font-bold uppercase text-slate-500">Express Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section: Minimalist Grid */}
        <div className="mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
                <span className="text-indigo-400 font-black text-xs uppercase tracking-[0.3em]">Feedback Hub</span>
                <h2 className="text-4xl font-black text-white mt-2">Community Reviews</h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Form Column */}
            <div className="lg:col-span-1">
                <form onSubmit={submitReview} className="sticky top-28 bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
                    <h3 className="text-xl font-bold text-white mb-6">Drop a Review</h3>
                    <div className="flex items-center gap-3 mb-6">
                        {[1, 2, 3, 4, 5].map(r => (
                        <button key={r} type="button" onClick={() => setReviewForm(f => ({ ...f, rating: r }))} className="transition-transform active:scale-90">
                            <Star className={`w-6 h-6 ${r <= reviewForm.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/10'}`} />
                        </button>
                        ))}
                    </div>
                    <textarea
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm(f => ({ ...f, comment: e.target.value }))}
                        placeholder="Detailed feedback..."
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 transition-colors resize-none mb-6"
                    />
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-colors disabled:opacity-50"
                    >
                        {submitting ? 'Encrypting...' : 'Post Review'}
                    </button>
                </form>
            </div>

            {/* List Column */}
            <div className="lg:col-span-2 space-y-6">
                {reviews.length === 0 ? (
                <div className="py-20 text-center border border-dashed border-white/10 rounded-[2rem]">
                    <p className="text-slate-500">No transmissions yet. Be the first to report.</p>
                </div>
                ) : (
                reviews.map(r => (
                <div key={r.id} className="group bg-white/[0.02] border border-white/5 hover:border-white/20 transition-colors rounded-[2rem] p-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-black">
                                {r.userName.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <span className="block font-bold text-white leading-none">{r.userName}</span>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{new Date(r.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className="flex">{stars(r.rating)}</div>
                    </div>
                    {r.comment && <p className="text-slate-400 text-lg leading-relaxed">{r.comment}</p>}
                </div>
                ))
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}