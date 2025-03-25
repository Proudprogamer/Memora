import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";

function App() {

  return (
    <div className="flex">
      <Sidebar/>
      <div className="text-green-500 text-5lg ml-5 mt-5">
        <Content tags={["productivity","ideas"]} subtitle="Future Projects" title="Future projects" type="document" image="" content="go to the gym everyday and be the best version of yourself"/>
      </div>
   
    </div>
  )
}

export default App
