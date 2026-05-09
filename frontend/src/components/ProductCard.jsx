// import { Link } from 'react-router-dom'
// import { ShoppingCart, Star } from 'lucide-react'
// import { useCart } from '../context/CartContext'

// export default function ProductCard({ product }) {
//   const { addToCart, loading } = useCart()

//   const stars = Array.from({ length: 5 }, (_, i) => (
//     <Star
//       key={i}
//       className={`w-3.5 h-3.5 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
//     />
//   ))

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
//       <Link to={`/products/${product.id}`}>
//         <img
//           src={product.imageUrl || 'https://placehold.co/400x300?text=No+Image'}
//           alt={product.name}
//           className="w-full h-48 object-cover rounded-t-xl"
//           onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=No+Image' }}
//         />
//       </Link>
//       <div className="p-4 flex flex-col flex-1">
//         <span className="text-xs text-indigo-600 font-medium uppercase tracking-wide">{product.category}</span>
//         <Link to={`/products/${product.id}`} className="mt-1 font-semibold text-gray-800 hover:text-indigo-600 line-clamp-2 text-sm leading-snug">
//           {product.name}
//         </Link>
//         <p className="text-xs text-gray-400 mt-0.5">{product.brand}</p>

//         <div className="flex items-center gap-1 mt-2">
//           {stars}
//           <span className="text-xs text-gray-400 ml-1">({product.reviewCount})</span>
//         </div>

//         <div className="mt-auto pt-3 flex items-center justify-between">
//           <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
//           <button
//             onClick={() => addToCart(product.id)}
//             disabled={loading || product.stock === 0}
//             className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors"
//           >
//             <ShoppingCart className="w-3.5 h-3.5" />
//             {product.stock === 0 ? 'Out of Stock' : 'Add'}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
import { Link } from 'react-router-dom'
import { ShoppingCart, Star, Zap } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart, loading } = useCart()

  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-3 h-3 ${i < Math.round(product.rating) ? 'text-indigo-400 fill-indigo-400' : 'text-slate-700'}`}
    />
  ))

  return (
    <div className="group relative bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 flex flex-col shadow-2xl">
      
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.imageUrl || 'https://placehold.co/600x450?text=Inventory+Alpha'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            onError={(e) => { e.target.src = 'https://placehold.co/600x450?text=Inventory+Alpha' }}
          />
          {/* Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
        </Link>
        
        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-black/40 backdrop-blur-md border border-white/10 text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-xl">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-3 flex items-center justify-between">
           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{product.brand}</p>
           <div className="flex items-center gap-0.5">
            {stars}
          </div>
        </div>

        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-white font-bold text-lg leading-tight tracking-tight hover:text-indigo-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Price and Action */}
        <div className="mt-auto pt-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">MSRP</p>
            <span className="text-xl font-black text-white tracking-tighter">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => addToCart(product.id)}
            disabled={loading || product.stock === 0}
            className={`
              relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300
              ${product.stock === 0 
                ? 'bg-slate-800/50 cursor-not-allowed text-slate-600' 
                : 'bg-white text-black hover:bg-indigo-500 hover:text-white hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] active:scale-90'
              }
            `}
            title={product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          >
            {product.stock === 0 ? (
              <Zap className="w-5 h-5 opacity-20" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}