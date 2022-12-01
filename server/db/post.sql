CREATE TABLE post (
    id int(11) NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    content text NOT NULL,
    authorId int(11) NOT NULL,
    image longblob,
    upVotes int(11) DEFAULT 0,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (authorId) REFERENCES user(id)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO post (title, content, authorId, image) VALUES ('Post 1', 'Content 1', 1, 'image1');