import React from "react";
import "./CourseCard.scss";
import {FaUserFriends, FaBookOpen, FaClock} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

const CourseCard = (props) => {
   const {
      id,
      name,
      category,
      courseMembers,
      image,
      lessons,
      duration,
   } = props.course;

   const navigate = useNavigate();

   const handleDetails = (id) => {
        const url = `/course/${id}`;
        navigate(url)
    };

   return (
      <div className="col-sm-6 col-lg-4 mx-auto">
         <div onClick={() => handleDetails(id)} className="course-box shadow">
            <img className="img-fluid" src={image} alt="" />
            <div className="info">
               <p className="category">{category}</p>
               <h6 className="title">{name}</h6>
               <div className="d-flex justify-content-between">
                  <span>
                     <FaBookOpen className="icon"/>{" "}
                     <span style = {{verticalAlign: "middle"}}>{lessons} lessons</span>
                  </span>
                  <span>
                     <FaClock className="icon"/>{" "}
                     <span style = {{verticalAlign: "middle"}}>{duration}</span>
                  </span>
                  <span>
                     <FaUserFriends className="icon"/>{" "}
                     <span style = {{verticalAlign: "middle"}}>{courseMembers}</span>
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CourseCard;