CREATE TABLE quiz (
    id (int) NOT NULL AUTO_INCREMENT,
    content (text) NOT NULL,
    lesson_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    PRIMARY KEY (id),
    FOREIGN KEY (lesson_id) REFERENCES lesson(id)
);