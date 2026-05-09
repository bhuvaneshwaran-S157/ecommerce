// import { useEffect, useState } from 'react'
// import { Link, useParams } from 'react-router-dom'
// import { orderApi } from '../api'
// import { useAuth } from '../context/AuthContext'
// import { Spinner, EmptyState } from '../components/UI'
// import { Package, ChevronRight } from 'lucide-react'

// const STATUS_COLORS = {
//   PENDING: 'bg-yellow-100 text-yellow-700',
//   CONFIRMED: 'bg-blue-100 text-blue-700',
//   SHIPPED: 'bg-purple-100 text-purple-700',
//   DELIVERED: 'bg-green-100 text-green-700',
//   CANCELLED: 'bg-red-100 text-red-700',
// }

// export function Orders() {
//   const { user } = useAuth()
//   const [orders, setOrders] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (user) orderApi.getUserOrders(user.id).then(res => setOrders(res.data)).finally(() => setLoading(false))
//   }, [user])

//   if (!user) return <EmptyState icon="🔒" title="Please login" description="Login to view your orders" action={<Link to="/login" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium">Login</Link>} />
//   if (loading) return <Spinner />
//   if (orders.length === 0) return <EmptyState icon="📦" title="No orders yet" description="Place your first order!" action={<Link to="/products" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium">Shop Now</Link>} />

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>
//       <div className="space-y-3">
//         {orders.map(order => (
//           <Link key={order.id} to={`/orders/${order.id}`} className="block bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="flex items-center gap-3">
//                   <Package className="w-4 h-4 text-indigo-600" />
//                   <span className="font-semibold text-gray-800">Order #{order.id}</span>
//                   <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status]}`}>{order.status}</span>
//                 </div>
//                 <p className="text-sm text-gray-500 mt-1 ml-7">
//                   {order.items.length} item{order.items.length > 1 ? 's' : ''} · ${order.totalAmount.toFixed(2)} · {new Date(order.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//               <ChevronRight className="w-4 h-4 text-gray-400" />
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   )
// }

// export function OrderDetail() {
//   const { id } = useParams()
//   const [order, setOrder] = useState(null)

//   useEffect(() => {
//     orderApi.getOrder(id).then(res => setOrder(res.data))
//   }, [id])

//   if (!order) return <Spinner />

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8">
//       <Link to="/orders" className="text-sm text-indigo-600 hover:underline mb-4 block">← Back to Orders</Link>
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
//         <div className="flex items-center justify-between mb-5">
//           <h1 className="text-xl font-bold text-gray-800">Order #{order.id}</h1>
//           <span className={`text-sm font-medium px-3 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>{order.status}</span>
//         </div>

//         <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
//           <div><span className="font-medium text-gray-700">Date:</span> {new Date(order.createdAt).toLocaleString()}</div>
//           <div><span className="font-medium text-gray-700">Payment:</span> {order.paymentMethod}</div>
//           <div className="sm:col-span-2"><span className="font-medium text-gray-700">Shipping to:</span> {order.shippingAddress}</div>
//         </div>

//         <div className="border-t border-gray-100 pt-4 space-y-3">
//           {order.items.map((item, i) => (
//             <div key={i} className="flex items-center gap-3">
//               <img
//                 src={item.productImage || 'https://placehold.co/60x60?text=?'}
//                 alt={item.productName}
//                 className="w-14 h-14 object-cover rounded-lg"
//                 onError={(e) => { e.target.src = 'https://placehold.co/60x60?text=?' }}
//               />
//               <div className="flex-1">
//                 <p className="font-medium text-gray-800 text-sm">{item.productName}</p>
//                 <p className="text-xs text-gray-500">Qty: {item.quantity} × ${item.priceAtPurchase.toFixed(2)}</p>
//               </div>
//               <p className="font-semibold text-gray-900">${item.subtotal.toFixed(2)}</p>
//             </div>
//           ))}
//         </div>

//         <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-bold text-gray-900">
//           <span>Total</span>
//           <span>${order.totalAmount.toFixed(2)}</span>
//         </div>
//       </div>
//     </div>
//   )
// }
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { orderApi } from '../api'
import { useAuth } from '../context/AuthContext'
import { Spinner, EmptyState } from '../components/UI'
import { Package, ChevronRight, Calendar, ArrowLeft, Hash, CreditCard, MapPin } from 'lucide-react'

const STATUS_THEMES = {
  PENDING: 'border-yellow-500/20 text-yellow-500 bg-yellow-500/5',
  CONFIRMED: 'border-blue-500/20 text-blue-500 bg-blue-500/5',
  SHIPPED: 'border-purple-500/20 text-purple-500 bg-purple-500/5',
  DELIVERED: 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5',
  CANCELLED: 'border-red-500/20 text-red-500 bg-red-500/5',
}

export function Orders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) orderApi.getUserOrders(user.id).then(res => setOrders(res.data)).finally(() => setLoading(false))
  }, [user])

  if (!user) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <EmptyState icon="🔒" title="ACCESS DENIED" description="Authentication required to view archives." action={<Link to="/login" className="bg-white text-black px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest">Login</Link>} />
    </div>
  )
  
  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><Spinner /></div>

  if (orders.length === 0) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <EmptyState icon="📦" title="NO DATA" description="Your acquisition history is empty." action={<Link to="/products" className="bg-white text-black px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest">Browse Gear</Link>} />
    </div>
  )

  return (
    <div className="bg-[#050505] min-h-screen text-slate-200 pb-24 pt-28">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-black tracking-tighter text-white mb-12 uppercase">Archives</h1>
        
        <div className="space-y-4">
          {orders.map(order => (
            <Link key={order.id} to={`/orders/${order.id}`} className="group relative block bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform">
                    <Package className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-black text-white text-lg tracking-tight">#{order.id.toString().padStart(5, '0')}</span>
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border uppercase tracking-widest ${STATUS_THEMES[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {order.items.length} Units
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-8">
                    <div className="text-right">
                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Total Value</p>
                        <p className="text-xl font-black text-white">${order.totalAmount.toFixed(2)}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export function OrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    orderApi.getOrder(id).then(res => setOrder(res.data))
  }, [id])

  if (!order) return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><Spinner /></div>

  return (
    <div className="bg-[#050505] min-h-screen text-slate-200 pb-24 pt-28">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/orders" className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] mb-8 transition-colors group">
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to History
        </Link>

        <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-xl">
          {/* Header Section */}
          <div className="p-8 sm:p-12 border-b border-white/5 bg-white/[0.01]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                    <Hash className="w-5 h-5 text-indigo-500" />
                    <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Manifest #{order.id}</h1>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {new Date(order.createdAt).toLocaleString()}</span>
                    <span className="w-1 h-1 bg-slate-800 rounded-full" />
                    <span className="flex items-center gap-1.5"><CreditCard className="w-3 h-3" /> {order.paymentMethod}</span>
                </div>
              </div>
              <span className={`px-6 py-2 rounded-full border text-xs font-black uppercase tracking-[0.2em] shadow-lg ${STATUS_THEMES[order.status]}`}>
                {order.status}
              </span>
            </div>
          </div>

          {/* Logistics Body */}
          <div className="p-8 sm:p-12">
            <div className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Shipping Destination</h3>
                </div>
                <p className="text-lg font-bold text-white max-w-md leading-relaxed">{order.shippingAddress}</p>
            </div>

            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Line Items</h3>
            <div className="space-y-6">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                  <img
                    src={item.productImage || 'https://placehold.co/100x100?text=?'}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded-xl bg-black"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-white mb-1">{item.productName}</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        {item.quantity} Units × ${item.priceAtPurchase.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-lg font-black text-white">${item.subtotal.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Total */}
          <div className="p-8 sm:p-12 bg-white/[0.03] border-t border-white/5 flex justify-between items-end">
            <div>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-1">Final Settlement</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">All taxes and logistics included</p>
            </div>
            <div className="text-right">
                <span className="text-5xl font-black text-white tracking-tighter">${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}