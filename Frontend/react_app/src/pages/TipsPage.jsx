import { useTips } from "../hooks/useTips";
import { useNavigate } from "react-router-dom";
import TipCard from "../components/tips/TipCard.jsx";
import TipForm from "../components/tips/TipForm.jsx";
import   SidebarButton   from "../components/Layout/SidebarButton.jsx";
import motivationBg from "../assets/motivation-bg.png"
import {
  Home,
  Flame,
  User,
  Bookmark,
  StickyNote,
  Users,
  Sprout,
  Search,
  Bot,
} from "lucide-react";

function TipsPage() {
  const {
    tips,
    loading,
    loadingMore,
    hasMore,
    handleLoadMore,
    error,
    setError,
    handleLike,
    handleDelete,
    handlePostTip,
    comments,
    openComment,
    commentData,
    handleCommentClick,
    handleCommentChange,
    handleCommentPost,
    searchQuery,
    setSearchQuery,
  } = useTips();

  const navigate = useNavigate();

  return (
  <div className="min-h-screen bg-[#F4F6F0]">
    {/* Top header (mobile only) */}
    <header className="lg:hidden sticky top-0 z-50 bg-[#F7F8F3] border-b border-[#E8EDE0] px-4 py-2 flex items-center justify-between shadow-sm">
      <h2 className="text-lg font-bold text-[#2F6B3F] flex items-center gap-1">
        <Sprout size={30} /> KisanConnect
      </h2>
      <nav className="flex items-center gap-1">
         <SidebarButton icon={Home} active />
          <SidebarButton icon={Flame} />
          <SidebarButton icon={Bookmark} />
          <SidebarButton icon={StickyNote} />
          <SidebarButton icon={Users} />
          <SidebarButton icon={User} />
          <SidebarButton icon={Bot} onClick={() => navigate("/ai-assistant")} />
      </nav>
    </header>


    {/* Main Layout*/}
<div className="max-w-[1400px] mx-auto px-6 py-6 flex gap-10 items-start">

        {/* Left sidebar */}
        <aside className="hidden lg:flex flex-col w-[280px] min-h-[calc(100vh-40px)] sticky top-4 bg-white border border-[#E8EDE0] rounded-[32px] px-7 py-8 shadow-sm
">
  <div className=" h-[15vh] rounded-3xl content-center">
            <h2 className="flex items-center gap-4 m text-2xl font-bold text-[#2F6B3F]">
              <Sprout size={34}/>
             KisanConnect
              </h2>
            
             <p className=" text-[#666] text-[15px] leading-8">
                Grow together, share knowledge, prosper together.
              </p>
              </div>
              <div className="flex  h-[50px] justify-center itmes-center ">
              <button
  className="h-10 w-[200px] bg-[#57B847] hover:bg-[#4EA73F] text-white font-semibold text-lg rounded-2xl shadow-sm transition-all duration-20 mx-10 my-10
"
>
  + Create Tip
</button>
</div>
          <div className="h-[35vh]" >
            <nav className="flex flex-col gap-2 px-1">
                <SidebarButton icon={Home} active>
                  Home
                  </SidebarButton>
                <SidebarButton icon={Flame}>
                  Trending
                </SidebarButton>
                <SidebarButton icon={Bookmark}>
                  Saved
                </SidebarButton>
                <SidebarButton icon={StickyNote}>
                  My Tips
                </SidebarButton>
                 <SidebarButton icon={Users}>
                  Communities
                </SidebarButton>
                <SidebarButton icon={User}>
                  Profile
                </SidebarButton>
                <SidebarButton icon={Bot} onClick={() => navigate("/ai-assistant")}>
  AI Assistant
</SidebarButton>
              </nav>
              </div>
               <div className="flex justify-center mt-auto pt-8 ">
  <div
    className="
    h-[33vh]
    w-[16vw]
    overflow-hidden
    rounded-3xl
    border border-[#E8EDE0]
    bg-gradient-to-b from-[#FAFBF8] to-[#F1F6EC]
    shadow-sm
    flex flex-col justify-top
    p-5
    relative
    bg-cover
    bg-center
    "
    style={{
      backgroundImage:`url(${motivationBg})`
    }}
  >
    <div className="absolute insert-0 bg-black/20"></div>

    <div className="relative z-10">
    
                <h3 className="font-semibold text-[#2F6B3F]">🌱Daily Motivation</h3>
                <p className="text-lg font-semibold text-[#666] mt-2 leading-relaxed">
                  Small steps today,
                  bigger harvest tomorrow.
                </p>
                

              </div>
              </div>
              </div>
        </aside>

        {/* feed section*/}
        <main className="flex-1 min-w-0 flex flex-col gap-6">
          {/* header */}
          <div>
            <h1 className="text-[32px] font-bold text-[#112214] tracking-tight flex items-center gap-2">
              Farmer Tips <span className="text-2xl">🌿</span>
              </h1>

              <p className="text-[#667366] text-[15px] mt-1">
                Share knowledge. Help farmers grow.
              </p>

              {/* Search bar */}
<div className="relative mb-6">
  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999] w-4 h-4" />
  <input
    type="text"
    placeholder="Search tips by title, category..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#E8EDE0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#57B847]"
  />
</div>
          </div>
        <div className="flex gap-8 items-start w-full">
        <div className="flex-1 min-w-0 flex flex-col">
          
            {/* Create tips */}
            <div className="bg-white border border-[#E8EDE0] rounded-3xl p-6 shadow-sm mb-8">
              <TipForm 
              onSubmit={handlePostTip} 
              error={error} 
              setError={setError} 
              />
            </div>

           

            {/* Tips Cards */}
            <div className="flex flex-col gap-5 mt-2">
                {loading ? (
            <p className="text-[#5555E55] text-center py-8">Loading...</p>
          ) : tips.length === 0 ? (
            <p className="text-[#5555E55] text-center py-8">No tips available</p>
          ) : (
            tips.map((tip) => (
              <TipCard
                key={tip.tip_id}
                tip={tip}
                onLike={handleLike}
                onDelete={handleDelete}
                comments={comments}
                openComment={openComment}
                commentData={commentData}
                onCommentClick={handleCommentClick}
                onCommentChange={handleCommentChange}
                onCommentPost={handleCommentPost}
              />

            ))
          )}
            </div>
            {!loading && hasMore && (
  <button
    onClick={handleLoadMore}
    disabled={loadingMore}
    className="mx-auto mt-4 px-6 py-2.5 rounded-2xl border border-[#E8EDE0] bg-white text-[#2F6B3F] font-medium hover:bg-[#F1F6EC] transition-colors disabled:opacity-50"
  >
    {loadingMore ? "Loading..." : "Load More"}
  </button>
)}
            </div>
            {/* right sidebar */}
          <aside className="hidden xl:flex flex-col w-56 shrink-0 sticky top-6 self-start bg-[#F7F8F3] border border-[#E8EDE0] rounded-3xl p-6 shadow-sm gap-4">
            <h2 className="text-[17px] font-bold text-[#112214] flex items-center gap-2 px-1">
              🔥Trending topics
            </h2>

            <div className="flex flex-col gap-1.5">
              {[
                {icon: "🌾" , label: "Wheat Farming" , count: "1.2k posts"},
                {icon: "💧" , label: "Irrigation" , count: "980 posts"},
                {icon: "🌱" , label: "Organic Farming" , count: "870 posts"},
                {icon: "🐛" , label: "Pest Control" , count: "620 posts"},
                {icon: "🪱" , label: "Soil Health" , count: "1510 posts"}
              ].map(({icon , label , count})=>(
                <button
                key={label}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#EEF2E6] transition-color text-left w-full">
                  <span className="text-xl">{icon}</span>
                  <div>
                    <p className="text-sm font-medium text-[#1A2E1A]">{label}</p>
                    <p className="text-xs text-[#555E55]">{count}</p>
                  </div>
                </button>
              ))}

            </div>
            <button className="text-sm text-[#4CAF50] hover:text-[#2A6B2A] font-medium text-left transition-colors">
              View all topics 
            </button>
          </aside>
          </div>
        </main>

          
      </div>
      </div>
  );
}
export default TipsPage;
