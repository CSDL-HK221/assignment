import React, { useState, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import homeBg from "../../img/thumbnail.png";
import "./RegLogForm.scss";
import axios from 'axios'
import AuthContext from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
   const [account, setAccount] = useState({})
   const { auth, setAuth } = useContext(AuthContext)
   const navigate = useNavigate();

   const handleChange = (e) => {
      setAccount({
          ...account,
          [e.target.name]: e.target.value
      })
   }

   const handleLogin = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post(`http://localhost:3000/api/auth/login`,
                     {"username": account.username, "password": account.password},
                     {
                        'Content-Type': 'application/json',
                    });
         const role = res?.data.data.user.role;
         console.log(res.data.data)
         setAuth(res.data.data.user)
         console.log(role)
         navigate(`/`);
     } catch (e) {
         if (e.response?.status === 400) {
            alert("Sai mật khẩu");
         }
         else if (e.response?.status === 401) {
            alert("Sai mật khẩu.");
         } else {
            alert("Không tìm thấy người dùng có tên đăng nhập này");
         } 
     }
   }
   return (
      <div className="reglog-form">
         <div className="container">
            <div className="row row justify-content-center align-items-center">
               <div className="col img">
                  <img className="img-fluid" src={homeBg} alt="" />
               </div>
               <div className="col">
                  <div className="form-box">
                     <h4>Đăng nhập vào DBEL!</h4>
                     <div className="divider">
                        <span></span>
                     </div>
                     <form className="mb-0 text-start" onSubmit={handleLogin}>
                        <div className="row">
                           <div className="form-group col-12">
                              <label htmlFor="">Username</label>
                              <input className="form-control" placeholder="Nhập username" name="username" onChange={handleChange}/>
                           </div>
                           <div className="form-group col-12">
                              <label htmlFor="">Password</label>
                              <input className="form-control" placeholder="Nhập password" name="password" onChange={handleChange}/>
                           </div>
                        </div>
                        <div className="d-flex justify-content-between">
                           <p className="switcher">
                              Chưa có tài khoản?{" "}
                              <Link className="link" to="/register">
                                 Đăng kí
                              </Link>
                           </p>
                           <button type="submit" className="btn-black">
                              Đăng nhập
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default LoginForm;