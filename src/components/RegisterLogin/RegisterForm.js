import React, { useState } from "react";
import { Link } from "react-router-dom";
import homeBg from "../../img/thumbnail.png";
import "./RegLogForm.scss";
import axios from 'axios'

const RegisterForm = () => {
   const [account, setAccount] = useState({})

   const handleChange = (e) => {
      setAccount({
          ...account,
          [e.target.name]: e.target.value
      })
   }

   const handleRegister = async (e) => {
      e.preventDefault();
      if (account.password !== account.confirmPassword) {
         alert("Hai mật khẩu không khớp nhau")
         return;
      }
      try {
         const res = await axios.post(`http://localhost:3000/api/auth/register`,
                     {  "username": account.username, 
                        "password": account.password, 
                        "email": account.email,
                        "confirmPassword": account.confirmPassword},
                     {
                        'Content-Type': 'application/json',
                    });
         //const role = res?.data.data.role;
         console.log(res)
     } catch (e) {
         if (e.response?.status === 500) {
            alert("Username hoặc email đã có rồi");
         }
     }
   }
   return (
    <div className="reglog-form">
         <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col img">
                  <img className="img-fluid" src={homeBg} alt="" />
               </div>
               <div className="col">
                  <div className="form-box">
                     <h4>Đăng ký vào DBEL!</h4>
                     <div className="divider">
                        <span></span>
                     </div>
                     <form className="mb-0 text-start" onSubmit={handleRegister}>
                        <div className="row">
                           <div className="form-group col-12">
                              <label htmlFor="">Email</label>
                              <input type = "email" className="form-control" placeholder="Nhập email" name="email" onChange={handleChange} required/>
                           </div>
                           <div className="form-group col-12">
                              <label htmlFor="">Username</label>
                              <input className="form-control" placeholder="Nhập username" name="username" onChange={handleChange} required/>
                           </div>
                           <div className="form-group col-12">
                              <label htmlFor="">Password</label>
                              <input type = "password" className="form-control" placeholder="Nhập password" name="password" onChange={handleChange} required/>
                           </div>
                           <div className="form-group col-12">
                              <label htmlFor="">Nhập lại password</label>
                              <input type = "password" className="form-control" placeholder="Nhập lại password" name="confirmPassword" onChange={handleChange} required/>
                           </div>
                        </div>
                        <div className="d-flex justify-content-between">
                           <p className="switcher">
                              Đã có tài khoản?{" "}
                              <Link className="link" to="/login">
                                 Đăng nhập
                              </Link>
                           </p>
                           <button type="submit" className="btn-black">
                              Đăng kí
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

export default RegisterForm;