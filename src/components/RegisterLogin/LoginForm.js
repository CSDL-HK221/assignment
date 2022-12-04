import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import homeBg from "../../img/thumbnail.png";
import "./RegLogForm.scss";
import axios from 'axios'

const LoginForm = () => {
   const [account, setAccount] = useState({})
   const handleChange = (e) => {
      setAccount({
          ...account,
          [e.target.name]: e.target.value
      })
   }
   console.log(account)
   const handleLogin = async (e) => {
      e.preventDefault();
      try {
         axios.post(`http://localhost:3000/api/auth/login`,
                     {"username": account.username, "password": account.pasword})
         .then(res => console.log(res))
     } catch (err) {
      
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
                              <label htmlFor="">Email</label>
                              <input className="form-control" placeholder="Nhập email" name="email" onChange={handleChange}/>
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