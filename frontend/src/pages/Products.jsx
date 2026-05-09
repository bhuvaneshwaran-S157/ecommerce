// import { useEffect, useState } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import { productApi } from '../api'
// import ProductCard from '../components/ProductCard'
// import { Spinner } from '../components/UI'
// import { SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'

// export default function Products() {
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [products, setProducts] = useState([])
//   const [categories, setCategories] = useState([])
//   const [totalPages, setTotalPages] = useState(0)
//   const [loading, setLoading] = useState(true)

//   const category = searchParams.get('category') || ''
//   const search = searchParams.get('search') || ''
//   const page = parseInt(searchParams.get('page') || '0')
//   const sortBy = searchParams.get('sortBy') || 'id'
//   const sortDir = searchParams.get('sortDir') || 'asc'

//   useEffect(() => {
//     productApi.getCategories().then(res => setCategories(res.data))
//   }, [])

//   useEffect(() => {
//     setLoading(true)
//     productApi.getAll({ category: category || undefined, search: search || undefined, page, size: 12, sortBy, sortDir })
//       .then(res => { setProducts(res.data.content); setTotalPages(res.data.totalPages) })
//       .finally(() => setLoading(false))
//   }, [category, search, page, sortBy, sortDir])

//   const setParam = (key, value) => {
//     const p = new URLSearchParams(searchParams)
//     if (value) p.set(key, value); else p.delete(key)
//     if (key !== 'page') p.delete('page')
//     setSearchParams(p)
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex flex-col md:flex-row gap-6">

//         {/* Sidebar Filters */}
//         <aside className="w-full md:w-56 shrink-0">
//           <div className="bg-white rounded-xl border border-gray-100 p-4 sticky top-20">
//             <div className="flex items-center gap-2 font-semibold text-gray-700 mb-4">
//               <SlidersHorizontal className="w-4 h-4" /> Filters
//             </div>
//             <div>
//               <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Category</p>
//               <button
//                 onClick={() => setParam('category', '')}
//                 className={`block w-full text-left text-sm px-3 py-1.5 rounded-lg mb-1 ${!category ? 'bg-indigo-600 text-white' : 'hover:bg-gray-50 text-gray-700'}`}
//               >
//                 All
//               </button>
//               {categories.map(cat => (
//                 <button
//                   key={cat}
//                   onClick={() => setParam('category', cat)}
//                   className={`block w-full text-left text-sm px-3 py-1.5 rounded-lg mb-1 ${category === cat ? 'bg-indigo-600 text-white' : 'hover:bg-gray-50 text-gray-700'}`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <div className="flex-1">
//           <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
//             <h1 className="text-xl font-bold text-gray-800">
//               {search ? `Results for "${search}"` : category || 'All Products'}
//             </h1>
//             <select
//               value={`${sortBy}-${sortDir}`}
//               onChange={(e) => {
//                 const [sb, sd] = e.target.value.split('-')
//                 const p = new URLSearchParams(searchParams)
//                 p.set('sortBy', sb); p.set('sortDir', sd); p.delete('page')
//                 setSearchParams(p)
//               }}
//               className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
//             >
//               <option value="id-asc">Default</option>
//               <option value="price-asc">Price: Low to High</option>
//               <option value="price-desc">Price: High to Low</option>
//               <option value="rating-desc">Top Rated</option>
//               <option value="reviewCount-desc">Most Popular</option>
//             </select>
//           </div>

//           {loading ? <Spinner /> : products.length === 0 ? (
//             <div className="text-center py-20 text-gray-400">No products found.</div>
//           ) : (
//             <>
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {products.map(p => <ProductCard key={p.id} product={p} />)}
//               </div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="flex justify-center items-center gap-2 mt-8">
//                   <button
//                     disabled={page === 0}
//                     onClick={() => setParam('page', page - 1)}
//                     className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
//                   >
//                     <ChevronLeft className="w-4 h-4" />
//                   </button>
//                   {Array.from({ length: totalPages }, (_, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setParam('page', i)}
//                       className={`w-9 h-9 rounded-lg text-sm font-medium ${i === page ? 'bg-indigo-600 text-white' : 'border border-gray-200 hover:bg-gray-50'}`}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}
//                   <button
//                     disabled={page === totalPages - 1}
//                     onClick={() => setParam('page', page + 1)}
//                     className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
//                   >
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { productApi } from '../api'
import ProductCard from '../components/ProductCard'
import { Spinner } from '../components/UI'
import { SlidersHorizontal, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)

  const category = searchParams.get('category') || ''
  const search = searchParams.get('search') || ''
  const page = parseInt(searchParams.get('page') || '0')
  const sortBy = searchParams.get('sortBy') || 'id'
  const sortDir = searchParams.get('sortDir') || 'asc'

  useEffect(() => {
    productApi.getCategories().then(res => setCategories(res.data))
  }, [])

  useEffect(() => {
    setLoading(true)
    productApi.getAll({ category: category || undefined, search: search || undefined, page, size: 12, sortBy, sortDir })
      .then(res => { setProducts(res.data.content); setTotalPages(res.data.totalPages) })
      .finally(() => setLoading(false))
  }, [category, search, page, sortBy, sortDir])

  const setParam = (key, value) => {
    const p = new URLSearchParams(searchParams)
    if (value) p.set(key, value); else p.delete(key)
    if (key !== 'page') p.delete('page')
    setSearchParams(p)
  }

  return (
    <div className="bg-[#050505] min-h-screen text-slate-200 selection:bg-indigo-500/30">
      <div className="max-w-[1600px] mx-auto px-6 py-12 pt-28">
        
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sidebar Filters: High-End Glassmorphism */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sticky top-28 shadow-2xl">
              <div className="flex items-center gap-2 font-bold text-white mb-8 tracking-tight">
                <SlidersHorizontal className="w-5 h-5 text-indigo-400" /> 
                <span className="text-lg">Refine Search</span>
              </div>
              
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Categories</p>
                  <div className="space-y-1">
                    <button
                      onClick={() => setParam('category', '')}
                      className={`block w-full text-left text-sm px-4 py-2.5 rounded-xl transition-all duration-200 ${!category ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                      All Collections
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setParam('category', cat)}
                        className={`block w-full text-left text-sm px-4 py-2.5 rounded-xl transition-all duration-200 ${category === cat ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-white">
                  {search ? `SEARCH: ${search.toUpperCase()}` : (category || 'ALL PRODUCTS').toUpperCase()}
                </h1>
                <p className="text-slate-500 text-sm mt-1">Showing the latest drops and essentials.</p>
              </div>

              <div className="flex items-center gap-3 bg-white/[0.03] p-1 rounded-2xl border border-white/10">
                <div className="pl-3 py-2">
                    <LayoutGrid className="w-4 h-4 text-slate-500" />
                </div>
                <select
                  value={`${sortBy}-${sortDir}`}
                  onChange={(e) => {
                    const [sb, sd] = e.target.value.split('-')
                    const p = new URLSearchParams(searchParams)
                    p.set('sortBy', sb); p.set('sortDir', sd); p.delete('page')
                    setSearchParams(p)
                  }}
                  className="bg-transparent text-slate-200 text-sm font-semibold rounded-xl px-4 py-2 focus:outline-none cursor-pointer hover:text-white transition-colors"
                >
                  <option className="bg-[#111]" value="id-asc">Sort: Newest</option>
                  <option className="bg-[#111]" value="price-asc">Price: Low to High</option>
                  <option className="bg-[#111]" value="price-desc">Price: High to Low</option>
                  <option className="bg-[#111]" value="rating-desc">Top Rated</option>
                  <option className="bg-[#111]" value="reviewCount-desc">Most Popular</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 gap-4">
                <Spinner className="w-12 h-12 text-indigo-500" />
                <p className="text-slate-500 animate-pulse uppercase tracking-widest text-xs font-bold">Fetching Inventory...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-32 rounded-[3rem] border border-dashed border-white/10 bg-white/[0.01]">
                <p className="text-slate-500 text-lg">No matches found in this sector.</p>
                <button onClick={() => setSearchParams({})} className="mt-4 text-indigo-400 hover:underline">Clear all filters</button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 animate-fade-in">
                  {products.map(p => <ProductCard key={p.id} product={p} />)}
                </div>

                {/* Beast-Level Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-3 mt-20">
                    <button
                      disabled={page === 0}
                      onClick={() => setParam('page', page - 1)}
                      className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-400 disabled:opacity-20 hover:bg-white/10 hover:text-white transition-all shadow-xl"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
                        {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setParam('page', i)}
                            className={`w-10 h-10 rounded-xl text-sm font-black transition-all duration-300 ${i === page ? 'bg-indigo-600 text-white shadow-lg scale-110' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                        >
                            {String(i + 1).padStart(2, '0')}
                        </button>
                        ))}
                    </div>

                    <button
                      disabled={page === totalPages - 1}
                      onClick={() => setParam('page', page + 1)}
                      className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-400 disabled:opacity-20 hover:bg-white/10 hover:text-white transition-all shadow-xl"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}