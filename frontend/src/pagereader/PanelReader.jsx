import { Link } from "react-router-dom"


const PanelReader = () => {
    return(
       <div className="container">
         <div className="row justify-content-center-center mt-5 mb-5">
         <div className="col-sm-2">
            <Link className="btn btn-primary" to="/reader/sow">SOW Table</Link>
         </div>
            <div className="col-sm-9">
                <h1 className="text-center">Reader</h1>
            </div>
        </div>
       </div>
    )
}

export default PanelReader