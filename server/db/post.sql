CREATE TABLE post {
    id int(11) NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    content text NOT NULL,
    authorId int(11) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (authorId) REFERENCES user(id)
} ENGINE=InnoDB DEFAULT CHARSET=utf8;