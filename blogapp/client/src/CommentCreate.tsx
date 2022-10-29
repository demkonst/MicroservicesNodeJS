import { FormEvent, useState } from "react";
import axios from "axios";

interface Props { postId: string; }

const CommentCreate = ({ postId }: Props) => {
    const [content, setContent] = useState('');

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.post(`http://posts.com/posts/${postId}/comments`, { content });
        setContent('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label> New comment</label>
                    <input className="form-control" value={content} onChange={(e => setContent(e.target.value))} />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default CommentCreate;