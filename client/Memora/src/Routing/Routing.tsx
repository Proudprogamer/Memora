import React from "react";
import {Routes, Route} from "react-router-dom"
import App from "../App";
import Authpopup from "../Auth/Authpopup";
import NewContent from "../NewContent/NewContent";

function Routing(){

    return(
        <div>
            <Routes>
                <Route path ="/" element={<App/>}/>
                <Route path ="/sign-up" element={<Authpopup type="Sign Up"/>}/>
                <Route path ="/sign-in" element={<Authpopup type="Sign In"/>}/>
                <Route path = "/add-content" element = {<NewContent/>}/>
            </Routes>

        </div>

    )

}


export default Routing;