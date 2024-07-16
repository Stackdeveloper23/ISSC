import React from "react";
import Siderbar from "./Siderbar";

const PanelAdmin = () => {
    return(
       <div className="container">
         <div className="row justify-content-center-center mt-5 mb-5">
            <Siderbar/>
            <div className="col-sm-9">
                <h1 className="text-center">Admin</h1>
            </div>
        </div>
       </div>
    )
}

export default PanelAdmin