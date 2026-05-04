import { relations } from "drizzle-orm";
import { integer, pgTable, varchar, text, pgEnum, timestamp } from "drizzle-orm/pg-core";


export const roleEnum = pgEnum ("role", ["user", "admin"])

export const users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    firstname: text().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    passwordHash: varchar({ length: 255 }).notNull(),
    role: roleEnum("role").default("user").notNull(),


});

export const fuelEnum = pgEnum("fuel", [
  "essence",
  "diesel",
  "hybride",
  "electrique",
  "gpl",
]);

export const cars = pgTable("cars", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    marque: text().notNull(),
    modele: varchar("modele", { length: 255 }).notNull(),
    annee: integer().notNull(),
    carburant: fuelEnum("carburant").notNull(),
    boite_vitesse: text().notNull(),
    kilometrage: integer().notNull(),
    prix: integer().notNull(),
    puissance: varchar({ length: 255 }),
    moteur: varchar({ length: 255 }),
    couleur: text(),
    ville: text(),
    description: varchar({ length: 255 }),
    vin: varchar("vin", {length: 17}).unique(),

    userId: integer("user_id").references(() => users.id), 
    
})





export const vinDecodes = pgTable("vinDecodes", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    marque: text().notNull(),
    modele: text().notNull(),
    constructeur: text(),
    annee: integer().notNull(),
    carburant: fuelEnum("carburant").notNull(),
    carosserie: text(),
    pays_fabrication: text(),
    moteur: varchar({ length: 255 }),
    cylindre: varchar({ length: 255 }),
    
    carId: integer("car_id").references(() => cars.id) 
})


export const carScores = pgTable("carScores", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    score_fiabilite: varchar({length: 255}),
    score_km : varchar({length: 255}),
    score_age: varchar({length: 255}),
    score_rappel : varchar({length: 255}),
    score_global: varchar({length: 255}),
    explication: text("explication"),
    
    carId : integer("car_id").references(() => cars.id)
})

export const favorites = pgTable("favorites", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),



    carId: integer("car_id").references(() => cars.id),
    userId : integer("user_id").references(()=> users.id),
    
})


export const images = pgTable("images", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    url: text(),
    
    carId : integer("car_id").references(()=> cars.id),
})

export const comparaisons = pgTable("comparaisons", {
  id: integer().primaryKey(),

  userId: integer().references(() => users.id),

  carId1: integer("car_id_1").references(() => cars.id),

  carId2: integer("car_id_2").references(() => cars.id),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({

    cars: many(cars),
    favorites: many(favorites),
    comparaisons: many(comparaisons)
}));

// Une voiture -> 1 user
// une voiture -> 1 vinCode
// une voiture -> 1 score
// une voiture => DES images
// une voiture PEUT etre en favoris

export const carsRelations = relations(cars, ({ one, many }) => ({
    user: one(users, {
        fields: [cars.userId],
        references: [users.id],
    
    }),

    vinDecodes: one(vinDecodes, {
        fields: [cars.id],
        references: [vinDecodes.carId],
    }),

    score: one(carScores, {
        fields: [cars.id],
        references: [carScores.carId],
    }),

    images: many(images),

    favorites: many(favorites),

}));