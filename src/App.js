import Header from './components/Header/Header.js'
import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Courses from './pages/Courses'
import CourseDetails from './pages/CourseDetails/CourseDetails'
import LessonDetails from './pages/LessonDetails/LessonDetails'
import Posts from './pages/Posts'
import PostDetails from './pages/PostDetails/PostDetails'
import Register from './pages/Register'
import Footer from './components/Footer/Footer'
import './App.scss'

function App() {
  return (
    <>
      <Header></Header>
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="home" element = {<Home/>}/>
          <Route path="courses" element = {<Courses/>}/>
          <Route path="/course/:courseId" element = {<CourseDetails/>}/>
          <Route path="lessons" element = {<LessonDetails/>}/>
          <Route path="blog" element = {<Posts/>}/>
          <Route path="/blog/:postId" element = {<PostDetails/>}/>
          <Route path="login" element = {<Login/>}/>
          <Route path="register" element = {<Register/>}/>
          <Route path="profile" element = {<Profile/>}/>
        </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
