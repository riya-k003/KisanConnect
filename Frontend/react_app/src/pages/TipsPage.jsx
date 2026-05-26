<div className="min-h-screen bg-[#0b1120] text-white">
  
  <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 p-6">

    {/* LEFT SIDEBAR */}
    <div className="col-span-3 hidden lg:block">
      
      <div className="sticky top-6 rounded-3xl border border-white/10 bg-[#131c31] p-6">
        
        <h1 className="text-3xl font-black text-green-400">
          🌱 AgroSphere
        </h1>

        <p className="mt-3 text-slate-400">
          Community knowledge for smarter farming.
        </p>

        <div className="mt-8 space-y-3">

          <button className="w-full rounded-2xl bg-green-500 py-3 font-semibold text-black transition hover:scale-[1.02]">
            Home
          </button>

          <button className="w-full rounded-2xl bg-white/5 py-3 text-slate-300 hover:bg-white/10">
            Trending Tips
          </button>

          <button className="w-full rounded-2xl bg-white/5 py-3 text-slate-300 hover:bg-white/10">
            Saved
          </button>

        </div>
      </div>
    </div>

    {/* CENTER FEED */}
    <div className="col-span-12 lg:col-span-6">

      {/* CREATE BOX */}
      <div className="mb-6 rounded-3xl border border-white/10 bg-[#131c31] p-5 shadow-2xl">
        <TipForm />
      </div>

      {/* FEED */}
      <div className="space-y-6">
        {tips.map((tip) => (
          <TipCard key={tip.tip_id} tip={tip} />
        ))}
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="col-span-3 hidden xl:block">

      <div className="sticky top-6 rounded-3xl border border-white/10 bg-[#131c31] p-6">
        
        <h2 className="text-xl font-bold">
          🔥 Trending Topics
        </h2>

        <div className="mt-5 flex flex-wrap gap-3">
          <span className="rounded-full bg-green-500/20 px-4 py-2 text-green-300">
            Wheat
          </span>

          <span className="rounded-full bg-yellow-500/20 px-4 py-2 text-yellow-300">
            Irrigation
          </span>

          <span className="rounded-full bg-blue-500/20 px-4 py-2 text-blue-300">
            Fertilizer
          </span>
        </div>
      </div>
    </div>

  </div>
</div>