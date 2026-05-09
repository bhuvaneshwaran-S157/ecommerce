// import { Link, useNavigate } from 'react-router-dom'
// import { useCart } from '../context/CartContext'
// import { useAuth } from '../context/AuthContext'
// import { Trash2, ShoppingBag } from 'lucide-react'
// import { EmptyState } from '../components/UI'

// export default function Cart() {
//   const { cart, updateItem, removeItem } = useCart()
//   const { user } = useAuth()
//   const navigate = useNavigate()

//   if (!user) return (
//     <EmptyState
//       icon="🔒"
//       title="Please login"
//       description="Login to view your cart"
//       action={<Link to="/login" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700">Login</Link>}
//     />
//   )

//   if (cart.items.length === 0) return (
//     <EmptyState
//       icon="🛒"
//       title="Your cart is empty"
//       description="Add some products to get started"
//       action={<Link to="/products" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700">Shop Now</Link>}
//     />
//   )

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart ({cart.itemCount} items)</h1>

//       <div className="grid md:grid-cols-3 gap-6">
//         <div className="md:col-span-2 space-y-3">
//           {cart.items.map(item => (
//             <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4 shadow-sm">
//               <img
//                 src={item.productImage || 'https://placehold.co/80x80?text=?'}
//                 alt={item.productName}
//                 className="w-20 h-20 object-cover rounded-lg shrink-0"
//                 onError={(e) => { e.target.src = 'https://placehold.co/80x80?text=?' }}
//               />
//               <div className="flex-1 min-w-0">
//                 <Link to={`/products/${item.productId}`} className="font-semibold text-gray-800 hover:text-indigo-600 text-sm line-clamp-2">
//                   {item.productName}
//                 </Link>
//                 <p className="text-indigo-600 font-bold mt-1">${item.price.toFixed(2)}</p>
//                 <div className="flex items-center gap-3 mt-2">
//                   <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
//                     <button onClick={() => updateItem(item.id, item.quantity - 1)} className="px-2.5 py-1 hover:bg-gray-50 text-sm font-medium">−</button>
//                     <span className="px-3 py-1 text-sm font-semibold">{item.quantity}</span>
//                     <button onClick={() => updateItem(item.id, item.quantity + 1)} className="px-2.5 py-1 hover:bg-gray-50 text-sm font-medium">+</button>
//                   </div>
//                   <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 p-1">
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//               <div className="text-right shrink-0">
//                 <p className="font-bold text-gray-900">${item.subtotal.toFixed(2)}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Order Summary */}
//         <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm h-fit sticky top-20">
//           <h2 className="font-bold text-gray-800 mb-4">Order Summary</h2>
//           <div className="space-y-2 text-sm text-gray-600">
//             <div className="flex justify-between">
//               <span>Subtotal ({cart.itemCount} items)</span>
//               <span>${cart.total.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Shipping</span>
//               <span className="text-green-600">{cart.total >= 50 ? 'Free' : '$5.99'}</span>
//             </div>
//             <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900 text-base">
//               <span>Total</span>
//               <span>${(cart.total + (cart.total >= 50 ? 0 : 5.99)).toFixed(2)}</span>
//             </div>
//           </div>
//           <button
//             onClick={() => navigate('/checkout')}
//             className="w-full mt-5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
//           >
//             <ShoppingBag className="w-4 h-4" /> Proceed to Checkout
//           </button>
//           <Link to="/products" className="block text-center text-sm text-indigo-600 hover:underline mt-3">
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { Trash2, ShoppingBag, ArrowLeft, Lock, ShoppingCart } from 'lucide-react'

export default function Cart() {
  const { cart, updateItem, removeItem } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  // High-End Empty/Auth States
  if (!user) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center bg-white/[0.02] border border-white/10 p-12 rounded-[3rem] backdrop-blur-xl">
            <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="text-3xl font-black text-white mb-4 tracking-tighter">SECURE ACCESS</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">Identity verification required to access your personal collection.</p>
            <Link to="/login" className="block w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-[0_0_30px_rgba(79,70,229,0.3)]">
                Authenticate
            </Link>
        </div>
    </div>
  )

  if (cart.items.length === 0) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
            <div className="w-24 h-24 bg-white/[0.03] border border-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
                <ShoppingCart className="w-10 h-10 text-slate-600" />
            </div>
            <h2 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">Cart is Empty</h2>
            <p className="text-slate-500 mb-10 text-lg">Your inventory is currently zero. Let's find some gear.</p>
            <Link to="/products" className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform">
                Browse Products <ArrowLeft className="w-5 h-5 rotate-180" />
            </Link>
        </div>
    </div>
  )

  const shippingCost = cart.total >= 50 ? 0 : 5.99;
  const finalTotal = cart.total + shippingCost;

  return (
    <div className="bg-[#050505] min-h-screen text-slate-200 pb-24 pt-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end gap-4 mb-12">
            <h1 className="text-5xl font-black tracking-tighter text-white">YOUR CART</h1>
            <span className="text-indigo-400 font-black text-xl mb-1">[{cart.itemCount}]</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Item List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map(item => (
              <div key={item.id} className="group relative bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-3xl p-5 flex flex-col sm:flex-row gap-6 transition-all duration-300">
                <div className="relative w-full sm:w-32 h-32 bg-[#0A0A0A] rounded-2xl overflow-hidden shrink-0">
                  <img
                    src={item.productImage || 'https://placehold.co/150x150?text=?'}
                    alt={item.productName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                        <Link to={`/products/${item.productId}`} className="text-lg font-bold text-white hover:text-indigo-400 transition-colors line-clamp-1">
                        {item.productName}
                        </Link>
                        <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-1">Unit Price: ${item.price.toFixed(2)}</p>
                    </div>
                    <p className="text-xl font-black text-white">${item.subtotal.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center bg-black/40 border border-white/10 rounded-xl p-1">
                      <button onClick={() => updateItem(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/5 rounded-lg text-slate-400 transition-colors">−</button>
                      <span className="w-10 text-center font-bold text-white text-sm">{item.quantity}</span>
                      <button onClick={() => updateItem(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/5 rounded-lg text-slate-400 transition-colors">+</button>
                    </div>
                    
                    <button onClick={() => removeItem(item.id)} className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors group/trash">
                      <Trash2 className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/trash:opacity-100 transition-opacity">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <aside className="lg:sticky lg:top-28">
            <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-2xl shadow-2xl">
              <h2 className="text-2xl font-black text-white mb-8 tracking-tighter uppercase">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-400 text-sm font-bold uppercase tracking-tight">
                  <span>Subtotal</span>
                  <span className="text-white">${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-sm font-bold uppercase tracking-tight">
                  <span>Estimated Shipping</span>
                  <span className={shippingCost === 0 ? 'text-emerald-500' : 'text-white'}>
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                {shippingCost > 0 && (
                    <p className="text-[10px] text-indigo-400 font-bold uppercase">Add ${(50 - cart.total).toFixed(2)} more for Free Shipping</p>
                )}
                <div className="h-[1px] bg-white/10 my-4" />
                <div className="flex justify-between items-end">
                  <span className="text-slate-500 font-black uppercase text-xs">Total Due</span>
                  <span className="text-4xl font-black text-white tracking-tighter">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.15em] flex items-center justify-center gap-3 hover:bg-slate-200 hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
              >
                <ShoppingBag className="w-5 h-5" /> Secure Checkout
              </button>
              
              <Link to="/products" className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors mt-6">
                <ArrowLeft className="w-3 h-3" /> Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}