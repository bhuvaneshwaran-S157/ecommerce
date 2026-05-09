// import { useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { useCart } from '../context/CartContext'
// import { useAuth } from '../context/AuthContext'
// import { orderApi } from '../api'
// import { CreditCard, Truck, CheckCircle } from 'lucide-react'
// import toast from 'react-hot-toast'

// export default function Checkout() {
//   const { user } = useAuth()
//   const { cart } = useCart()
//   const navigate = useNavigate()
//   const [form, setForm] = useState({
//     shippingAddress: user?.address || '',
//     paymentMethod: 'Credit Card',
//   })
//   const [loading, setLoading] = useState(false)

//   if (!user) return <div className="text-center py-20"><Link to="/login" className="text-indigo-600 underline">Login</Link> to checkout</div>
//   if (cart.items.length === 0) return <div className="text-center py-20">Your cart is empty. <Link to="/products" className="text-indigo-600 underline">Shop now</Link></div>

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!form.shippingAddress.trim()) { toast.error('Please enter a shipping address'); return }
//     setLoading(true)
//     try {
//       const res = await orderApi.checkout(user.id, form)
//       toast.success('Order placed successfully!')
//       navigate(`/orders/${res.data.id}`)
//     } catch (e) {
//       toast.error(e.response?.data?.error || 'Checkout failed')
//     } finally { setLoading(false) }
//   }

//   const shipping = cart.total >= 50 ? 0 : 5.99
//   const total = cart.total + shipping

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

//       <div className="grid md:grid-cols-3 gap-6">
//         <form onSubmit={handleSubmit} className="md:col-span-2 space-y-5">
//           {/* Shipping */}
//           <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
//             <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <Truck className="w-5 h-5 text-indigo-600" /> Shipping Address
//             </h2>
//             <textarea
//               value={form.shippingAddress}
//               onChange={(e) => setForm(f => ({ ...f, shippingAddress: e.target.value }))}
//               placeholder="Enter your full shipping address..."
//               rows={3}
//               required
//               className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
//             />
//           </div>

//           {/* Payment */}
//           <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
//             <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <CreditCard className="w-5 h-5 text-indigo-600" /> Payment Method
//             </h2>
//             <div className="space-y-2">
//               {['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery'].map(method => (
//                 <label key={method} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value={method}
//                     checked={form.paymentMethod === method}
//                     onChange={(e) => setForm(f => ({ ...f, paymentMethod: e.target.value }))}
//                     className="accent-indigo-600"
//                   />
//                   <span className="text-sm font-medium text-gray-700">{method}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
//           >
//             <CheckCircle className="w-5 h-5" />
//             {loading ? 'Placing Order...' : `Place Order — $${total.toFixed(2)}`}
//           </button>
//         </form>

//         {/* Summary */}
//         <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm h-fit">
//           <h2 className="font-bold text-gray-800 mb-4">Order Summary</h2>
//           <div className="space-y-2 mb-4">
//             {cart.items.map(item => (
//               <div key={item.id} className="flex justify-between text-sm text-gray-600">
//                 <span className="truncate mr-2">{item.productName} × {item.quantity}</span>
//                 <span className="shrink-0">${item.subtotal.toFixed(2)}</span>
//               </div>
//             ))}
//           </div>
//           <div className="border-t border-gray-100 pt-3 space-y-1 text-sm">
//             <div className="flex justify-between text-gray-600">
//               <span>Subtotal</span><span>${cart.total.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between text-gray-600">
//               <span>Shipping</span><span className="text-green-600">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
//             </div>
//             <div className="flex justify-between font-bold text-gray-900 text-base pt-1">
//               <span>Total</span><span>${total.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { orderApi } from '../api'
import { CreditCard, Truck, CheckCircle, ShieldCheck, Lock, Wallet, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Checkout() {
  const { user } = useAuth()
  const { cart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    shippingAddress: user?.address || '',
    paymentMethod: 'Credit Card',
  })
  const [loading, setLoading] = useState(false)

  if (!user || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
        <div className="text-center">
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-[0.2em]">Session Invalid</h2>
            <Link to="/products" className="bg-white text-black px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all">
              Return to Shop
            </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.shippingAddress.trim()) { toast.error('Address Required'); return }
    setLoading(true)
    try {
      const res = await orderApi.checkout(user.id, form)
      toast.success('Transaction Confirmed')
      navigate(`/orders/${res.data.id}`)
    } catch (e) {
      toast.error(e.response?.data?.error || 'Checkout Error')
    } finally { setLoading(false) }
  }

  const shipping = cart.total >= 50 ? 0 : 5.99
  const total = cart.total + shipping

  return (
    <div className="bg-[#050505] min-h-screen text-slate-200 pb-24 pt-28">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col mb-12">
            <Link to="/cart" className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] mb-4 transition-colors group">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Modify Cart
            </Link>
            <h1 className="text-5xl font-black tracking-tighter text-white uppercase">Checkout</h1>
            <div className="flex items-center gap-2 text-indigo-400 mt-2">
                <Lock className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encrypted Transaction</span>
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
            
            {/* Step 1: Logistics */}
            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
                    <Truck className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-white uppercase tracking-tight">01. Shipping Logistics</h2>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-0.5">Where should we deploy your gear?</p>
                </div>
              </div>
              
              <textarea
                value={form.shippingAddress}
                onChange={(e) => setForm(f => ({ ...f, shippingAddress: e.target.value }))}
                placeholder="Full delivery coordinates (Address, Apt, City, Zip)..."
                rows={4}
                required
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all resize-none placeholder:text-slate-700"
              />
            </div>

            {/* Step 2: Payment Selector */}
            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20">
                    <CreditCard className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-white uppercase tracking-tight">02. Payment Protocol</h2>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-0.5">Select your preferred funding source</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Credit Card', 'PayPal', 'Digital Wallet', 'Crypto/Web3'].map(method => (
                  <label key={method} className={`relative flex items-center gap-4 p-5 rounded-2xl cursor-pointer border transition-all duration-300 ${form.paymentMethod === method ? 'bg-indigo-500/10 border-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.2)]' : 'bg-black/20 border-white/5 hover:border-white/20'}`}>
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={form.paymentMethod === method}
                      onChange={(e) => setForm(f => ({ ...f, paymentMethod: e.target.value }))}
                      className="hidden"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${form.paymentMethod === method ? 'border-indigo-400' : 'border-slate-700'}`}>
                        {form.paymentMethod === method && <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full" />}
                    </div>
                    <span className={`font-bold uppercase text-xs tracking-widest ${form.paymentMethod === method ? 'text-white' : 'text-slate-500'}`}>{method}</span>
                    {method === 'Credit Card' && <CreditCard className="w-4 h-4 ml-auto text-slate-600" />}
                    {method === 'PayPal' && <Wallet className="w-4 h-4 ml-auto text-slate-600" />}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full h-20 bg-white text-black rounded-[2rem] overflow-hidden transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <div className="relative z-10 flex items-center justify-center gap-3 font-black uppercase tracking-[0.3em]">
                {loading ? 'Processing...' : (
                    <>
                        <CheckCircle className="w-6 h-6" />
                        Authorize Transaction — ${total.toFixed(2)}
                    </>
                )}
              </div>
            </button>
          </form>

          {/* Floating Receipt */}
          <aside className="lg:sticky lg:top-28">
            <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-2xl">
              <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8">Final Inventory Review</h2>
              
              <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.items.map(item => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white line-clamp-1">{item.productName}</span>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Qty: {item.quantity}</span>
                    </div>
                    <span className="text-sm font-black text-white">${item.subtotal.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-6 space-y-3">
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                  <span>Gross Subtotal</span>
                  <span className="text-slate-300">${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                  <span>Logistics/Shipping</span>
                  <span className={shipping === 0 ? 'text-emerald-500' : 'text-slate-300'}>
                    {shipping === 0 ? 'COMPLIMENTARY' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="h-[1px] bg-indigo-500/20 my-4" />
                <div className="flex justify-between items-end">
                  <span className="text-xs font-black text-white uppercase tracking-widest">Grand Total</span>
                  <span className="text-4xl font-black text-white tracking-tighter">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                <span className="text-[10px] font-black text-indigo-300/70 uppercase tracking-tight">Buyer Protection Active</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}