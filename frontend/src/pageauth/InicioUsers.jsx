import { Link } from "react-router-dom";



const InicioUsers = () => {
    const viewport = {
        height: '100vh',
    }
  return (
    <div className="container">
    <div className="row justify-content-center align-items-center" style={viewport}>
        <div className="col-sm-4 ">
            <div className="card mt-5 mb-5 border-opacity-10 rounded-4">
                <div className="card-body rounded-4 " style={{backgroundColor: "#ff6e4b"}}>
                    <div className="svg-container mt-3 mb-5" id="logo">
                    <img src="https://www.intraway.com/wp-content/uploads/2023/08/intraway-logo.png" alt="logo" />
                    </div>
                    <h1 className="text-center fw-bolder mb-5">Welcome to ISSC</h1>
                    <div className="row justify-content-center align-items-center">
                     <Link to="/login" className="btn btn-primary w-50 mt-3">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default InicioUsers