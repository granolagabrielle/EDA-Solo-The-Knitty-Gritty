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

CREATE TABLE "brands" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR
);

CREATE TABLE "yarn_inventory" (
	"id" SERIAL PRIMARY KEY,
	"brand" INT REFERENCES "brands" ("id"),
	"title" VARCHAR,
	"fiber" INT REFERENCES "fibers" ("id"),
	"weight" INT REFERENCES "weights" ("id"),
  	"skeins" INT,
	"skein_grams" INT,
  "total_grams" INT,
	"dye_lot" VARCHAR (100),
	"user_id" INT REFERENCES "user" ("id"),
  "isFavorite" BOOLEAN DEFAULT FALSE,
  "isDeleted" BOOLEAN DEFAULT FALSE
  "location" VARCHAR
);

CREATE TABLE "pattern_inventory" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR (100),
	"designer_name" INT REFERENCES "designer_names" ("id"),
	"pattern_type" INT REFERENCES "pattern_types" ("id"),
	"difficulty_level" INT REFERENCES "difficulty" ("id"),
	"yarn_weight" INT REFERENCES "weights" ("id"),
	"user_id" INT REFERENCES "user" ("id"),
  "isFavorite" BOOLEAN DEFAULT FALSE,
  "isDeleted" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "project_tracking" (
	"id" SERIAL PRIMARY KEY,
	"pattern_id" INT REFERENCES "pattern_inventory" ("id"),
	"date_started" date,
"est_grams_needed" INT,
"grams_knit" INT,
"needle_size" INT,
	"yarn_id" INT REFERENCES "yarn_inventory" ("id"),
	"user_id" INT REFERENCES "user" ("id"),
  "isFavorite" BOOLEAN DEFAULT FALSE,
  "isDeleted" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "project_notes" (
"id" SERIAL PRIMARY KEY,
"project_id" INT REFERENCES "project_tracking" ("id"),
"notes" VARCHAR
);

CREATE TABLE "images" (
  "id" SERIAL PRIMARY KEY,
  "yarn_id" INT REFERENCES "yarn_inventory" ("id"),
  "pattern_id" INT REFERENCES "pattern_inventory" ("id"),
  "project_id" INT REFERENCES "project_tracking" ("id"),
	"url" VARCHAR
);

-- Seed Data

INSERT INTO "designer_names" ("name") VALUES ('My Favorite Things Knitwear'), ('Caidree'), ('Ozetta'), ('Ullen Knitwear'), ('New Wave Knitting');

INSERT INTO "difficulty" ("level") VALUES ('Beginner'), ('Intermediate'), ('Advanced');

INSERT INTO "fibers" ("fiber") VALUES ('Cotton'), ('Wool'), ('Linen'), ('Alpaca');

INSERT INTO "pattern_types" ("type") VALUES ('Clothing'), ('Accessories'), ('Home Goods');

INSERT INTO "user" ("id", "username", "password", "admin") VALUES (1, 'gabrielle', 'pass', TRUE);

INSERT INTO "brands" ("name") VALUES ('Cascade Yarns'), ('Woolstok'), ('Isager'), ('Knitting For Olive');

INSERT INTO "weights" ("weight") VALUES ('Lace'), ('Sock'), ('Sport'), ('Double Knit'), ('Worsted'), ('Bulky');

INSERT INTO "yarn_inventory" ("brand", "title", "skeins", "fiber", "weight", "skein_grams", "dye_lot", "user_id") VALUES (1, 'test title', 1, 1, 1, 50, 'blue', 1);

INSERT INTO "pattern_inventory" ("title", "pattern_type", "designer_name", "difficulty_level", "yarn_weight", "user_id") VALUES ('Sophie Scarf', 1, 1, 1, 1, 1);

INSERT INTO "project_tracking" ("pattern_id", "date_started", "progress", "yarn_id", "user_id") VALUES (1, '01-01-2024', 25, 1, 1);

INSERT INTO "project_notes" ("project_id", "notes") VALUES (1, 'test notes');
