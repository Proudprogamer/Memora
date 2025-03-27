import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import axios from "axios"
import Authpopup from "./Auth/Authpopup";


function App() {

  let[loading, setloading] = useState(false);

  useEffect(() =>{

    const get_content = async() =>{

      try{
          const response = await axios.get("",
          {
            headers :{
              "Content-Type" : "application/json"
            }
          }
        )

      }
      catch(error)
      {
        console.log(`There was an error ${error}`)
      }
    }
  },[])


  const handlenewuser = ()=>{

  }

  const handleolduser = ()=>{

  }
  
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

          <div className="pl-205 mt-9 ">
            <button onClick={handlenewuser} className="font-semibold transition-all duration-0500 text-black bg-black/20 rounded-lg p-2 hover:bg-black hover:text-white mr-2">Sign Up</button>
            <button onClick={handleolduser} className="font-semibold transition-all duration-0500 text-black bg-black/20 rounded-lg p-2 hover:bg-black hover:text-white">Sign In</button>
          </div>
        </div>
    </>
  )
}

export default App
