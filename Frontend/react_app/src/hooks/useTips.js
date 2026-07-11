import { useEffect, useState , useCallback} from "react";
import { useNavigate } from "react-router-dom";
import { tipsService } from "../services/tipsService";
import { validateTip } from "../utils/validateTip";


const LIMIT = 10;

export function useTips() {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const[loadingMore , setLoadingMore] = useState(false);
    const [hasMore , setHasMore] = useState(true);
    const [page , setPage] = useState(1);
    const [error, setError] = useState("");
    const [comments, setComments] = useState({});
    const [openComment, setopenComment] = useState(null);
    const [commentData, setCommentData] = useState({ content: "" });
    const [searchQuery , setSearchQuery] = useState("");
    const navigate = useNavigate();

    const fetchTips = useCallback(async (pageNum , append = false) =>{
        try{
            if(append) setLoadingMore(true);
            else setLoading(true);

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/tips?page=${pageNum}&limit=${LIMIT}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem("token");
                    navigate("/");
                    return;
                }
                const data = await res.json();
                const newTips =  data.tips || [];

                setTips((prev) => (append ? [...prev, ...newTips] : newTips));
                setHasMore(newTips.length === LIMIT);
            } catch (err) {
                console.log(err);
                setError("Something went wrong while fetching tips");
            }
            finally {
                setLoading(false);
                setLoadingMore(false);
            }

    }, [navigate]);
    useEffect(() =>{
        fetchTips(1 , false);
    }, [fetchTips]);

        const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchTips(nextPage, true);
    };

    const handleLike = async (tip_id) => {
        setTips((prev) => 
            prev.map((tip) => {
                return (tip.tip_id === tip_id) ? {
                    ...tip,
                    isLiked: !tip.isLiked,
                    likes_count: tip.isLiked ? tip.likes_count - 1 : tip.likes_count + 1,
                }
                    : tip;
            })
        );
        try{
        await tipsService.likeTip(tip_id);
        }catch(err){
            console.log("Like failed, reverting:" , err);
            // agar fail hojaye wapas prani state par le aao
            setTips((prev)=>
            prev.map((tip)=>
            tip.tip_id === tip_id?{
                ...tip,
                isLiked: !tip.isLiked,
                likes_count: tip.isLiked ? tip.likes_count -1 : tip.likes_count + 1,
            }
            : tip
        )
    );
        }
    };

    const handleDelete = async (tip_id) => {
        try {
            await tipsService.deleteTip(tip_id);
            setTips((prev) =>
                prev.filter(t => t.tip_id !== tip_id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handlePostTip = async (formData, resetForm) => {
        console.log("post button is clicked");
        

        try {
            const data = await tipsService.createTip(formData);
            if (data.tip) {
                setTips((prev) => [data.tip, ...prev]);
            }
            setError("");
            resetForm();
        } catch (err) {
            setError(err.message || "something went wrong while posting the tip");
        }
    };

    const handleCommentClick = async (tip_id) => {
        if (openComment === tip_id) {
            setopenComment(null);
            return;
        } else {
            setopenComment(tip_id);
        }

        if (!comments[tip_id]) {
            try {
                const data = await tipsService.getComments(tip_id);
                setComments((prev) => ({
                    ...prev,
                    [tip_id]: Array.isArray(data) ? data : [],
                }));
            } catch (err) {
                setError("Something went wrong while fetching comments");
            }
        }
    };

    const handleCommentChange = (e, tip_id) => {
        setError("");
        const value = e.target.value;
        setCommentData({
            ...commentData,
            [tip_id]: value
        });

    };

    const handleCommentPost = async (tip_id) => {
        const content = commentData[tip_id] || "";

        if (!content.trim()) {
            setError("Comment cannot be empty");
            return;
        }
        try {
            await tipsService.postComments(tip_id, content);
            const data = await tipsService.getComments(tip_id);

            setComments({
                ...comments,
                [tip_id]: Array.isArray(data) ? data : [],
            });

            setCommentData({
                ...commentData,
                [tip_id]: ""
            });
        } catch (error) {
            setError("Something went wrong while posting the comment");
        }
    };

    const filteredTips = searchQuery.trim()
        ? tips.filter((tip) =>
            tip.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tip.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tip.content?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : tips;

    return {
        tips: filteredTips,
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
    };
};