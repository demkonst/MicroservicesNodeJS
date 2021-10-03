import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface Props { postId: string; }
interface Comment { id: string; content: string; }

const CommentList = ({ postId }: Props) => {
    const [comments, setComments] = useState<Comment[]>([]);

    const fetchComments = useCallback(async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        setComments(res.data);
    }, [postId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const renderedComments = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>
    });

    return (
        <ul>{renderedComments}</ul>
    );
};

export default CommentList;