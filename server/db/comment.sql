CREATE TABLE comment (
    id int(11) NOT NULL AUTO_INCREMENT,
    content text NOT NULL,
    authorId int(11) NOT NULL,
    lessonId int(11) NOT NULL,
    postId int(11) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (authorId) REFERENCES user(id),
    FOREIGN KEY (lessonId) REFERENCES lesson(id)
    FOREIGN KEY (postId) REFERENCES post(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO comment (content, authorId, lessonId, postId) VALUES ('Comment 1', 1, 1, 1);