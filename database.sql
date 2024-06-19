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









