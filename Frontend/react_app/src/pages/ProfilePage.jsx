import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tipsService } from "../services/tipsService"; // CHECK: file ka naam aur path
 
function ProfilePage() {
  const navigate = useNavigate();
 
  const [profile, setProfile] = useState(null);
  const [tips, setTips] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [deletingId, setDeletingId] = useState(null);
 
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await tipsService.getMyProfile();
        setProfile(data.user);
        setTips(data.tips);
        setStatus("ready");
      } catch (err) {
        // apiRequest 401/403 par token hata deta hai, to token na mile to login par bhejo
        if (!localStorage.getItem("token")) {
          localStorage.removeItem("name");
          navigate("/");
          return;
        }
        setStatus("error");
      }
    };
 
    loadProfile();
  }, [navigate]);
 
  const handleDelete = async (tipId) => {
    if (!window.confirm("यह टिप हमेशा के लिए हट जाएगी। हटाएँ?")) return;
 
    setDeletingId(tipId);
 
    try {
      await tipsService.deleteTip(tipId);
      setTips((prev) => prev.filter((tip) => tip.tip_id !== tipId));
    } catch (err) {
      if (!localStorage.getItem("token")) {
        localStorage.removeItem("name");
        navigate("/");
        return;
      }
      window.alert("टिप नहीं हटी। थोड़ी देर बाद फिर कोशिश करें।");
    } finally {
      setDeletingId(null);
    }
  };
 
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
  };
 
  if (status === "loading") {
    return <div style={styles.message}>प्रोफ़ाइल लोड हो रही है...</div>;
  }
 
  if (status === "error") {
    return (
      <div style={styles.message}>
        प्रोफ़ाइल नहीं खुली। पेज दोबारा खोलें।
      </div>
    );
  }
 
  const totalLikes = tips.reduce(
    (sum, tip) => sum + Number(tip.likes_count || 0),
    0
  );
  const isVerified = Boolean(profile.is_verified);
 
  return (
    <div style={styles.page}>
      <button
        type="button"
        style={styles.backBtn}
        onClick={() => navigate("/tips")}
      >
        ← फ़ीड पर वापस जाएँ
      </button>
 
      <div style={styles.profileCard}>
        <div style={styles.avatar} aria-hidden="true">
          {profile.name?.charAt(0).toUpperCase()}
        </div>
 
        <div style={styles.profileInfo}>
          <h1 style={styles.name}>{profile.name}</h1>
          <div style={styles.email}>{profile.email}</div>
 
          <span
            style={isVerified ? styles.badgeVerified : styles.badgeUnverified}
          >
            {isVerified ? "ईमेल सत्यापित" : "ईमेल सत्यापित नहीं"}
          </span>
        </div>
 
        <button type="button" style={styles.logoutBtn} onClick={handleLogout}>
          लॉग आउट
        </button>
      </div>
 
      <div style={styles.stats}>
        <div style={styles.statBox}>
          <div style={styles.statNumber}>{tips.length}</div>
          <div style={styles.statLabel}>मेरी टिप्स</div>
        </div>
        <div style={styles.statBox}>
          <div style={styles.statNumber}>{totalLikes}</div>
          <div style={styles.statLabel}>कुल लाइक</div>
        </div>
      </div>
 
      <h2 style={styles.sectionTitle}>मेरी टिप्स</h2>
 
      {tips.length === 0 ? (
        <div style={styles.empty}>
          आपने अभी तक कोई टिप नहीं डाली। फ़ीड से अपनी पहली टिप डालें।
        </div>
      ) : (
        <div style={styles.tipList}>
          {tips.map((tip) => (
            <article key={tip.tip_id} style={styles.tipCard}>
              {tip.image_url && (
                <img
                  src={tip.image_url}
                  alt={tip.title}
                  style={styles.tipImage}
                  loading="lazy"
                />
              )}
 
              <div style={styles.tipBody}>
                <div style={styles.tipMeta}>
                  <span style={styles.category}>{tip.category}</span>
                  <span style={styles.date}>
                    {new Date(tip.created_at).toLocaleDateString("hi-IN")}
                  </span>
                </div>
 
                <h3 style={styles.tipTitle}>{tip.title}</h3>
                <p style={styles.tipContent}>{tip.content}</p>
 
                <div style={styles.tipFooter}>
                  <span style={styles.counts}>
                    {Number(tip.likes_count)} लाइक | {Number(tip.comments_count)} कमेंट
                  </span>
 
                  <button
                    type="button"
                    style={{
                      ...styles.deleteBtn,
                      opacity: deletingId === tip.tip_id ? 0.5 : 1,
                    }}
                    onClick={() => handleDelete(tip.tip_id)}
                    disabled={deletingId === tip.tip_id}
                    aria-label={`${tip.title} टिप हटाएँ`}
                  >
                    {deletingId === tip.tip_id ? "हट रही है..." : "हटाएँ"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
 
// Rang aur style KisanChat wale green theme se milte hain
const styles = {
  page: {
    maxWidth: "720px",
    margin: "0 auto",
    padding: "20px 16px 40px",
    fontFamily: '"Inter", "Noto Sans Devanagari", sans-serif',
    color: "#263b30",
  },
 
  backBtn: {
    marginBottom: "14px",
    padding: "6px 0",
    border: "none",
    background: "transparent",
    color: "#197653",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
  },
 
  message: {
    padding: "40px 16px",
    textAlign: "center",
    color: "#668272",
    fontSize: "14px",
  },
 
  profileCard: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
    padding: "20px",
    border: "1px solid #e2eee7",
    borderRadius: "20px",
    background: "#ffffff",
  },
 
  avatar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "64px",
    height: "64px",
    flexShrink: 0,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #087f5b 0%, #1d9e75 100%)",
    color: "#ffffff",
    fontSize: "26px",
    fontWeight: "700",
  },
 
  profileInfo: {
    flex: 1,
    minWidth: "180px",
  },
 
  name: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
  },
 
  email: {
    margin: "4px 0 8px",
    color: "#668272",
    fontSize: "13px",
    overflowWrap: "anywhere",
  },
 
  badgeVerified: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "999px",
    background: "#d9f3e4",
    color: "#197653",
    fontSize: "12px",
    fontWeight: "600",
  },
 
  badgeUnverified: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "999px",
    background: "#fdecea",
    color: "#a93226",
    fontSize: "12px",
    fontWeight: "600",
  },
 
  logoutBtn: {
    padding: "9px 16px",
    border: "1px solid #bce4cf",
    borderRadius: "12px",
    background: "#f1fbf5",
    color: "#197653",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
  },
 
  stats: {
    display: "flex",
    gap: "12px",
    margin: "16px 0 24px",
  },
 
  statBox: {
    flex: 1,
    padding: "14px",
    border: "1px solid #e2eee7",
    borderRadius: "16px",
    background: "#f7fbf8",
    textAlign: "center",
  },
 
  statNumber: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#087f5b",
  },
 
  statLabel: {
    marginTop: "2px",
    color: "#668272",
    fontSize: "12px",
  },
 
  sectionTitle: {
    margin: "0 0 12px",
    fontSize: "16px",
    fontWeight: "700",
  },
 
  empty: {
    padding: "28px 16px",
    border: "1px dashed #bce4cf",
    borderRadius: "16px",
    background: "#f7fbf8",
    color: "#668272",
    fontSize: "14px",
    textAlign: "center",
  },
 
  tipList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
 
  tipCard: {
    overflow: "hidden",
    border: "1px solid #e2eee7",
    borderRadius: "16px",
    background: "#ffffff",
  },
 
  tipImage: {
    display: "block",
    width: "100%",
    maxHeight: "220px",
    objectFit: "cover",
  },
 
  tipBody: {
    padding: "14px 16px",
  },
 
  tipMeta: {
    display: "flex",
    justifyContent: "space-between",
    gap: "8px",
    marginBottom: "6px",
    fontSize: "12px",
  },
 
  category: {
    padding: "2px 9px",
    borderRadius: "999px",
    background: "#f1fbf5",
    color: "#197653",
    fontWeight: "600",
  },
 
  date: {
    color: "#789083",
  },
 
  tipTitle: {
    margin: "0 0 4px",
    fontSize: "15px",
    fontWeight: "700",
  },
 
  tipContent: {
    margin: "0 0 12px",
    fontSize: "13px",
    lineHeight: "1.6",
    overflowWrap: "anywhere",
  },
 
  tipFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
  },
 
  counts: {
    color: "#668272",
    fontSize: "12px",
  },
 
  deleteBtn: {
    padding: "6px 12px",
    border: "1px solid #f1c4bf",
    borderRadius: "10px",
    background: "#fff5f4",
    color: "#a93226",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  },
};
 
export default ProfilePage;

