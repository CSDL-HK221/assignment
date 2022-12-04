CREATE TABLE lesson (
	id int(11) NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	content text NOT NULL,
	course_id int(11) NOT NULL,
	length int(11) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (course_id) REFERENCES course(id)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO lesson (name, content, course_id, length) VALUES ('Lesson 1', 'Lesson 1 content', 1, 10);