CREATE TABLE "songs" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"youtube_link" varchar(255) NOT NULL,
	"score" integer NOT NULL DEFAULT '0',
	CONSTRAINT "songs_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
