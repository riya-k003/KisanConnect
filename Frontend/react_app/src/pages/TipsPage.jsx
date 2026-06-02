import { useTips } from "../hooks/useTips";
import TipCard from "../components/tips/TipCard.jsx";
import TipForm from "../components/tips/TipForm.jsx";
import {
  Home,
  flame,
  User,
  bookmark,
  stickyNote,
  users
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
    <>
    {/* TipsPage */}
      <div className="grid grid-cols-12 gap-6 min-h-screen border border-green-500">

        {/* Left sidebar */}
        <div className="border border-blue-500 col-span-12 lg:col-span-3 rounded-3xl p-6">
         
            <h1 className="text-3xl font-bold">
             🌾 KisanConnect
              </h1>
              <div className="mt-8 flex flex-col gap-3">
                <button className="rounded-xl p-3 text-left hover:bg-slate-100">
                  <Home size={20}/>
                  Home
                  </button>
                <button className="rounded-xl p-3 text-left hover:bg-slate-100">
                  <flame size={20}/>
                  Trending
                </button>
                <button className="rounded-xl p-3 text-left hover:bg-slate-100">
                  <bookmark size={20}/>
                  Saved
                </button>
                <button className="ronunded-xl p-3 text-left hover:bg-slate-100">
                  <stickyNote size={20}/>
                  My Tips
                </button>
                 <button className="rounded-xl p-3 text-left hover:bg-slate-100">
                  <users size={20}/>
                  Communities
                </button>
                <button className="rounded-xl p-3 text-left hover:bg-slate-100">
                  <User size={20}/>
                  Profile
                </button>
              </div>
        </div>

        {/* feed section*/}
        <div className="border border-yellow-500 col-span-12 lg:col-span-6">
          {/* header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold">
              Farmer Tips
              </h1>

              <p className="text-slate-500">
                Share knowledge. Help farmers
              </p>
          </div>

         
            {/* Create tips */}
            <div className="mb-6 border border-yellow-500 rounded-3xl p-6">
              <TipForm 
              onSubmit={handlePostTip} 
              error={error} 
              setError={setError} 
              />
            </div>

            {/* Tips Cards */}
            <div className="space-y-6">
                {loading ? (
            <p>Loading...</p>
          ) : tips.length === 0 ? (
            <p>No tips available</p>
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
        </div>

          {/* right sidebar */}
          <div className="col-span-12 lg:col-span-3 border border-red-500 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-6">
              🔥Trending topics
            </h2>

            <div className="space-y-6">
              <div>🌾Wheat Farming</div>
              <div>💧Irigation</div>
              <div>🌱Organic Farming</div>
              <div>虫Pest Control</div>

            </div>
          </div>
      </div>
    </>
  );
}
export default TipsPage;
