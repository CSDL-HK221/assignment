CREATE TABLE relatedCourse (
    courseId int(11) NOT NULL,
    relatedCourseId int(11) NOT NULL,
    PRIMARY KEY (courseId, relatedCourseId),
    FOREIGN KEY (courseId) REFERENCES course(id),
    FOREIGN KEY (relatedCourseId) REFERENCES course(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO relatedCourse (courseId, relatedCourseId) VALUES (1, 2);