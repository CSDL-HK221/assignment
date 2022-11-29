import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PostDetails.scss'

const PostDetails = () => {
    const posts = require('../../data/posts.json')
    const { postId } = useParams();
    const [details, setDetails] = useState({});
    useEffect(() => {
        if (posts.length) {
           const matchedPost = posts.find((post) => post.id === postId);
           setDetails(matchedPost);
        }
     }, [posts]);
     const {
        title,
        content,
        author,
        createAt,
     } = details;
     return (
        <section className="main">
            <div className="container">
                <div className="blog-section">
                  <h3>{title}</h3>
                  <div className="my-4">
                    <h5>{author}</h5>
                    <p style = {{color: '#757575'}}>{createAt}</p>
                  </div>
                  <p className="content">{content}</p>
               </div>
            </div>
        </section>
     )

}

export default PostDetails
