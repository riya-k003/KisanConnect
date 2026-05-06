import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tipsService } from "../services/tipsService";
import { validateTip } from "../utils/validateTip";

export function useTips() {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Error, setError] = useState("");
    const [comments, setComments] = useState({});
    const [openComment, setopenComment] = useState(null);
    const [commentData, setCommentData] = useState({ content: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTips = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/tips`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem("token");
                    navigate("/");
                    return;
                }
                const data = await res.json();
                setTips(data.tips);
            } catch (err) {
                console.log(err);
                setError("Something went wrong while fetching tips");
            }
            finally {
                setLoading(false);
            }
        };

        fetchTips();
    }, []);

    const handleLike = async (tip_id) => {
        setTips((prev) => {
            prev.map((tip) => {
                (tip.tip_id === tip_id) ? {
                    ...tip,
                    isLiked: !tip.isLiked,
                    likes_count: tip.isliked ? tip.likes_count - 1 : tip.likes_count + 1,
                }
                    : tip
            })
        });
        await tipServices.likeTip(tip_id);
    };

    const handleDelete = async (tip_id) => {
        try {
            await tipServices.deleteTip(tip_id);
            setTips((prev) =>
                prev.filter(t => t.tip_id !== tip_id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handlePostTip = async (tipData, content) => {
        const validationError = validateTip(tipData);
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const data = await tipServices.createTip(tipData);
            if (data.tip) {
                setTips((prev) => [data.tip, ...prev]);
            }
            setError("");
            setTipsData({ title: "", category: "", content: "" });
        } catch (err) {
            setError(err.message || "something went wrong while postig the tip");
        }
    };

    const handelcommentClick = async (tip_id) => {
        if (openComment === tip_id) {
            setopenComment(null);
            return;
        } else {
            setopenComment(tip_id);
        }

        if (!comments[tip_id]) {
            try {
                const data = await tipService.getComment(tip_id);
                setComments((prev) => ({
                    ...prev,
                    [tip_id]: Array.isArray(fetchedComments) ? fetchedComments : [],
                }));
            } catch (err) {
                setError("Something went wrong while fetching comments");
            }
        }
    };

    const handleCommentChange = (e, tip_id) => {
        setError("");
        const value = e.target.value
        setCommentData({
            ...CommentData,
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
            const res = await tipServices.postComment(tip_id, content);
            const data = await tipServices.getComment();

            setComment({
                ...commentData,
                [tip_id]: Array.isArray(data) ? data : [],
            });

            setCommentData({
                ...commentData,
                [tip_id]: ""
            });
        } catch (error) {
            setError("Something went wrong wile posting the comment");
        }
    }

    return {
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
    };
};