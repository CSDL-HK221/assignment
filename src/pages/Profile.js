import avatar from '../img/avatar.png'
const Profile = () => {
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
                        <h4>Hi, User!</h4>
                     </div>
                  </div>
                  <form className="mb-0 text-start">
                     <div className="row">
                        <div className="form-group col-12">
                           <label htmlFor="">Username</label>
                           <input className="form-control" placeholder="Nhập username"/>
                        </div>
                        <div className="form-group col-12">
                           <label htmlFor="">Email</label>
                           <input className="form-control" placeholder="Nhập email"/>
                        </div>
                        <div className="form-group col-12">
                           <label htmlFor="">Password</label>
                           <input className="form-control" placeholder="Nhập password"/>
                        </div>
                        <div className="form-group col-12">
                           <label htmlFor="">Số điện thoại</label>
                           <input className="form-control" placeholder="Nhập số điện thoại"/>
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