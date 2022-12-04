CREATE TABLE quiz (
	id int(11) NOT NULL AUTO_INCREMENT,
	content text NOT NULL,
	lesson_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (lesson_id) REFERENCES lesson(id)
); ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO quiz (content, lesson_id) VALUES ('Quiz 1', 1);