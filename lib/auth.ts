import { betterAuth } from "better-auth";
import { db } from "@/src";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import * as schema from "@/src/db/schema";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema,
    }),
    plugins: [
        nextCookies()
    ]

});

// C'est le fichier de econfig de better-auth
// Je rajoute le pluggins afin que les cookies soient enregistrés afin qu'il sache comment gérer les cookies