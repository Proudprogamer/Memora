import React, { useEffect, useState } from "react";


export interface Newuser{
    type :"Sign Up" | "Sign In",
}

export default function Authpopup(props:Newuser){

    let [visible, setvisible] = useState(false);


    useEffect(()=>{
        setvisible(true);
    },[])

    const handlecreateuser=()=>{
        //make a call to backend and create a new user

    }

    return(
        <div className="fixed bg-black/10 backdrop-blur-md h-screen pt-50 pl-150">
            <div className={`transition-opacity duration-700 ease-out ${visible ? "opacity-100" : "opacity-0"} w-80 h-80 rounded-xl border-1 border `}>
                <div className="flex justify-between p-3">
                    <p className="text-2xl font-bold">{props.type}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>

                <div className="pl-3 pt-5">
                    <label htmlFor="email" className="text-md font-bold">Email :<br></br></label>
                    <input id="email" className="w-72 bg-gray-200 border-1 rounded-lg p-2" placeholder="Type here..."></input>
                    <br></br>

                    <label htmlFor="password" className="text-md font-bold">Password :<br></br></label>
                    <input id="password" className="w-72 bg-gray-200 border-1 rounded-lg p-2" placeholder="Type here..."></input>

                    <br></br>
                    <br></br>
                    <br></br>
                    <button onClick={handlecreateuser} className="w-72 transition-all duration-0500 text-black bg-black/20 rounded-lg p-2 hover:bg-black hover:text-white font-semibold">{props.type}</button>
                </div>
            </div>
        </div>

    )
}