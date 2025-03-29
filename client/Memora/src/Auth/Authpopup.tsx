import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export interface Newuser{
    type :"Sign Up" | "Sign In",
}

export default function Authpopup(props:Newuser){

    let [isLoading, setisLoading] = useState(false);
    let [userName, setuserName] = useState("");
    let [passWord, setpassWord] = useState("");

    const navigate=useNavigate();

    let [visible, setvisible] = useState(false);


    useEffect(()=>{
        setvisible(true);
    },[])

    const handleSubmit =async(e :Event)=>{

        e.preventDefault();
        setisLoading(true);

        if(props.type=="Sign Up")
        {

            try{
                    const response = await axios.post("http://localhost:3000/sign-up",
                    {
                        username : userName,
                        password : passWord
                    },
                    {
                        headers:{
                            "Content-Type" :"application/json"
                        }
                    }
                )

                if(response.data)
                {
                    setisLoading(false);
                    navigate('/sign-in');
                    console.log("user got created!");
                }

            }catch(e)
            {
                console.log("there was an error : " +e);
            }

        }
        else if(props.type=="Sign In")
        {

            try{
                const response = await axios.post("http://localhost:3000/sign-in",
                    {
                        username : userName,
                        password : passWord
                    },
                    {
                        headers:{
                            "Content-Type" :"application/json"
                        }
                    }
                )

                if(response.data)
                {
                    const token = response.data.token

                    console.log("response data :" +response.data.token)
                    
                    setisLoading(false);

                    localStorage.setItem("token",token);

                    navigate('/');
                    console.log("user signed in!");
                }

            }catch(e)
            {
                console.log("there was an error : " +e);
            }
            
        }

    }

    return(
        <div className="w-screen  backdrop-blur-md h-screen pt-50 pl-161">
            <div className={`transition-opacity duration-700 ease-out ${visible ? "opacity-100" : "opacity-0"} w-80 h-80 rounded-xl border-1 border `}>
                <div className="flex justify-between p-3">
                    <p className="text-2xl font-bold">{props.type}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>navigate('/')} fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>

                <div className="pl-3 pt-5">
                    <label htmlFor="email" className="text-md font-bold">Email :<br></br></label>
                    <input onChange={(e)=>{setuserName(e.target.value)}} id="email" className="w-72 bg-gray-200 border-1 rounded-lg p-2" placeholder="Type here..."></input>
                    <br></br>

                    <label htmlFor="password" className="text-md font-bold">Password :<br></br></label>
                    <input type="password" onChange={(e)=>{setpassWord(e.target.value)}} id="password" className="w-72 bg-gray-200 border-1 rounded-lg p-2" placeholder="Type here..."></input>

                    <br></br>
                    <br></br>
                    <br></br>
                    <button onClick={(e)=>{handleSubmit(e)}} className="w-72 transition-all duration-0500 text-black bg-black/20 rounded-lg p-2 hover:bg-black hover:text-white font-semibold">{isLoading ? "Loading..." : props.type}</button>
                </div>
            </div>
        </div>

    )
}