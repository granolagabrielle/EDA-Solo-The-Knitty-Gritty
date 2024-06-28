-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "admin" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "weights" (
	"id" SERIAL PRIMARY KEY,
	"weight" VARCHAR (100)
);

CREATE TABLE "brands" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (100)
);

CREATE TABLE "fibers" (
	"id" SERIAL PRIMARY KEY,
	"fiber" VARCHAR (100)
);

CREATE TABLE "difficulty" (
	"id" SERIAL PRIMARY KEY,
	"level" VARCHAR
);

CREATE TABLE "pattern_types" (
	"id" SERIAL PRIMARY KEY,
	"type" VARCHAR (100)
);

CREATE TABLE "designer_names" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (100)
);

CREATE TABLE "yarn_inventory" (
	"id" SERIAL PRIMARY KEY,
	"brand" INT REFERENCES "brands" ("id"),
	"title" VARCHAR,
	"skeins" INT,
	"fiber" INT REFERENCES "fibers" ("id"),
	"weight" INT REFERENCES "weights" ("id"),
	"skein_grams" INT,
	"dye_lot" VARCHAR (100),
	"user_id" INT REFERENCES "user" ("id"),
	"notes" VARCHAR,
    "image" VARCHAR
);

CREATE TABLE "pattern_inventory" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR (100),
	"designer_name" INT REFERENCES "designer_names" ("id"),
	"pattern_type" INT REFERENCES "pattern_types" ("id"),
	"difficulty_level" INT REFERENCES "difficulty" ("id"),
	"yarn_weight" INT REFERENCES "weights" ("id"),
	"user_id" INT REFERENCES "user" ("id"),
	"notes" VARCHAR,
    "image" VARCHAR
);

CREATE TABLE "project_tracking" (
	"id" SERIAL PRIMARY KEY,
	"pattern_id" INT REFERENCES "pattern_inventory" ("id"),
	"date_started" date,
	"notes" VARCHAR,
	"progress" INT,
	"yarn_id" INT REFERENCES "yarn_inventory" ("id"),
	"user_id" INT REFERENCES "user" ("id"),
    "image" VARCHAR
);

-- Seed Data

INSERT INTO "designer_names" ("name") VALUES ('My Favorite Things Knitwear'), ('Caidree'), ('Ozetta'), ('Ullen Knitwear'), ('New Wave Knitting');

INSERT INTO "difficulty" ("level") VALUES ('Beginner'), ('Intermediate'), ('Advanced');

INSERT INTO "fibers" ("fiber") VALUES ('Cotton'), ('Wool'), ('Linen'), ('Alpaca');

INSERT INTO "pattern_types" ("type") VALUES ('Clothing'), ('Accessories'), ('Home Goods');

INSERT INTO "user" ("id", "username", "password", "admin") VALUES (1, 'gabrielle', 'pass', TRUE);

INSERT INTO "brands" ("name") VALUES ('Cascade Yarns'), ('Woolstok'), ('Isager'), ('Knitting For Olive');

INSERT INTO "weights" ("weight") VALUES ('Lace'), ('Sock'), ('Sport'), ('Double Knit'), ('Worsted'), ('Bulky');

INSERT INTO "yarn_inventory" ("id", "brand", "title", "skeins", "fiber", "weight", "skein_grams", "dye_lot", "user_id", "notes", "yarn_image") VALUES (1, 1, 'test title', 1, 1, 1, 50, 'blue', 1, 'test notes');

INSERT INTO "pattern_inventory" ("id", "title", "designer_name", "pattern_type", "difficulty_level", "yarn_weight", "user_id", "notes", "pattern_image") VALUES (1, 'Sophie Scarf', 1, 2, 2, 4, 1, 'test notes');

INSERT INTO "project_tracking" ("id", "pattern_id", "date_started", "notes", "progress", "yarn_id", "user_id", "project_image") VALUES (1, 1, '01-01-2024', 'test notes', 25, 1, 1);


// SQL LOG

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "admin" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "weights" (
	"id" SERIAL PRIMARY KEY,
	"weight" VARCHAR (100)
);

CREATE TABLE "brands" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (100)
);

CREATE TABLE "fibers" (
	"id" SERIAL PRIMARY KEY,
	"fiber" VARCHAR (100)
);

CREATE TABLE "difficulty" (
	"id" SERIAL PRIMARY KEY,
	"level" VARCHAR
);

CREATE TABLE "pattern_types" (
	"id" SERIAL PRIMARY KEY,
	"type" VARCHAR (100)
);

CREATE TABLE "designer_names" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (100)
);

CREATE TABLE "yarn_inventory" (
	"id" SERIAL PRIMARY KEY,
	"brand" INT REFERENCES "brands" ("id"),
	"title" VARCHAR,
	"skeins" INT,
	"fiber" INT REFERENCES "fibers" ("id"),
	"weight" INT REFERENCES "weights" ("id"),
	"skein_grams" INT,
	"dye_lot" VARCHAR (100),
	"user_id" INT REFERENCES "user" ("id"),
	"notes" VARCHAR,
    "yarn_image" varchar(300) NOT NULL
);

CREATE TABLE "pattern_inventory" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR (100),
	"designer_name" INT REFERENCES "designer_names" ("id"),
	"pattern_type" INT REFERENCES "pattern_types" ("id"),
	"difficulty_level" INT REFERENCES "difficulty" ("id"),
	"yarn_weight" INT REFERENCES "weights" ("id"),
	"user_id" INT REFERENCES "user" ("id"),
	"notes" VARCHAR,
    "pattern_image" varchar(300) NOT NULL
);

CREATE TABLE "project_tracking" (
	"id" SERIAL PRIMARY KEY,
	"pattern_id" INT REFERENCES "pattern_inventory" ("id"),
	"date_started" date,
	"notes" VARCHAR,
	"progress" INT,
	"yarn_id" INT REFERENCES "yarn_inventory" ("id"),
	"user_id" INT REFERENCES "user" ("id"),
    "project_image" varchar(300) NOT NULL
);

-- Seed Data

INSERT INTO "designer_names" ("name") VALUES ('My Favorite Things Knitwear'), ('Caidree'), ('Ozetta'), ('Ullen Knitwear'), ('New Wave Knitting');

INSERT INTO "difficulty" ("level") VALUES ('Beginner'), ('Intermediate'), ('Advanced');

INSERT INTO "fibers" ("fiber") VALUES ('Cotton'), ('Wool'), ('Linen'), ('Alpaca');

INSERT INTO "pattern_types" ("type") VALUES ('Clothing'), ('Accessories'), ('Home Goods');

INSERT INTO "user" ("id", "username", "password", "admin") VALUES (1, 'gabrielle', 'pass', TRUE);

INSERT INTO "brands" ("name") VALUES ('Cascade Yarns'), ('Woolstok'), ('Isager'), ('Knitting For Olive');

INSERT INTO "weights" ("weight") VALUES ('Lace'), ('Sock'), ('Sport'), ('Double Knit'), ('Worsted'), ('Bulky');

INSERT INTO "yarn_inventory" ("brand", "title", "skeins", "fiber", "weight", "skein_grams", "dye_lot", "user_id", "notes", "yarn_image") VALUES (1, 'test title', 1, 1, 1, 50, 'blue', 2, 'test notes', 'img.jpg');

INSERT INTO "pattern_inventory" ("title", "designer_name", "pattern_type", "difficulty_level", "yarn_weight", "user_id", "notes", "pattern_image") VALUES ('Sophie Scarf', 1, 2, 2, 4, 2, 'test notes', 'pattern.jpg');

INSERT INTO "project_tracking" ("pattern_id", "date_started", "notes", "progress", "yarn_id", "user_id", "project_image") VALUES (1, '01-01-2024', 'test notes', 25, 1, 2, 'project.jpg');

SELECT "yarn_inventory"."id", "yarn_inventory"."skeins", "yarn_inventory"."skein_grams", "fibers"."fiber", "brands"."name", "weights"."weight", "yarn_inventory"."dye_lot", "yarn_inventory"."yarn_image"
  FROM "yarn_inventory" 
  JOIN "fibers"
  ON "fibers"."id"="yarn_inventory"."fiber"
  JOIN "brands"
  ON "brands"."id"="yarn_inventory"."brand"
  JOIN "weights"
  ON "weights"."id"="yarn_inventory"."weight"
  WHERE "yarn_inventory"."id"=1 AND "yarn_inventory"."user_id"=1
;

SELECT "pattern_inventory"."id", "pattern_inventory"."title", "designer_names"."name", "pattern_types"."type", 
    "difficulty"."level", "weights"."weight", "pattern_inventory"."notes", "pattern_inventory"."pattern_image"
    FROM "pattern_inventory"
    JOIN "designer_names"
    ON "designer_names"."id"="pattern_inventory"."designer_name"
    JOIN "pattern_types"
    ON "pattern_types"."id"="pattern_inventory"."pattern_type"
    JOIN "weights"
    ON "weights"."id"="pattern_inventory"."yarn_weight"
    JOIN "difficulty"
    ON "difficulty"."id"="pattern_inventory"."difficulty_level"
    WHERE "pattern_inventory"."id"=1 AND "user_id"=1;
    
    SELECT "project_tracking"."id", "pattern_inventory"."title", "project_tracking"."date_started", "brands"."name", "yarn_inventory"."title", "project_tracking"."notes", 
    "project_tracking"."progress", "project_tracking"."project_image"
  FROM "project_tracking"
  JOIN "pattern_inventory"
  ON "pattern_inventory"."id"="project_tracking"."pattern_id"
  JOIN "yarn_inventory"
  ON "yarn_inventory"."id"="project_tracking"."yarn_id"
  JOIN "brands"
  ON "brands"."id"="yarn_inventory"."brand"
  WHERE "project_tracking"."user_id"=2;

ALTER TABLE "pattern_inventory" RENAME COLUMN "title" to "pattern_title";

ALTER TABLE "yarn_inventory" RENAME COLUMN "title" to "yarn_title";

SELECT "yarn_inventory"."id", "yarn_inventory"."yarn_title", "yarn_inventory"."skeins", "yarn_inventory"."skein_grams", "fibers"."fiber", "brands"."name", "weights"."weight", "yarn_inventory"."dye_lot", "yarn_inventory"."yarn_image"
  FROM "yarn_inventory" 
  JOIN "fibers"
  ON "fibers"."id"="yarn_inventory"."fiber"
  JOIN "brands"
  ON "brands"."id"="yarn_inventory"."brand"
  JOIN "weights"
  ON "weights"."id"="yarn_inventory"."weight"
  WHERE "yarn_inventory"."user_id"=2
;

ALTER TABLE pattern_inventory
DROP COLUMN pattern_image;

CREATE TABLE "uploads" (
    "id" SERIAL PRIMARY KEY,
    "file_url" VARCHAR(250) NOT NULL
    );

ALTER TABLE project_tracking
ADD "image" INT REFERENCES "uploads" ("id");

ALTER TABLE uploads
DROP COLUMN description;

SELECT "yarn_inventory"."id", "yarn_inventory"."yarn_title", "yarn_inventory"."skeins", "yarn_inventory"."skein_grams", "fibers"."fiber", "brands"."name", "weights"."weight", "yarn_inventory"."dye_lot", "yarn_inventory"."image"
  FROM "yarn_inventory" 
  JOIN "fibers"
  ON "fibers"."id"="yarn_inventory"."fiber"
  JOIN "brands"
  ON "brands"."id"="yarn_inventory"."brand"
  JOIN "weights"
  ON "weights"."id"="yarn_inventory"."weight"
  JOIN "uploads"
  ON "uploads"."id"="yarn_inventory"."image"
  WHERE "yarn_inventory"."user_id"=2
;

ALTER TABLE yarn_inventory
ADD COLUMN isDeleted BOOLEAN DEFAULT FALSE;

UPDATE "yarn_inventory" 
  SET "isdeleted"=TRUE
  WHERE "id"=4 
  AND "user_id"=2;
  
  SELECT "yarn_inventory"."id", "yarn_inventory"."yarn_title", "yarn_inventory"."skeins", "yarn_inventory"."skein_grams", "fibers"."fiber", "brands"."name", "weights"."weight", "yarn_inventory"."dye_lot", "yarn_inventory"."image", "yarn_inventory"."isdeleted"
  FROM "yarn_inventory" 
  JOIN "fibers"
  ON "fibers"."id"="yarn_inventory"."fiber"
  JOIN "brands"
  ON "brands"."id"="yarn_inventory"."brand"
  JOIN "weights"
  ON "weights"."id"="yarn_inventory"."weight"
  JOIN "uploads"
  ON "uploads"."id"="yarn_inventory"."image"
  WHERE "yarn_inventory"."user_id"=2 AND "yarn_inventory"."isdeleted"=FALSE
;

SELECT "yarn_inventory"."id", "yarn_inventory"."yarn_title", "yarn_inventory"."skeins", "yarn_inventory"."skein_grams", "fibers"."fiber", "brands"."name", "weights"."weight", "yarn_inventory"."dye_lot", "yarn_inventory"."image"
  FROM "yarn_inventory" 
  JOIN "fibers"
  ON "fibers"."id"="yarn_inventory"."fiber"
  JOIN "brands"
  ON "brands"."id"="yarn_inventory"."brand"
  JOIN "weights"
  ON "weights"."id"="yarn_inventory"."weight"
  WHERE "yarn_inventory"."id"=4 AND "yarn_inventory"."user_id"=2
;

INSERT INTO "yarn_inventory" 
  ("brand", "yarn_title", "skeins", "fiber", "weight", "skein_grams", "dye_lot", "user_id", "notes", "image") 
  VALUES (1, 'test title', 3, 2, 2, 50, 25, 2, 'test notes', 1);
  
  ALTER TABLE pattern_inventory
ADD COLUMN isDeleted BOOLEAN DEFAULT FALSE;

UPDATE "pattern_inventory" 
  SET "isdeleted"=TRUE
  WHERE "id"=4 
  AND "user_id"=2;
  
  ALTER TABLE project_tracking
ADD COLUMN isDeleted BOOLEAN DEFAULT FALSE;

UPDATE "project_tracking" 
  SET "isdeleted"=TRUE
  WHERE "id"=4 
  AND "user_id"=2;
  
  ALTER TABLE yarn_inventory
  ADD COLUMN image VARCHAR;

SELECT * FROM yarn_inventory
WHERE yarn_title LIKE '%N%';

SELECT * FROM yarn_inventory
WHERE (yarn_title ILIKE '%N%' OR dye_lot ILIKE '%B%' OR notes ILIKE '%N%');

SELECT * FROM yarn_inventory
WHERE weight = (SELECT id FROM weights WHERE weight ILIKE '%S%');

ALTER TABLE project_tracking
DROP COLUMN "notes";

CREATE TABLE "project_notes" (
    "id" SERIAL PRIMARY KEY,
    "notes" VARCHAR,
    "project_id" INT REFERENCES "project_tracking" ("id"),
    "date",
    "user_id" INT REFERENCES "user" ("id")
);

ALTER TABLE "project_notes"
ADD COLUMN "user_id" INT;

ALTER TABLE "project_tracking"
ADD COLUMN "date" INT REFERENCES "project_notes" ("id");

SELECT * FROM "project_notes"
    WHERE "project_id"=8;

DELETE FROM "project_notes"
WHERE "id"=2;

SELECT "yarn_inventory".*, "brands"."name", "fibers"."fiber", "weights"."weight"
FROM "yarn_inventory"
JOIN "fibers"
 ON "fibers"."id"="yarn_inventory"."fiber"
 JOIN "brands"
 ON "brands"."id"="yarn_inventory"."brand"
 JOIN "weights"
 ON "weights"."id"="yarn_inventory"."weight"
 WHERE ("yarn_inventory"."yarn_title" ILIKE $1
 OR "brands"."name" ILIKE $1 
 OR "fibers"."fiber" ILIKE $1
 OR "weights"."weight" ILIKE $1)
 AND "yarn_inventory"."user_id"=$2
;

ALTER TABLE "pattern_inventory"
ADD COLUMN "isFavorite" BOOLEAN DEFAULT FALSE;

SELECT *
  FROM "yarn_inventory" 
  WHERE "yarn_inventory"."user_id"=2 AND "yarn_inventory"."isFavorite"=TRUE;
  
  UPDATE "yarn_inventory"
    SET "isFavorite" = TRUE
    WHERE "id"=35 AND "user_id"=2;
    
    SELECT "yarn_inventory"."id", "yarn_inventory"."yarn_title", "yarn_inventory"."skeins", "yarn_inventory"."skein_grams", "fibers"."fiber", "brands"."name", "weights"."weight", "yarn_inventory"."dye_lot", "yarn_inventory"."image", "yarn_inventory"."notes", "yarn_inventory"."isFavorite"
  FROM "yarn_inventory" 
  JOIN "fibers"
  ON "fibers"."id"="yarn_inventory"."fiber"
  JOIN "brands"
  ON "brands"."id"="yarn_inventory"."brand"
  JOIN "weights"
  ON "weights"."id"="yarn_inventory"."weight"
  WHERE "yarn_inventory"."id"=37 AND "yarn_inventory"."user_id"=2
;

UPDATE "yarn_inventory"
    SET "isFavorite" = FALSE
    WHERE "id"=37 AND "user_id"=2;
    
    ALTER TABLE "yarn_inventory"
    ADD COLUMN "location" VARCHAR;
    
    SELECT "pattern_inventory"."id", "pattern_inventory"."pattern_title", "designer_names"."name", "pattern_types"."type", 
    "difficulty"."level", "weights"."weight", "pattern_inventory"."notes", "pattern_inventory"."image", "pattern_inventory"."isdeleted", "pattern_inventory"."isFavorite"
    FROM "pattern_inventory"
    JOIN "designer_names"
    ON "designer_names"."id"="pattern_inventory"."designer_name"
    JOIN "pattern_types"
    ON "pattern_types"."id"="pattern_inventory"."pattern_type"
    JOIN "weights"
    ON "weights"."id"="pattern_inventory"."yarn_weight"
    JOIN "difficulty"
    ON "difficulty"."id"="pattern_inventory"."difficulty_level"
  WHERE "pattern_inventory"."user_id"=2 AND "pattern_inventory"."isFavorite"=TRUE;
  
  SELECT "yarn_inventory"."id", "yarn_inventory"."yarn_title", "yarn_inventory"."skeins", "yarn_inventory"."skein_grams", "fibers"."fiber", "brands"."name", "weights"."weight", "yarn_inventory"."dye_lot", "yarn_inventory"."image", "yarn_inventory"."notes", "yarn_inventory"."isFavorite", "yarn_inventory"."location", "project_tracking".*
  FROM "yarn_inventory" 
  JOIN "fibers"
  ON "fibers"."id"="yarn_inventory"."fiber"
  JOIN "brands"
  ON "brands"."id"="yarn_inventory"."brand"
  JOIN "weights"
  ON "weights"."id"="yarn_inventory"."weight"
  JOIN "project_tracking"
  ON "project_tracking"."yarn_id"="yarn_inventory"."id"
  WHERE "yarn_inventory"."id"=36 AND "yarn_inventory"."user_id"=2
;

ALTER TABLE yarn_inventory
RENAME COLUMN "total grams" to "total_grams";

ALTER TABLE project_tracking
MODIFY COLUMN "est_grams_needed" INTEGER;

ALTER TABLE project_tracking
ADD COLUMN "est_grams_needed" INTEGER;


ALTER TABLE yarn_inventory
DROP COLUMN "skeins";

UPDATE "yarn_inventory"
      SET "total_grams"="total_grams"-50
      WHERE "id"=35 AND "user_id"=2;
      
      
     ALTER TABLE project_tracking
     DROP COLUMN "isOnHold";
     









