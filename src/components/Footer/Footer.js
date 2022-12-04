import "./Footer.scss";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import logo2 from "../../img/logo-2.png"
const Footer = () => {
   return (
      <div className="footer">
         <div className="container-md">
            <div className="row">
               <div className="col-6">
                    <Link className="link navbar-brand d-flex " to="/home">
                        <img src = {logo} className ="d-inline-block align-text-top"></img>
                        <span className = "logo">
                            <h3 className = "logo-brand">DBEL</h3>
                            <p style = {{fontSize: '10px'}}>Database Electronic Learning System</p>
                        </span>
                    </Link>
                    <p>© 2022 DB Team</p>
               </div>
               <div className="col-6">
                  <img src = {logo2} className ="d-inline-block align-text-top float-end"></img>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Footer;