import Banner from "../components/Banner/Banner";
import CourseCard from "../components/CourseCard/CourseCard";
import {useAllCourses} from "../hooks/course"

const Home = () => {
   const [courses] = useAllCourses()
   return (
      <>
         <Banner/>
         <section className="courses-section">
            <div className="container">
               <div className="header-text">
                  <h3>Khóa học nổi bật</h3>
                  <p>Hàng trăm khóa học hòan toàn miễn phí</p>
               </div>
               <div className="row">
                  {courses.slice(0, 6).map((course) => (
                     <CourseCard course={course} key={course.id}></CourseCard>
                  ))}
               </div>
            </div>
         </section>
      </>
   );
};

export default Home;