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
    const [selectedRoles, setSelectedRoles] = useState("");
    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);


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

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };

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
            console.log("Usuario creado correctamente");
            navigate("/admin/user");
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                const serverErrors = error.response.data.errors;
                const newErrors = {};
                Object.keys(serverErrors).forEach((key) => {
                    newErrors[key] = serverErrors[key][0];
                });
                setErrors(newErrors);
            } else {
                console.error("Unexpected error:", error);
            }
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
                        <div className="card-body ps-5 pe-5">
                       
                            <form onSubmit={submitCreate}>
                                <div className="col-sm-12 mt-3">
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }

                                    />
                                     {errors.name && (
                                            <div className="text-danger">
                                                {errors.name}
                                            </div>
                                        )}
                                </div>
                                <div className="col-sm-12 mt-3">
                                    <label htmlFor="name">Email:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                      
                                    />
                                      {errors.email && (
                                            <div className="text-danger">
                                                {errors.email}
                                            </div>
                                        )}
                                </div>
                                <div className="col-sm-12 mt-3">
                                    <label htmlFor="name">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                       
                                    />
                                     {errors.password && (
                                            <div className="text-danger">
                                                {errors.password}
                                            </div>
                                        )}
                                     
                                </div>
                                <div className="col-sm-12 mt-3">
                                    <label htmlFor="name">
                                        Confirmed Password:
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password_confirmation"
                                        value={password_confirmation}
                                        onChange={(e) =>
                                            setpassword_confirmation(
                                                e.target.value
                                            )
                                        }
                                      
                                    />
                                      {errors.password_confirmation && (
                                            <div className="text-danger">
                                                {errors.password_confirmation}
                                            </div>
                                        )}
                                </div>
                                <div className="col-sm-12 mt-3">
                                    <label htmlFor="roles">Rol:</label>

                                    <select
                                        
                                        className="form-select"                        
                                        value={selectedRoles}
                                        onChange={handleRoleChange}
                                    >
                                        <option value="" disabled>
                                            Select User rol
                                        </option>
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
                                    {errors.roles && (
                                        <div className="text-danger">
                                            {errors.roles}
                                        </div>
                                    )}
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