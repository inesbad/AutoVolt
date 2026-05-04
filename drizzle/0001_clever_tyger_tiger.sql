CREATE TYPE "public"."fuel" AS ENUM('essence', 'diesel', 'hybride', 'electrique', 'gpl');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "comparaisons" (
	"id" integer PRIMARY KEY NOT NULL,
	"userId" integer,
	"car_id_1" integer,
	"car_id_2" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_mot_de_passe_unique";--> statement-breakpoint
ALTER TABLE "cars" ALTER COLUMN "modele" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "cars" ALTER COLUMN "carburant" SET DATA TYPE "public"."fuel" USING "carburant"::"public"."fuel";--> statement-breakpoint
ALTER TABLE "vinDecodes" ALTER COLUMN "carburant" SET DATA TYPE "public"."fuel" USING "carburant"::"public"."fuel";--> statement-breakpoint
ALTER TABLE "carScores" ADD COLUMN "score_fiabilite" varchar(255);--> statement-breakpoint
ALTER TABLE "cars" ADD COLUMN "vin" varchar(17);--> statement-breakpoint
ALTER TABLE "images" ADD COLUMN "url" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "passwordHash" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "comparaisons" ADD CONSTRAINT "comparaisons_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comparaisons" ADD CONSTRAINT "comparaisons_car_id_1_cars_id_fk" FOREIGN KEY ("car_id_1") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comparaisons" ADD CONSTRAINT "comparaisons_car_id_2_cars_id_fk" FOREIGN KEY ("car_id_2") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "carScores" DROP COLUMN "score_fiabilité";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "mot_de_passe";--> statement-breakpoint
ALTER TABLE "cars" ADD CONSTRAINT "cars_vin_unique" UNIQUE("vin");