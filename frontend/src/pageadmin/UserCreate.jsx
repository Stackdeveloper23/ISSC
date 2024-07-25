import { useEffect, useState } from "react";
import Siderbar from "./Siderbar";
import Config from "../Config";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserCreate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setpassword_confirmation] = useState("");
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await Config.getUserRol();
                console.log(response.data);
                setRoles(response.data);
            } catch (error) {
                console.error("Error al obtener roles:", error);
            }
        };

        fetchRoles();
    }, []);

    const handleRoleChange = (e) => {
        const value = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setSelectedRoles(value);
    };

    const submitCreate = async (ev) => {
        ev.preventDefault();
        try {
            const currentUser = {
                name,
                email,
                password,
                password_confirmation,
                roles: selectedRoles,
            };

            await Config.getUserCreate(currentUser, id);
            console.log("Usuario actualizado correctamente");
            navigate("/admin/user");
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Siderbar />
                <div className="col-sm-10 mt-3 mb-3">
                    <div className="card">
                        <div className="card-header w-100">
                        <div className="d-flex">
                                <Link
                                    to={-1}
                                    className="btn btn-secondary col-sm-1"
                                >
                                    <span className="material-symbols-outlined me-2">
                                        arrow_back
                                    </span>
                                    Back
                                </Link>
                            
                           <div className="col-sm-11">
                            <h4 className="d-flex justify-content-center">Create User</h4>
                           </div>
                           </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitCreate}>
                                <div className="col-sm-12 mt-3">
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="col-sm-12 mt-3">
                                    <label htmlFor="name">Email:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="col-sm-12 mt-3">
                                    <label htmlFor="name">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="col-sm-12 mt-3">
                                    <label htmlFor="name">
                                        Confirmed Password:
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password_confirmation}
                                        onChange={(e) =>
                                            setpassword_confirmation(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-sm-12 mt-3">
                                    <label htmlFor="roles">Rol:</label>

                                    <select
                                        
                                        className="form-select"
                                        multiple
                                        value={selectedRoles}
                                        onChange={handleRoleChange}
                                    >
                                        {Array.isArray(roles) &&
                                            roles.map((role) => (
                                                <option
                                                    key={role.id}
                                                    value={role.name}
                                                >
                                                    {role.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div className="btn-group mt-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary d-flex"
                                    >
                                        <span className="material-symbols-outlined">
                                            add_circle
                                        </span>
                                        Create User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCreate;