CREATE TABLE course (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    description text NOT NULL,
    lessonCount int(11) DEFAULT 0,
    lesson int(11) ,
    authorId int(11) NOT NULL,
    category varchar(255),
    vote int(11) DEFAULT 0,
    relatedCourse int(11) ,
    PRIMARY KEY (id)
    FOREIGN KEY (authorId) REFERENCES user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO course (name, description, lessonCount, lesson, authorId, category, vote, relatedCourse) VALUES ('Course 1', 'This is course 1', 10, 1, 1, 'IT', 10, 1);