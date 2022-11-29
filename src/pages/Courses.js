import CourseCard from "../components/CourseCard/CourseCard";

const Courses = () => {
    const courses = require('../data/course.json')
    return (
        <section className="main">
            <div className="container">
               <div className="header-text">
                  <h3>Khóa học nổi bật</h3>
                  <p>Hàng trăm khóa học hòan toàn miễn phí</p>
               </div>
               <div className="row">
                  {courses.map((course) => (
                     <CourseCard course={course} key={course.id}></CourseCard>
                  ))}
               </div>
            </div>
        </section>
   );
}

export default Courses;