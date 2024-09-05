import React from "react";
import Siderbar from "./Siderbar";
import SowStatus from "../components/graficos/SowStatus";
import TotalSow from "../components/graficos/TotalSow";

const PanelAdmin = () => {
  return (
    <div>
      <div className="row justify-content-center-center">
        <div className="col-sm-1 ">
          <div className="bg-body-primary">
            <Siderbar />
          </div>
        </div>
        <div className="col-sm-11 mb-5">
          <div className="container-fluid d-flex justify-content-center">
            <div className="col-sm-8 ">
              <div className="mb-4 mt-5 d-flex justify-content-center">
                <h2>Sow Status</h2>
                
              </div>
              <div style={{marginLeft: "200px", marginBottom: "20px"}}>
              
              <TotalSow />
              </div>
              <div
                className="d-flex justify-content-center"
                style={{ height: "400px" }}
              >
                <SowStatus />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelAdmin;
