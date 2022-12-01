CREATE TABLE enroll (
    userId int(11) NOT NULL,
    courseId int(11) NOT NULL,
    PRIMARY KEY (userId, courseId),
    FOREIGN KEY (userId) REFERENCES user(id),
    FOREIGN KEY (courseId) REFERENCES course(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO enroll (userId, courseId) VALUES (1, 1);