import './PostCard.scss'
import { useNavigate } from "react-router-dom";

const PostCard = (props) => {
    const {
        id, 
        title, 
        content,
        author,
    } = props.post
    const navigate = useNavigate();
    const handlePostDetails = (id) => {
        const url = `/blog/${id}`;
        navigate(url)
    };
    return (
        <div className="post-card" onClick={() => handlePostDetails(id)}>
            <h6>{author}</h6>
            <h4>{title}</h4>
            <p>{content}</p>
        </div>
    )
}

export default PostCard