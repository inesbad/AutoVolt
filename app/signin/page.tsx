"use client"

import { signin } from "../actions/signup/authAction"

export default function Signin() {
    return (
      

        <div className="rounded-xl border border-gray-200 py-8 px-6 max-w-110 w-full">
        <form className="space-y-6" action={signin}>
                
                <div className="pt-1">
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100 pb-2"> Email </label>
            <input className=" flex w-90 text-sm/6 font-medium text-gray-800 bg-blue-100" type="text" name="email" placeholder="ex : ines@gmail.com"/>
                
            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100 mt-7 pb-2"> Mot de passe </label>
            <input  className= " flex w-90 text-sm/6 font-medium text-gray-800 bg-blue-100" type="password" name="password"  placeholder=" Tapez votre mot de passe"/>

                </div>
           
            
            <button  className="flex w-100 justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" type="submit"> Se connecter </button>
           
            </form>
            <p className="mt-10 text-center text-sm/6 text-gray-400">
                Pas encore membre ?
                
      <a href="/signup" className="font-semibold text-indigo-400 hover:text-indigo-300"> Inscrivez vous !</a>
    </p>
      
</div>
       
    );
};

