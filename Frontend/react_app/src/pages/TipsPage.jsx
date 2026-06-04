import { useTips } from "../hooks/useTips";
import TipCard from "../components/tips/TipCard.jsx";
import TipForm from "../components/tips/TipForm.jsx";
import   SidebarButton   from "../components/Layout/SidebarButton.jsx";
import {
  Home,
  Flame,
  User,
  Bookmark,
  StickyNote,
  Users,
  Sprout
} from "lucide-react";

function TipsPage() {
  const {
    tips,
    loading,
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
  } = useTips();

  return (
  <div className="min-h-screen bg-[#F4F6F0]">
    {/* Top header (mobile only) */}
    <header className="lg:hidden sticky top-0 z-bg-[#F7F8F3] border-b border-[#E8EDE0] px-4 py-2 flex itmes-center justify-between shadow-sm">
      <h2 className="text-lg font-bold text-[#2F6B3F] flex items-center gap-1">
        <Sprout size={20} /> KisanConnect
      </h2>
      <nav className="flex items-center gap-1">
         <SidebarButton icon={Home} active />
          <SidebarButton icon={Flame} />
          <SidebarButton icon={Bookmark} />
          <SidebarButton icon={StickyNote} />
          <SidebarButton icon={Users} />
          <SidebarButton icon={User} />
      </nav>
    </header>


    {/* Main Layout*/}
<div className="max-w-screen-xl mx-auto flex gap-6 p-4 lg:p-6 items-start">

        {/* Left sidebar */}
        <aside className="hidden lg:flex flex-col w-56 ml-4 shrink-0 h-screen sticky top-0 bg-[#F7F8F3] border border-[#E8EDE0] rounded-3xl p-6 shadow-sm gap-4 overflow-y-auto">
            <h2 className="flex itmes-center gap-2 text-xl font-bold text-[#2F6B3F]">
              <sprout size={22}/>
             KisanConnect
              </h2>

              <p className="text-[#555E55] text-sm leading-snug">
                Grow together, share knowledge, prosper together.
              </p>
              <button className="flex items-center justify-center gap-2 min-h-9 m- 4 bg-[#4CAF50] hover:bg-[#3A8A3A] text-white text-sm font-medium rounded-xl py-2.5 px-4 transition-colors">
                + Create Tip
              </button>

              <nav className="flex flex-col gap-3 mt-4">
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
              </nav>
               <div className="mt-auto mx-2 mb-2">
              <div className="flex flex-col h-full bg-white border border-[#E8EDE0] rounded-2xl p-4 m-3 mt-auto gap-2 shadow-sm ">
                <h3 className="text-sm font-semibold text-[#2F6B3F] flex items-center gap-1">🌱Daily Motivation</h3>
                <p className="text-xs text-[#555E55] leading-relaxed ">
                  Small steps today,
                  bigger harvest tomorrow.
                </p>
                <img className="rounded-xl w-full object-cover mt-1" src="/assets/motivation-bg.png" alt="Daily Motivation" />

              </div>
              </div>
        </aside>

        {/* feed section*/}
        <main className="flex-1 min-w-0 flex flex-col gap-6">
          {/* header */}
          <div>
            <h1 className="text-3xl font-bold text-[#1A2E1A]">
              Farmer Tips 🌿
              </h1>

              <p className="text-[#555E55] text-sm mt-1">
                Share knowledge. Help farmers grow.
              </p>
          </div>

         
            {/* Create tips */}
            <div className="bg-white border border-[#E8EDE0] rounded-3xl p-6 shadow-sm">
              <TipForm 
              onSubmit={handlePostTip} 
              error={error} 
              setError={setError} 
              />
            </div>

            {/* Tips Cards */}
            <div className="flex flex-col gap-5">
                {loading ? (
            <p className="text-[#5555E55]">Loading...</p>
          ) : tips.length === 0 ? (
            <p className="text-[#5555E55]">No tips available</p>
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
        </main>

          {/* right sidebar */}
          <aside className="hidden lg:flex flex-col w-56 shrink-0 sticky top-6 self-start bg-[#F7F8F3] border border-[#E8EDE0] rounded-3xl p-6 shadow-sm gap-5">
            <h2 className="text-lgfont-bold text-[#1A2E1A]">
              🔥Trending topics
            </h2>

            <div className="flex flex-col gap-3">
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
      </div>
  );
}
export default TipsPage;
