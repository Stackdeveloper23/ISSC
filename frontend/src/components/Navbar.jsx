import AuthUser from "../pageauth/AuthUser";
import { Link } from "react-router-dom";
import ButtonTheme from "./ButtonTheme";

const Navbar = () => {
    const { getRol, getLogout, getToken } = AuthUser();
    const rol = getRol();
    const logoutUser = () => {
        const token = getToken();

        getLogout(token)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const renderLinks = () => {
        if (getToken()) {
            return (
                <>
                    <li className="nav-item d-flex align-items-center">
                        <a className="nav-link">
                        {getRol().toUpperCase()}
                        </a>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-outline-primary" style={{border: 'none'}}>
                            <a
                                className="nav-link d-flex"
                                href="#"
                                onClick={logoutUser}
                            >
                                <span className="material-symbols-outlined">
                                    logout
                                </span>
                                Logout
                            </a>
                        </button>
                    </li>
                </>
            );
        } else {
            return (
                <>
                    <li className="nav-item">
                        <a className="nav-link" href="/login">
                            Login
                        </a>
                    </li>
                </>
            );
        }
    };
    return (
        <nav className="navbar navbar-expand-lg border border-dark" style={{ backgroundColor: "#ff6e4b"}}>
                <div className="row w-100">
                    <div className="col-sm-2">
                <Link to={`/${rol}`} className="navbar-brand ms-3">
                    <img
                        src="https://www.intraway.com/wp-content/uploads/2023/08/intraway-logo.png"
                        className="navbar-brand"
                        alt="logo"
                        style={{ width: "150px", height: "auto" }}
                    />
                </Link>
                </div>
                <div className="col-sm-8 d-flex justify-content-center align-items-center">
                    <h2 className="text-light mb-0"> Sow Control System  Implementation (SCSI)</h2>
                </div>
                <div className="col-sm-2 d-flex justify-content-end">
                    <ul className="navbar-nav">{renderLinks()}</ul>
                </div>
                </div>
                <ButtonTheme />
        </nav>
    );
};
export default Navbar;