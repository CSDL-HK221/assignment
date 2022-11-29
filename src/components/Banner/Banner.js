import "./Banner.scss";
import homeBg from "../../img/illustration.png";

const Banner = () => {
   return (
      <div className="banner">
         <div className="container-sm">
            <div className="row justify-content-center align-items-center">
               <div className="col-md-5 mb-5">
                  <div className="text-box">
                     <h1>
                        Khóa học <span>cho người mới bắt đầu</span>
                     </h1>
                     <p>Hòan toàn miễn phí</p>
                  </div>
               </div>
               <div className="col-md-7">
                  <img className="img-fluid" src={homeBg} alt="" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Banner;