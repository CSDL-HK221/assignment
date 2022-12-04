CREATE TABLE answer(
	id int(11) NOT NULL AUTO_INCREMENT,
	content text NOT NULL,
	isCorrect boolean NOT NULL,
	quiz_id int(11) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (quiz_id) REFERENCES quiz(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO answer (content, isCorrect, quiz_id) VALUES ('Answer 1', 1, 1);