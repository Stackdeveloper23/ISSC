import React, { useEffect, useState } from "react";
import Siderbar from "./Siderbar";
import Config from "../Config";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);

    useEffect(() => {
        const getUserById = async () => {
            try {
                const { data } = await Config.getUserById(id);
                setName(data.name);
                setEmail(data.email);
                if (data.roles && Array.isArray(data.roles)) {
                    setSelectedRoles(data.roles.map((role) => role.id));
                } else {
                    setSelectedRoles([]);
                }
            } catch (error) {
                console.error("Error al obtener usuario:", error);
            }
        };
        getUserById();
        fetchRoles(); // Obtener roles disponibles
    }, [id]);

    const fetchRoles = async () => {
        try {
            const response = await Config.getUserRol();
            setRoles(response.data);
        } catch (error) {
            console.error("Error al obtener roles:", error);
        }
    };

    const handleRoleChange = (e) => {
        const value = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setSelectedRoles(value);
    };

    const submitUpdate = async (ev) => {
        ev.preventDefault();
        try {
            const currentUser = { name, email, roles: selectedRoles };

            await Config.getUserUpdate(currentUser, id);
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
                        <div className="card-header d-flex">
                            <div className="col-sm-2 me-4">
                                <Link
                                    to={-1}
                                    className="btn btn-secondary d-flex align-items-center"
                                >
                                    <span className="material-symbols-outlined me-2">
                                        arrow_back
                                    </span>
                                    Back
                                </Link>
                            </div>
                            <div className="col-sm-6 d-flex justify-content-center align-items-center">
                                Editar User id: {id}
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitUpdate}>
                                <div className="col-sm-12 mt-3">
                                    <label htmlFor="name">Nombre</label>
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
                                    <label htmlFor="roles">Roles:</label>
                                    <select
                                        className="form-select"
                                        value={selectedRoles}
                                        onChange={handleRoleChange}
                                    >
                                        {roles.map((role) => (
                                            <option
                                                key={role.id}
                                                value={role.id}
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
                                            upgrade
                                        </span>
                                        Update User
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

export default UserUpdate;