

import { signup } from "./authAction"

export default function Signup() {

    return (

       <div className="min-h-screen flex items-center justify-center bg-black">
        <div className=" justify-center rounded-xl border border-gray-200 py-8 px-6 max-w-110 w-full bg-gray-900 mb-10 mt-10">
    <form className="space-y-6" action={signup}>
                    
    <div>
<label htmlFor="name" className="block text-sm/6 font-medium text-gray-100 pb-2"> Prénom </label>                   
 <input  className=" flex w-90 text-sm/6 font-medium text-gray-800 bg-blue-100 mb-5 rounded" type="text" name="firstname" placeholder="Ex : Jennah " />
                        
 <label htmlFor="name" className="block text-sm/6 font-medium text-gray-100"> Nom </label>
 <input className=" flex w-90 text-sm/6 font-medium text-gray-800 bg-blue-100 mb-5 rounded" type="text" name="lastname" placeholder="Ex : Delmoudji" />
           
 <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100"> Email </label>     
 <input  className=" flex w-90 text-sm/6 font-medium text-gray-800 bg-blue-100 mb-5 rounded" type="text" name="email" placeholder="Ex : jennah.delm@gmail.com"/>
                        
 <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100 pb-2"> Mot de passe </label>                      
 <input  className=" flex w-90 text-sm/6 font-medium text-gray-800 bg-blue-100 mb-5 rounded" type="password" name="password" placeholder="*********" />
    </div>
          
        
            <button  className=" mt-10 flex w-90 justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" type="submit"> Valider </button>
        </form>
        
            </div>
            </div>
      
    );
};