import { useTips } from "../hooks/useTips";
import {TipCard} from "../tips/TipCard.jsx";
import {TipForm} from "../tips/TipForm.jsx";

function TipsPage() {
  const {
    tips,
    loading,
    error,
    setError,
    handleLike,
    handleDelete,
    handlePostTip,
  } = useTips();

  return (
    <>
      <div className="style.container">
        <div>
          {Loading ? (
            <p>Loading...</p>
          ) : tips.length === 0 ? (
            <p>No tips available</p>
          ) : (
            tips.map((tip) => 
            <TipCard key={tip.tip_id}
                     tip={tip}
                     onLike={handleLike}
                     onDelete={handleDelete} 
                     />
                    )
          )}
        </div>
        {error && <p style={{color: red}}> ⚠️ {error}</p>}

        <TipForm 
        onSubmit={handlePostTip}
        error={error}
        setError={setError}
        />
      </div>
    </>
  );
}
export default TipsPage;
