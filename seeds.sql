INSERT INTO Groups (groupName) VALUES ("TestGroup");

INSERT INTO Users (firstName, lastName, userName, email, userPassword, GroupId) VALUES ("Fuzzy", "Jones", "fuzzywuzzy", "fuzzy@test.com", "fuzzy1", 1);
INSERT INTO Users (firstName, lastName, userName, email, userPassword, GroupId) VALUES ("Jorge", "Paredes", "georgie", "jorge@test.com", "jorge1", 1);
INSERT INTO Users (firstName, lastName, userName, email, userPassword, GroupId) VALUES ("Brian", "Sandoval", "coolbrian", "brian@test.com", "brian1", 1);

INSERT INTO Books (title, author, year, category, available, UserId) VALUES ("Ready Player One", "Ernest Kline", 2011, "Science Fiction", true, 1);
INSERT INTO Books (title, author, year, category, available, UserId) VALUES ("The Hate Factory", "Georgelle Hirliman", 2005, "True Crime", true, 1);
INSERT INTO Books (title, author, year, category, available, UserId) VALUES ("The God Delusion", "Richard Dawkins", 2006, "Non-fiction", true, 1);

INSERT INTO Books (title, author, year, category, available, UserId) VALUES ("Don Quixote", "Miguel de Cervantes", 1605, "Fiction", true, 2);
INSERT INTO Books (title, author, year, category, available, UserId) VALUES ("The Hobbit", "J. R. R. Tolkien", 1937, "Fantasy", true, 2);
INSERT INTO Books (title, author, year, category, available, UserId) VALUES ("Dune", "Frank Herbert", 1965, "Science Fiction", true, 2);

INSERT INTO Books (title, author, year, category, available, UserId) VALUES ("A Wrinkle in Time", "Madeleine L'Engle", 1962, "Fantasy", true, 3);
INSERT INTO Books (title, author, year, category, available, UserId) VALUES ("A Tale of Two Cities", "Charles Dickens", 1859, "Historical Fiction", true, 3);
INSERT INTO Books (title, author, year, category, available, UserId) VALUES ("Alice's Adventures in Wonderland", "Lewis Carroll", 1865, "Fantasy", true, 3);