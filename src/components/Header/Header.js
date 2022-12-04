import {useState, useRef, useEffect, useContext} from 'react';
import "./Header.scss";
import { Link } from "react-router-dom";
import menu from "../../img/menu.png";
import logo from "../../img/logo.png";
import userIcon from "../../img/user.png";
import Dropdown from 'react-bootstrap/Dropdown';
import avatar from '../../img/avatar.png'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import axios from 'axios'

const Header = () => {
   const { auth, setAuth } = useContext(AuthContext)
   const navigate = useNavigate();
   const handleLogout = async () => {
      try {
         const res = await axios.post('http://localhost:3000/api/auth/logout');
         setAuth({});
         navigate('/')
      } catch (err) {
            if (!err?.response) {
               alert("Sever không phản hồi.");
            }
            else alert("Đăng xuất thất bại.");
      }
   }
   return (
      <nav className="navbar navbar-expand-md fixed-top">
         <div className="container-lg">
            <Link className="link navbar-brand d-flex " to="/home">
               <img src = {logo} className ="d-inline-block align-text-top"></img>
               <span className = "logo">
                  <h3 className = "logo-brand">DBEL</h3>
                  <p style = {{fontSize: '10px'}}>Database Electronic Learning System</p>
               </span>
            </Link>
            <button
               className="navbar-toggler"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target="#navbarSupportedContent"
               aria-controls="navbarSupportedContent"
               aria-expanded="false"
               aria-label="Toggle navigation"
               style = {{marginLeft: 'auto'}}
            >
                <img className="menu" src={menu} alt="" />
            </button>
            <div className="collapse navbar-collapse order-4 order-md-2" id="navbarSupportedContent">
               <ul className="navbar-nav">
                  <li className="nav-item">
                     <Link className="link" to="/">
                        Trang chủ
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link className="link" to="/courses">
                        Khóa học
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link className="link" to="/blog">
                        Blog
                     </Link>
                  </li>
               </ul>
            </div>
               {auth?.username ? (
                  <>
                  <span className="avatar order-3" style={{cursor: "pointer", position: "relative"}}>
                     <Dropdown align="end">
                        <Dropdown.Toggle id="dropdown-custom-components">
                           <span className="link">
                              <img src={avatar} style = {{width: '30px'}} alt="" />
                           </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                           <Dropdown.Item onClick={() => navigate('/profile')}>Thông tin cá nhân</Dropdown.Item>
                           <Dropdown.Item onClick={() => navigate('/user-courses')}>Khóa học đã đăng kí</Dropdown.Item>
                           <Dropdown.Item onClick={() => navigate('/user-posts')}>Bài viết của tôi</Dropdown.Item>
                           <Dropdown.Divider />
                           {auth?.role === 'instructor' ? <Dropdown.Item href='/instructor-courses'>Khóa học của tôi</Dropdown.Item> : <></>}
                           {auth?.role === 'admin' ? <Dropdown.Item href='/users'>Danh sách users</Dropdown.Item> : <></>}
                           <Dropdown.Item onClick={() => handleLogout()}>Đăng xuất</Dropdown.Item>
                        </Dropdown.Menu>
                     </Dropdown>
                  </span>
                 
                  </>
               ) : (
                  <Link className="link order-3" to="/login">
                     <img src={userIcon} style = {{width: '30px'}} alt="" />
                  </Link>
               )}            
         </div>
      </nav>
   );
};

export default Header;