import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import axios from "axios"
import { username } from "./Auth/Authpopup";
import { useNavigate } from "react-router-dom";
import { content } from "./NewContent/NewContent";


function App() {

  const navigate = useNavigate();

  let[loading, setloading] = useState(false);
  let[token, settoken] = useState<string | null>(localStorage.getItem("token"));
  let[userContent, setuserContent] = useState<content[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.post("http://localhost:3000/fetch-docs",
            {username : username}
            ,
            {
              headers : {
                "Content-Type" : "application/json",
                "token" : localStorage.getItem("token")
              }
            }
          );
          console.log(response.data.data);
          setuserContent(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [token]); 

  return (
    <>
        <div className="flex w-screen">
          <Sidebar/>
          <div className="ml-10 mt-9">
            <p className="text-3xl font-bold mb-15">All Notes</p>
            <div className="text-green-500 text-5lg mt-5">
            {userContent.map((item, index) => (
              <Content
                key={index}
                tags={item.content.tags}
                subtitle={item.content.sub_title}
                title={item.content.title}
                type={item.content.type}
                content={item.content.description}
                 // optional based on what `Content` expects
              />
            ))}
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
