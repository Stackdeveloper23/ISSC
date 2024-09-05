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
                    <li className="nav-item d-flex align-items-center me-3">
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
            <div className="container-fluid">
                <Link to={`/${rol}`} className="navbar-brand">
                    <img
                        src="https://www.intraway.com/wp-content/uploads/2023/08/intraway-logo.png"
                        className="navbar-brand"
                        alt="logo"
                        style={{ width: "150px", height: "auto" }}
                    />
                </Link>
                <ButtonTheme />
                <div className="container d-flex justify-content-center align-items-center">
                    <h2 className="text-light mb-0"> Sow Control System  Implementation (SCSI)</h2>
                </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNavDropdown"
                >
                    <ul className="navbar-nav mx-auto"></ul>
                    <ul className="navbar-nav ms-auto">{renderLinks()}</ul>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;