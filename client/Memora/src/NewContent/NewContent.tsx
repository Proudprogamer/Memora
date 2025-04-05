import React, { useState } from "react";
import axios from "axios"; 
import { username } from "../Auth/Authpopup";


export interface content{
    username : String,
    type: String,
    link: String, 
    title: String, 
    sub_title: String,
    description : String,
    tags: String
}

function NewContent(){

    const [selectedTags, setSelectedTags] = useState<String[]>([]);
    const [title, settitle] = useState<String>("");
    const [subTitle, setsubTitle] = useState<String>("");
    const [description, setdesciption] = useState<String>("");
    const [link, setlink] = useState<String>("");
    const [error, seterror] = useState<Boolean>();
    const [type, settype] = useState<String>("");


    const tags = ["Productivity", "Ideas", "Skill", "Inspo", "Fun"];

    const handleCheckboxChange = (tag : String) => {
        setSelectedTags(prev =>
            prev.includes(tag)
            ? prev.filter(t => t !== tag)
            : [...prev, tag]
        );
    }

    const handleSubmit=async()=>{

        if(title=="" || subTitle == "" || description == "" || type=="")
            seterror(true);
        else
        {
            seterror(false);

            const response = await axios.post("http://localhost:3000/add-content",
                {
                    username : username,
                    type: type,
                    link: link, 
                    title: title, 
                    sub_title: subTitle,
                    description : description,
                    tags: selectedTags


                },
                {
                    headers:
                    {
                        "Content-Type" : "application/json",
                        "token" : localStorage.getItem("token")
                    }
                }
            )


            console.log(response);

        }


    }

    return (
        <div>

            <div>
                <label htmlFor="type">Type :<br></br> </label>
                <select onChange={(e)=>{settype(e.target.value)}} name="type" className="w-50 h-10 border border-bg-black rounded-lg">
                    <option selected disabled>Select Type</option>
                    <option value="Tweet">Tweet</option>
                    <option value="Video">Video</option>
                    <option value="Document">Document</option>
                    <option value="Tag">Tag</option>
                </select>
            </div>

            <div>
                <label htmlFor="title">Title :<br></br> </label>
                <input onChange={(e)=>settitle(e.target.value)} name="title" type="text" className="w-50 h-10 border border-bg-black rounded-lg"></input>
            </div>

            <div>
                <label htmlFor="sub-title">Sub Title :<br></br> </label>
                <input onChange={(e)=>setsubTitle(e.target.value)} name="sub-title" type="text" className="w-50 h-10 border border-bg-black rounded-lg"></input>
            </div>

            <div>
                <label htmlFor="description">Description :<br></br> </label>
                <input onChange={(e)=>setdesciption(e.target.value)} name="description" type="text" className="w-50 h-10 border border-bg-black rounded-lg"></input>
            </div>

            <div>
                <label htmlFor="link">Link :<br></br> </label>
                <input onChange={(e)=>setlink(e.target.value)} name="link" type="text" className="w-50 h-10 border border-bg-black rounded-lg"></input>
            </div>

            <div className="border border-black rounded-lg p-4 w-64">
                <p className="mb-2 font-semibold">Select relevant tags:</p>
                {tags.map(tag => (
                <label key={tag} className="flex items-center space-x-2 mb-1">
                    <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleCheckboxChange(tag)}
                    />
                    <span>{tag}</span>
                </label>
                ))}
            </div>
            {error && <p className="text-red-500 text-lg">Fields cannot be empty!</p>}
            <div>
                <button onClick={handleSubmit} className="w-20 h-10 border border-bg-black p-2 bg-gray-500 rounded-md">Submit</button>
            </div>

        </div>
    )
}

export default NewContent;