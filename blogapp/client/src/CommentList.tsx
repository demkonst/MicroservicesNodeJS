export interface Comment { id: string; content: string; status: 'pending' | 'approved' | 'rejected' }
interface Props { comments: Comment[]; }

const CommentList = ({ comments }: Props) => {

    const renderedComments = comments.map(comment => {
        let content;

        switch (comment.status) {
            case 'pending':
                content = 'This comment is awaiting modration';
                break;
            case 'approved':
                content = comment.content;
                break;
            case 'rejected':
                content = 'This comment has been rejected';
                break;
        }

        return <li key={comment.id}>{content}</li>
    });

    return (
        <ul>{renderedComments}</ul>
    );
};

export default CommentList;