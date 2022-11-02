CREATE TABLE course {
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    description text NOT NULL,
    lessonCount int(11) DEFAULT 0,
    lesson varchar(255) ,
    authorId int(11) NOT NULL,
    category varchar(255),
    vote int(11) DEFAULT 0,
    relatedCourse []
    PRIMARY KEY (id)
} ENGINE=InnoDB DEFAULT CHARSET=utf8;