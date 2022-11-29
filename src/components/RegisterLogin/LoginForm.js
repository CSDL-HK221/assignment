import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import homeBg from "../../img/thumbnail.png";
import "./RegLogForm.scss";

const LoginForm = () => {
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
                     <form className="mb-0 text-start">
                        <div className="row">
                           <div className="form-group col-12">
                              <label htmlFor="">Email</label>
                              <input className="form-control" placeholder="Nhập email"/>
                           </div>
                           <div className="form-group col-12">
                              <label htmlFor="">Password</label>
                              <input className="form-control" placeholder="Nhập password"/>
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