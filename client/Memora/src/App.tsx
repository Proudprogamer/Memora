import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import axios from "axios"
import { useNavigate } from "react-router-dom";


function App() {

  const navigate = useNavigate();

  let[loading, setloading] = useState(false);
  let[token, settoken] = useState<string | null>();

  useEffect(() =>{
    settoken(localStorage.getItem("token"))

    // const get_content = async() =>{

    //   try{
    //       const response = await axios.get("http://localhost:3000/sign-up",
    //       {
    //         headers :{
    //           "Content-Type" : "application/json"
    //         }
    //       }
    //     )

    //   }
    //   catch(error)
    //   {
    //     console.log(`There was an error ${error}`)
    //   }
    // }
  },[])

  return (
    <>
        <div className="flex w-screen">
          <Sidebar/>
          <div className="ml-10 mt-9">
            <p className="text-3xl font-bold mb-15">All Notes</p>
            <div className="text-green-500 text-5lg mt-5">
              <Content tags={["productivity","ideas"]} subtitle="Future Projects" title="Future projects" type="document" image="" content="go to the gym everyday and be the best version of yourself"/>
            </div>
          </div>

          {!token ?(

            <div className="pl-205 mt-9 ">
              <button onClick={()=>navigate('/sign-up')} className="font-semibold transition-all duration-0500 text-black bg-black/20 rounded-lg p-2 hover:bg-black hover:text-white mr-2">Sign Up</button>
              <button onClick={()=>navigate('/sign-in')} className="font-semibold transition-all duration-0500 text-black bg-black/20 rounded-lg p-2 hover:bg-black hover:text-white">Sign In</button>
            </div>
          ):
          (
           
            <div className="pl-190 mt-9 flex gap-2 h-10">
              <button onClick={()=>{
                navigate('/add-content');
              }} className="font-semibold transition-all duration-0500 text-black bg-black/20 rounded-lg p-2 hover:bg-black hover:text-white w-30">Add Content</button>
              <button onClick={()=>{
                localStorage.removeItem("token");
                settoken(null);
              }} className="font-semibold transition-all duration-0500 text-black bg-black/20 rounded-lg p-2 hover:bg-black hover:text-white">Log Out</button>
            </div>
            

          ) }

        </div>
    </>
  )
}

export default App
