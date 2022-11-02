USE AssignmentCSDL;

CREATE TABLE user (
    id int(11) NOT NULL AUTO_INCREMENT,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    age int(11) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    phone varchar(255),
    role varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO user (firstName, lastName, age, email, phone, role, username, password) VALUES ('John', 'Doe', 25, 'exam@gmail.com', '0123456789', 'user', 'user1', 'user123');
