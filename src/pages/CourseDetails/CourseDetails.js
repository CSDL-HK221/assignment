import React, { useEffect, useState } from "react";
import {FaUserFriends, FaBookOpen, FaClock} from 'react-icons/fa'
import "./CourseDetails.scss";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
    const courses = require('../../data/course.json')
    const allLessons = require('../../data/lesson.json')
    const [details, setDetails] = useState({});
    const [lesson, setLesson] = useState([]);
    const { courseId } = useParams();
 
    useEffect(() => {
       if (courses.length) {
          const matchedData = courses.find((course) => course.id === courseId);
          const matchedLessons = allLessons.filter((e) => e.courseId === courseId);
          setDetails(matchedData);
          setLesson(matchedLessons);
       }
    }, [courses]);
    const {
       name,
       category,
       duration,
       lessons,
       image,
       description,
       author,
    } = details;
 
    return (
       <div className="main details-section">
          <div className="container">
             <div className="row">
                <div className="col-lg-8 mb-5 mb-lg-0">
                   <div className="detail-box">
                      <h3 className="title">{name}</h3>
                      <p className="category">{category}</p>
                      <div className="instructor">
                         <div className="box">
                            <h5>Tác giả</h5>
                            <p className="mb-0">{author}</p>
                         </div>
                      </div>
                      <div className="bottom-area">
                        <ul class="nav indicator" id="pills-tab" role="tablist">
                           <li class="nav-item" role="presentation">
                              <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-overview" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Tổng quát</button>
                           </li>
                           <li class="nav-item" role="presentation">
                              <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Nội dung khóa học</button>
                           </li>
                        </ul>
                        <div class="tab-content indicator-details" id="pills-tabContent">
                           <div class="tab-pane fade show active" id="pills-overview" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                              <h4>Mô tả khóa học</h4>
                              <p>{description}</p>
                           </div>
                           <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                              <h4>Nội dung khóa học</h4>
                              {
                                 lesson.map((e, index) => 
                                    <h6>{index + 1}. {e.name}</h6>
                                 )
                              }
                           </div>
                        </div>                   
                      </div>
                   </div>
                </div>
                <div className="col-lg-4 ps-lg-5">
                   <div className="purchase-course-box">
                      <div className="img-box">
                         <img className="img-fluid" src={image} alt="" />
                      </div>
                      <div className="info-box">
                         {true ? (
                            <form
                               className="mb-0 text-start"
                            >
                               <button type="submit" className="btn-black">
                                  Đăng kí học
                               </button>
                            </form>
                         ) : (
                            <button
                               
                               className="btn-black"
                            >
                               Đăng kí học
                            </button>
                         )}
                         <ul>
                            <li>
                               <span>
                                 <FaClock className="icon"/>{" "}
                                 Duration
                               </span>
                               <span>{duration}</span>
                            </li>
                            <li>
                               <span>
                                 <FaBookOpen className="icon"/>{" "}
                                  lessons
                               </span>
                               <span>{lessons}</span>
                            </li>
                            <li>
                               <span>
                                 <FaUserFriends className="icon"/>{" "}
                                 Enrolled
                               </span>
                               <span>0</span>
                            </li>
                         </ul>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    );
 };
 
 export default CourseDetails;