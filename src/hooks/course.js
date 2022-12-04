import axios from 'axios'
import { useEffect, useState } from "react";

export const useAllCourses = () => {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        axios('http://localhost:3000/api/course')
        .then(res => {setCourses(res.data.data)})
    }, []);
    return [courses];
};

export const useCourseById = (id) => {
    const [course, setCourse] = useState([]);
    useEffect(() => {
        axios(`http://localhost:3000/api/course/${id}`)
        .then(res => {setCourse(res.data.data)})
    }, []);
    return [course];
}

/*export const useLessonsFromCourse = () => {
    const [lessons, setLessons] = useState([]);
    useEffect(() => {
        axios(`http://localhost:3000/api/course/${id}`)
        .then(res => {setCourse(res.data.data)})
    }, []);
    return [course];
}*/
