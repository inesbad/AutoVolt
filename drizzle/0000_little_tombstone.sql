CREATE TABLE "carScores" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "carScores_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"score_fiabilité" varchar(255),
	"score_km" varchar(255),
	"score_age" varchar(255),
	"score_rappel" varchar(255),
	"score_global" varchar(255),
	"explication" text,
	"car_id" integer
);
--> statement-breakpoint
CREATE TABLE "cars" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cars_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"marque" text NOT NULL,
	"modele" text NOT NULL,
	"annee" integer NOT NULL,
	"carburant" text NOT NULL,
	"boite_vitesse" text NOT NULL,
	"kilometrage" integer NOT NULL,
	"prix" integer NOT NULL,
	"puissance" varchar(255),
	"moteur" varchar(255),
	"couleur" text,
	"ville" text,
	"description" varchar(255),
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE "favorites" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "favorites_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"car_id" integer,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE "images" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "images_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"car_id" integer
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"firstname" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"mot_de_passe" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_mot_de_passe_unique" UNIQUE("mot_de_passe")
);
--> statement-breakpoint
CREATE TABLE "vinDecodes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "vinDecodes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"marque" text NOT NULL,
	"modele" text NOT NULL,
	"constructeur" text,
	"annee" integer NOT NULL,
	"carburant" text NOT NULL,
	"carosserie" text,
	"pays_fabrication" text,
	"moteur" varchar(255),
	"cylindre" varchar(255),
	"car_id" integer
);
--> statement-breakpoint
ALTER TABLE "carScores" ADD CONSTRAINT "carScores_car_id_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cars" ADD CONSTRAINT "cars_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_car_id_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_car_id_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vinDecodes" ADD CONSTRAINT "vinDecodes_car_id_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;