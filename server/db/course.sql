CREATE TABLE course (
	id int(11) NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	description text NOT NULL,
	authorId int(11) NOT NULL,
	category varchar(255),
	numOfLessons int(11) NOT NULL,
	images varchar(255) NOT NULL,
	duration int(11),
	courseMembers int(11) DEFAULT 0,
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO course (name, description, authorId, category) VALUES ('C++', 'C++ is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language, or "C with Classes". The language has expanded significantly over time, and modern C++ now has object-oriented, generic, and functional features in addition to facilities for low-level memory manipulation. It is almost always implemented as a compiled language, and many vendors provide C++ compilers, including the Free Software Foundation, LLVM, Microsoft, Intel, and IBM, so it is available on many platforms.', 1, 'Programming');