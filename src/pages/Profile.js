import React, {useContext} from "react";
import avatar from '../img/avatar.png'
import {useGetUserById}from "../hooks/user";
import AuthContext from '../context/AuthProvider';
const Profile = () => {
   const { auth, setAuth } = useContext(AuthContext)
   /*const [user] = useGetUserById(auth.)*/
   /*console.log(user)*/
    return (
        <section className="main">
            <div className="container">
               <div className="form-box">
                  <div className="header-text">
                     <h3>Thông tin cá nhân</h3>
                  </div>
                  <div className = "avatar row mb-5">
                     <div class = "col d-flex justify-content-center">
                        <img src = {avatar} style = {{width: '100px', height: 'auto'}}/>
                     </div>
                     <div class = "col d-flex align-items-center justify-content-center">
                        <h4>Hi, {auth.username}!</h4>
                     </div>
                  </div>
                  <form className="mb-0 text-start">
                     <div className="row">
                        <div className="form-group col-6">
                           <label htmlFor="">Username</label>
                           <input className="form-control" placeholder="Nhập username" value={auth.username} disabled/>
                        </div>
                        <div className="form-group col-6">
                           <label htmlFor="">Email</label>
                           <input className="form-control" placeholder="Thay đổi email" value={auth.email}/>
                        </div>
                        <div className="form-group col-6">
                           <label htmlFor="">First Name</label>
                           <input className="form-control" placeholder="Nhập họ của bạn" value={auth.firstnam}/>
                        </div>
                        <div className="form-group col-6">
                           <label htmlFor="">Last Name</label>
                           <input className="form-control" placeholder="Nhập tên của bạn" value={auth.lastname}/>
                        </div>
                        <div className="form-group col-6">
                           <label htmlFor="">Ngày sinh</label>
                           <input type="date" className="form-control" placeholder="Chọn ngày sinh" value={auth.dob}/>
                        </div>
                        <div className="form-group col-6">
                           <label htmlFor="">Số điện thoại</label>
                           <input className="form-control" placeholder="Nhập số điện thoại" value={auth.phone}/>
                        </div>
                        <div className="form-group col-6">
                           <label htmlFor="">Password</label>
                           <input className="form-control" placeholder="Thay đổi mật khẩu"/>
                        </div>
                        <div className="form-group col-6">
                           <label htmlFor="">Nhập lại Password</label>
                           <input className="form-control" placeholder="Nhập lại mật khẩu"/>
                        </div>
                     </div>
                     <div className="d-flex justify-content-between">
                           <button type="submit" className="btn-black">
                              Lưu
                           </button>
                     </div>
                  </form>
               </div>
            </div>
        </section>
    );
}

export default Profile