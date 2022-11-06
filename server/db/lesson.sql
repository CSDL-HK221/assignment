CREATE TABLE lesson (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    content text NOT NULL,
    course_id int(11) NOT NULL,
    length int(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (course_id) REFERENCES course(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO lesson (name, content, length) VALUES ('Lesson 1', 'This is lesson 1', 10);
