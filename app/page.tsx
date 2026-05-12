"use client"
import Link from "next/link";






export default function Home() {


  return (
    <div>
      <div>
<img src="/cars.png" alt="" width={100} height={100} />
      </div>
      
      <div className="pt-3">
        <Link href="/signin">
         <button className=" border border-b-gray rounded-md"> Se connecter </button>
        </Link>

      </div>
      
      <button  className=" border border-b-gray rounded-md"> Deconnexion </button>
 
    </div>
  

  );
}
