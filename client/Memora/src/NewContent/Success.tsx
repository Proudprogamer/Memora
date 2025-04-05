import React from "react";


export interface Successcheck{
    type : "added" | "not added"
}


function Success(props : Successcheck){
    return(
        <div className="w-100 h-100 border border-bg-black rounded-xl p-2">
            {props.type=="added" ? <p>Content Added!</p> : <p>Failed to add content!</p>}
        </div>
    )
}

export default Success;