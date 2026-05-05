"use server";

import { auth } from "@/lib/auth";
import {headers} from "next/headers";
import { redirect } from "next/navigation";



//Inscription
export const signup = async (formData: FormData) => {
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!firstname || !lastname || !email || !password) {
        throw Error("Le nom, le prénom l'email et le mot de passe sont obligatoires.")
    }

    const response = await auth.api.signUpEmail({
        body: {
            name: `${firstname} ${lastname}`,
            email,
            password,
        },
        asResponse: true,
    });

    
    if (!response.ok) {
        console.error("email ou mot de passe incorrect", await response.json());
        redirect("/auth/signin?error=true");
    }
    redirect("/");
};


// Connexion 
export const signin = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        throw Error("L'email et le mot de passe sont obligatoires ")
    }

    const response = await auth.api.signInEmail({
        body: {
            email,
            password,
        },
        asResponse: true,
    });

    if (!response.ok) {
    
        console.error("La connexion a échoué", await response.json())
        redirect("/auth/signin?error=true")
    }

    redirect("/")

};