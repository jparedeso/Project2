INSERT INTO Groups (groupName, createdAt, updatedAt) VALUES ("TestGroup", "2018-04-11 03:35:58", "2018-04-11 03:35:58");

INSERT INTO Users (firstName, lastName, email, password, createdAt, updatedAt, GroupId) VALUES ("Fuzzy", "Jones", "fuzzy@test.com", "fuzzy1", "2018-04-11 03:35:58", "2018-04-11 03:35:58", 1);
INSERT INTO Users (firstName, lastName, email, password, createdAt, updatedAt, GroupId) VALUES ("Jorge", "Paredes", "jorge@test.com", "jorge1", "2018-04-11 03:35:58", "2018-04-11 03:35:58", 1);
INSERT INTO Users (firstName, lastName, email, password, createdAt, updatedAt, GroupId) VALUES ("Brian", "Sandoval", "brian@test.com", "brian1", "2018-04-11 03:35:58", "2018-04-11 03:35:58", 1);

INSERT INTO Books (title, author, year, category, available, createdAt, updatedAt, UserId) VALUES ("Ready Player One", "Ernest Kline", 2011, "Science Fiction", true, "2018-04-11 03:35:58", "2018-04-11 03:35:58", 1);
INSERT INTO Books (title, author, year, category, available, createdAt, updatedAt, UserId) VALUES ("The Hate Factory", "Georgelle Hirliman", 2005, "True Crime", true, "2018-04-11 03:35:58", "2018-04-11 03:35:58", 1);
INSERT INTO Books (title, author, year, category, available, createdAt, updatedAt, UserId) VALUES ("The God Delusion", "Richard Dawkins", 2006, "Non-fiction", true, "2018-04-11 03:35:58", "2018-04-11 03:35:58", 1);

INSERT INTO Books (title, author, year, category, available, createdAt, updatedAt, UserId) VALUES ("Don Quixote", "Miguel de Cervantes", 1605, "Fiction", true, "2018-04-11 03:35:58", "2018-04-11 03:35:58", 2);
INSERT INTO Books (title, author, year, category, available, createdAt, updatedAt, UserId) VALUES ("The Hobbit", "J. R. R. Tolkien", 1937, "Fantasy", true, "2018-04-11 03:35:58", "2018-04-11 03:35:58", 2);
INSERT INTO Books (title, author, year, category, available, createdAt, updatedAt, UserId) VALUES ("Dune", "Frank Herbert", 1965, "Science Fiction", true, "2018-04-11 03:35:58", "2018-04-11 03:35:58", 2);

INSERT INTO Books (title, author, year, category, available, createdAt, updatedAt, UserId) VALUES ("A Wrinkle in Time", "Madeleine L'Engle", 1962, "Fantasy", true, "2018-04-11 03:35:58", "2018-04-11 03:35:58", 3);
INSERT INTO Books (title, author, year, category, available, createdAt, updatedAt, UserId) VALUES ("A Tale of Two Cities", "Charles Dickens", 1859, "Historical Fiction", true, "2018-04-11 03:35:58", "2018-04-11 03:35:58", 3);
INSERT INTO Books (title, author, year, category, available, createdAt, updatedAt, UserId) VALUES ("Alice's Adventures in Wonderland", "Lewis Carroll", 1865, "Fantasy", true, "2018-04-11 03:35:58", "2018-04-11 03:35:58", 3);