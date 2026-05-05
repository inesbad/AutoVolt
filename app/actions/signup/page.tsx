"use client"

import { signup } from "./authAction"

export default function signupForm() {

    return (
        <form action={signup}>

            <input type="text" name="fristname" />
            <input type="text" name="lastname" />
            <input type="text" name="email" />
            <input type="password" name="password" />
        
            <button type="submit"> Valider </button>
        </form>
    );
};