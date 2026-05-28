import { useTips } from "../hooks/useTips";
import TipCard from "../components/tips/TipCard.jsx";
import TipForm from "../components/tips/TipForm.jsx";

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
      <div className="min-h-screen bg-[#0f172a] text-white">
        <div className="sticky top-0 z-50 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-md">
        
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
        {error && <p style={{ color: "red" }}> ⚠️ {error}</p>}

        <TipForm onSubmit={handlePostTip} error={error} setError={setError} />
      </div>
    </>
  );
}
export default TipsPage;
