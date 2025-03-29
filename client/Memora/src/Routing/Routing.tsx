import React from "react";
import {Routes, Route} from "react-router-dom"
import App from "../App";
import Authpopup from "../Auth/Authpopup";

function Routing(){

    return(
        <div>
            <Routes>
                <Route path ="/" element={<App/>}/>
                <Route path ="/sign-up" element={<Authpopup type="Sign Up"/>}/>
                <Route path ="/sign-in" element={<Authpopup type="Sign In"/>}/>
            </Routes>

        </div>

    )

}


export default Routing;