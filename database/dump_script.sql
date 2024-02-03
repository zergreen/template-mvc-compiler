-- [0] begin script : prepare data
DROP DATABASE Phongsakorn_mvc;
CREATE DATABASE Phongsakorn_mvc;

DROP TABLE Compiler ;

CREATE TABLE Compiler (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
 	src_code TEXT,
 	output_syntax TEXT,
 	model_type varchar(255)
 	);

INSERT INTO Compiler(id, src_code, output_syntax, model_type)
VALUES
(NULL, 'x = 10 + 2','huh?','Model1'),
(NULL, 'declare xy','huh!','Model2'),
(NULL, 'xy = x + 10','hmm...','Model1');

SELECT * FROM Compiler;

-- [1] end prepare data

SELECT * FROM Compiler WHERE id = 1;
DELETE FROM Compiler WHERE id = 1;

