import PostCard from '../components/PostCard/PostCard';
const Blog = () => {
    const posts = require('../data/posts.json')
    return (
        <section className="main">
            <div className="container">
               <div className="header-text">
                  <h3>Bài viết nổi bật</h3>
                  <p>Các bài viết chia sẻ về kinh nghiệm và các kỹ thuật</p>
               </div>
                  {
                    posts.map((post) => 
                        <PostCard post={post} key = {post.id}></PostCard>
                    )
                  }
            </div>
        </section>
    )
}

export default Blog;